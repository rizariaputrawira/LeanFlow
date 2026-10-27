---
name: leanflow-ponytail-help
description: >
  Quick-reference card for all ponytail modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: /leanflow-ponytail-help,
  "ponytail help", "what ponytail commands", "how do I use ponytail".
---

# Ponytail Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/leanflow-ponytail lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `/leanflow-ponytail` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. Default. |
| **Ultra** | `/leanflow-ponytail ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **leanflow-ponytail** | `/leanflow-ponytail` | Lazy mode itself. Simplest solution that works. |
| **leanflow-ponytail-review** | `/leanflow-ponytail-review` | Over-engineering review: `L42: yagni: factory, one product. Inline.` |
| **leanflow-ponytail-audit** | `/leanflow-ponytail-audit` | Whole-repo over-engineering audit: ranked list of what to delete. |
| **leanflow-ponytail-debt** | `/leanflow-ponytail-debt` | Harvest `ponytail:` shortcut comments into a tracked ledger. |
| **leanflow-ponytail-gain** | `/leanflow-ponytail-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **leanflow-ponytail-help** | `/leanflow-ponytail-help` | This card. |

Antigravity uses `@leanflow-ponytail`, `@leanflow-ponytail-review`, and `@leanflow-ponytail-help`; Antigravity
and OpenCode use the slash-command forms above (OpenCode ships all six as
slash commands).

## Deactivate

Say "stop leanflow-ponytail" or "normal mode". Resume anytime with `/leanflow-ponytail`.
`/leanflow-ponytail off` also works.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export PONYTAIL_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/ponytail/config.json`, Windows: `%APPDATA%\ponytail\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/leanflow-ponytail` when wanted.

Resolution: env var > config file > `full`.

## Update

Update configuration and skills anytime by pulling the latest changes and running the installer:
```bash
git pull && ./install.sh
```

## More

Full docs + examples: https://github.com/DietrichGebert/ponytail
