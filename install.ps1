<#
.SYNOPSIS
    Antigravity Configuration Installer for Windows (PowerShell)
.DESCRIPTION
    Supports both:
    1. Local execution inside cloned repository: .\install.ps1
    2. Remote one-liner: irm https://raw.githubusercontent.com/<user>/<repo>/main/install.ps1 | iex
#>

[CmdletBinding()]
param (
    [string]$Workspace = "$HOME\workspaces",
    [string]$Repo = "rizariaputrawira/antigravity-cli-config",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
# Keep this script ASCII-compatible for Windows PowerShell 5.1 without a UTF-8 BOM.

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Antigravity Portable Configuration Installer (Windows)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Workspace Root: $Workspace"
Write-Host "Dry Run Mode:   $DryRun"
Write-Host ""

# 1. Determine Source Directory (Local repo vs Remote pipe)
$SrcDir = ""
$TempDir = ""

if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot "config\AGENTS.md"))) {
    $SrcDir = $PSScriptRoot
    Write-Host "Source: Local repository at $SrcDir" -ForegroundColor Green
} elseif (Test-Path ".\config\AGENTS.md") {
    $SrcDir = (Get-Location).Path
    Write-Host "Source: Local working directory at $SrcDir" -ForegroundColor Green
} else {
    Write-Host "Source: Remote execution detected. Fetching repository from GitHub ($Repo)..." -ForegroundColor Yellow
    $TempDir = Join-Path $env:TEMP ("antigravity-config-" + [System.Guid]::NewGuid().ToString("N"))
    $ZipPath = Join-Path $env:TEMP "antigravity-config.zip"
    $ZipUrl = "https://github.com/$Repo/archive/refs/heads/main.zip"
    
    Invoke-RestMethod -Uri $ZipUrl -OutFile $ZipPath
    Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force
    Remove-Item -Path $ZipPath -Force -ErrorAction SilentlyContinue
    
    # Locate unpacked folder
    $ExtractedFolder = Get-ChildItem -Path $TempDir -Directory | Select-Object -First 1
    $SrcDir = $ExtractedFolder.FullName
}

# 2. Pre-flight Environment Checks
Write-Host "Running pre-flight environment checks..." -ForegroundColor Cyan

if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "  Node.js detected: $(node -v)" -ForegroundColor Green
} else {
    throw "'node' is required to safely merge privacy settings and run bundled hooks."
}

if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "  npx detected" -ForegroundColor Green
} else {
    Write-Host "  Warning: 'npx' is not found in PATH. Context7, GitHub, and LSP MCP servers require npx." -ForegroundColor Yellow
}

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "  git detected: $(git --version)" -ForegroundColor Green
} else {
    Write-Host "  Warning: 'git' is not found in PATH." -ForegroundColor Yellow
}

if ($env:GITHUB_TOKEN) {
    Write-Host "  GITHUB_TOKEN is present in environment." -ForegroundColor Green
} else {
    Write-Host "  Notice: GITHUB_TOKEN is not currently set in environment." -ForegroundColor Gray
}

# 3. Target Directories & Non-Destructive Backup
$GeminiDir = Join-Path $HOME ".gemini"
$ConfigDir = Join-Path $GeminiDir "config"
$CliDir = Join-Path $GeminiDir "antigravity-cli"

