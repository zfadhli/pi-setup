# Global agent preferences — modern tools first

Prefer modern tools, never raw fallbacks. All commands non-interactive (`--paging=never`, `--color=never` for views).

- search content: `rg --hidden --glob '!.git' -n` or `sg --pattern` for code structure, or `ffgrep` (frecency). Never bare `grep -r`.
- find files: `fd -H -E .git` or `fffind`. Never `find . -name`.
- view file: `bat --paging=never --color=never --line-range 1:80`. Never `cat`.
- list/map: `eza -T -L 2 --git-ignore --icons=never`, or `repo_map` tool for tours. Never `ls -R`.
- diff: `delta --line-numbers` or `difft --display side-by-side`. Never raw `git diff` for review.
- json/yaml: `jq -c` / `yq`. Never `python -m json.tool` for probing.
- tasks: `just -l`, run `just <task>`. Env: `mise`. Watch: `watchexec`.
- disk/nav: `dust`, `duf`, `z` (zoxide). Human render: `glow`.

Skills: `/skill:modern-search` (rg/fd/sg/fff flags), `/skill:repo-map` (<5k-token tours), `/skill:data-tasks` (jq/yq/sd/just recipes), `/skill:git-workflow` (gh --json, absorb, PR flow).
Extension `modern-tools.ts` blocks `grep/find/ls` with redirect — follow the redirect message.
