# Run from a local checkout; forward the CLI arguments without changing settings.
$ErrorActionPreference = 'Stop'
try {
    & node (Join-Path $PSScriptRoot 'scripts/install.mjs') @args
    exit $LASTEXITCODE
} catch {
    Write-Error $_
    exit 1
}
