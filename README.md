# pi-setup — modern CLI tools for pi

Skills + enforcement extension that make `pi` prefer modern tools (`rg`, `fd`, `fzf`, `sg`, `bat`, `eza`, `jq`, `just`, …) over `grep`/`find`/`ls`/`cat`.

## Install tools

```bash
brew install fzf ast-grep jq yq eza git-delta difftastic tokei just mise watchexec sd zoxide dust duf glow gum procs bottom
```

(`rg`, `fd`, `bat`, `gh` assumed present.)

## Install package

```bash
pi install git:github.com/zfadhli/pi-setup
```

## Recommended companion: Chisle

[Chisle](https://github.com/JayPokale/Chisle) cuts token spend on three axes — terse prose, YAGNI-first code, and tool-output compression via pi's `tool_result` hook. It composes with this package (different hooks, no conflict) and covers what these skills don't: output terseness and oversized-output elision.

```bash
npx chisle --only pi   # scoped to pi; --dry-run previews, --uninstall removes
```

Measured here on a repo-tour reference task (n=1): −28% output tokens, −37% input via fewer turns, answers complete. `/chisle off` per session if it ever gets annoying; `CHISLE_COMPRESS=0` keeps the ruleset while disabling output scrubbing.

## Contents

| Path | What |
|---|---|
| `skills/modern-search/` | `/skill:modern-search` — fd/rg/sg/fff + fzf recipes |
| `skills/repo-map/` | `/skill:repo-map` — <5k-token repo tours (eza + tokei) |
| `skills/data-tasks/` | `/skill:data-tasks` — jq/yq/sd/just/mise/watchexec recipes |
| `skills/git-workflow/` | `/skill:git-workflow` — gh --json for agents, lazygit for humans |
| `extensions/modern-tools.ts` | Blocks `grep`/`find`/`ls` with redirect + `repo_map` tool |
| `AGENTS.md` | Preference bullets — copy to `~/.pi/agent/AGENTS.md` for global effect |

## Usage

- `just -l` to discover repo tasks (this repo's `justfile` has `map`/`audit`/`test`).
- `/skill:modern-search`, `/skill:repo-map`, `/skill:data-tasks` to force-load a skill.
- The extension auto-redirects legacy tool calls; follow its message.

## Layout

Standard [pi package](https://github.com/badlogic/pi-mono) layout: `package.json` (`pi` key + `pi-package` keyword) with `./skills` and `./extensions`.