# Normalize workspace path for JSON formatting (forward slashes prevent JSON escaping issues)
$NormalizedWorkspace = $Workspace.Replace("\", "/")

# Validate before any mutation; malformed settings must not fall back to telemetry defaults.
& node (Join-Path $SrcDir "scripts\apply-privacy.cjs") (Join-Path $CliDir "settings.json") (Join-Path $ConfigDir "mcp_config.json") --check
if ($LASTEXITCODE -ne 0) { throw "Privacy settings preflight failed." }

if ($DryRun) {
    Write-Host ""
    Write-Host "[DRY RUN] Target directories:" -ForegroundColor Yellow
    Write-Host "   - $ConfigDir"
    Write-Host "   - $CliDir"
    Write-Host "   - $Workspace"
    
    if (Test-Path $ConfigDir) {
        Write-Host "[DRY RUN] Would backup existing configuration to $HOME\.gemini.bak.<timestamp>" -ForegroundColor Yellow
    }
    
    $DetectedHostname = if ($env:COMPUTERNAME) { $env:COMPUTERNAME } elseif ($env:HOSTNAME) { $env:HOSTNAME } else { "localhost" }
    Write-Host "[DRY RUN] Would render templates when missing:" -ForegroundColor Yellow
    Write-Host "   - config.json.template -> $ConfigDir\config.json (hostname: $DetectedHostname)"
    Write-Host "   - mcp_config.json.template -> $ConfigDir\mcp_config.json (workspace: $NormalizedWorkspace)"
    Write-Host "   - settings.json.template -> $CliDir\settings.json (if missing)"
    Write-Host "[DRY RUN] Would disable feedback surveys and recognized MCP telemetry, preserving unrelated settings." -ForegroundColor Yellow
    Write-Host "[DRY RUN] Would copy agents, skills, hooks, and AGENTS.md." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Dry run completed successfully. Zero changes were made." -ForegroundColor Green
    
    if ($TempDir -and (Test-Path $TempDir)) {
        Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    return
}

Write-Host ""
Write-Host "Proceeding with installation..." -ForegroundColor Cyan

# Abort before mutation if a flat legacy agent file conflicts with a shipped directory agent.
$SourceAgentsDir = Join-Path $SrcDir "config\agents"
if (Test-Path $SourceAgentsDir) {
    Get-ChildItem -Path $SourceAgentsDir -Directory | ForEach-Object {
        $FlatAgent = Join-Path (Join-Path $ConfigDir "agents") ($_.Name + ".md")
        if (Test-Path $FlatAgent) {
            throw "Cannot install agent '$($_.Name)': flat file $FlatAgent conflicts with the directory-based agent. Preserve it and resolve the conflict manually."
        }
    }
}

# Backup existing configuration if present
if ((Test-Path $ConfigDir) -or (Test-Path (Join-Path $CliDir "settings.json"))) {
    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $BackupDir = Join-Path $HOME (".gemini.bak." + $Timestamp + "." + [System.Guid]::NewGuid().ToString("N"))
    Write-Host "Creating backup of existing configuration to $BackupDir..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    if (Test-Path $ConfigDir) {
        Copy-Item -Path $ConfigDir -Destination (Join-Path $BackupDir "config") -Recurse -Force
    }
    
    $ExistingSettings = Join-Path $CliDir "settings.json"
    if (Test-Path $ExistingSettings) {
        Copy-Item -Path $ExistingSettings -Destination $BackupDir -Force
    }
}

# Ensure destination directories exist
New-Item -ItemType Directory -Path $ConfigDir -Force | Out-Null
New-Item -ItemType Directory -Path $CliDir -Force | Out-Null
New-Item -ItemType Directory -Path $Workspace -Force | Out-Null

# 4. Template Rendering
Write-Host "Rendering configuration templates when missing..." -ForegroundColor Cyan

$ConfigPath = Join-Path $ConfigDir "config.json"
if (-not (Test-Path $ConfigPath)) {
    $ConfigTemplatePath = Join-Path $SrcDir "config\config.json.template"
    $ConfigJsonContent = Get-Content -Raw -Path $ConfigTemplatePath
    $DetectedHostname = if ($env:COMPUTERNAME) { $env:COMPUTERNAME } elseif ($env:HOSTNAME) { $env:HOSTNAME } else { "localhost" }
    $ConfigJsonContent = $ConfigJsonContent.Replace('${REMOTE_HOSTNAME}', $DetectedHostname)
    Set-Content -Path $ConfigPath -Value $ConfigJsonContent -Encoding utf8
}

$McpPath = Join-Path $ConfigDir "mcp_config.json"
if (-not (Test-Path $McpPath)) {
    $McpTemplatePath = Join-Path $SrcDir "config\mcp_config.json.template"
    $McpJsonContent = Get-Content -Raw -Path $McpTemplatePath
    $McpJsonContent = $McpJsonContent.Replace('${WORKSPACE_ROOT}', $NormalizedWorkspace)
    Set-Content -Path $McpPath -Value $McpJsonContent -Encoding utf8
}

$TargetSettingsPath = Join-Path $CliDir "settings.json"
if (-not (Test-Path $TargetSettingsPath)) {
    $SettingsTemplatePath = Join-Path $SrcDir "settings\settings.json.template"
    Copy-Item -Path $SettingsTemplatePath -Destination $TargetSettingsPath
} else {
    Write-Host "Existing settings.json preserved at $TargetSettingsPath" -ForegroundColor Gray
}
& node (Join-Path $SrcDir "scripts\apply-privacy.cjs") $TargetSettingsPath $McpPath
if ($LASTEXITCODE -ne 0) { throw "Failed to disable optional CLI telemetry." }

# 5. Copy Assets
Write-Host "Copying global rules, agents, hooks, and skills..." -ForegroundColor Cyan

Copy-Item -Path (Join-Path $SrcDir "config\AGENTS.md") -Destination (Join-Path $ConfigDir "AGENTS.md") -Force
Copy-Item -Path (Join-Path $SrcDir "config\hooks.json") -Destination (Join-Path $ConfigDir "hooks.json") -Force

# Copy skills
$TargetSkillsDir = Join-Path $ConfigDir "skills"
New-Item -ItemType Directory -Path $TargetSkillsDir -Force | Out-Null
Copy-Item -Path (Join-Path $SrcDir "config\skills\*") -Destination $TargetSkillsDir -Recurse -Force

# Copy shipped agents while retaining unrelated installed agent directories.
$TargetAgentsDir = Join-Path $ConfigDir "agents"
if (Test-Path $SourceAgentsDir) {
    New-Item -ItemType Directory -Path $TargetAgentsDir -Force | Out-Null
    Get-ChildItem -Path $SourceAgentsDir -Directory | ForEach-Object {
        $TargetAgentDir = Join-Path $TargetAgentsDir $_.Name
        New-Item -ItemType Directory -Path $TargetAgentDir -Force | Out-Null
        Copy-Item -Path (Join-Path $_.FullName "*") -Destination $TargetAgentDir -Recurse -Force
    }
}

# Copy utility scripts
$SrcScriptsDir = Join-Path $SrcDir "scripts"
if (Test-Path $SrcScriptsDir) {
    $TargetScriptsDir = Join-Path $ConfigDir "scripts"
    New-Item -ItemType Directory -Path $TargetScriptsDir -Force | Out-Null
    Copy-Item -Path (Join-Path $SrcScriptsDir "*") -Destination $TargetScriptsDir -Recurse -Force
}



# Cleanup temp files if remote
if ($TempDir -and (Test-Path $TempDir)) {
    Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Antigravity configuration successfully installed!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Global Config: $ConfigDir"
Write-Host ""
Write-Host "You can now run 'agy' or 'antigravity' in your terminal." -ForegroundColor Cyan
Write-Host "Privacy action required: in agy, open /config and set Enable Telemetry to off." -ForegroundColor Yellow
Write-Host "agy 1.3.1 stores this control through its backend, not settings.json; this installer cannot verify or automate it." -ForegroundColor Yellow
