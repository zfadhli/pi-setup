---
name: modern-search
description: Search files and code with fd, rg, ast-grep, and fff. Use for finding files, grepping content, structural code search, TODO scans.
---

# Modern Search

Prefer these over coreutils. All respect .gitignore where noted.

## Find files (fd / fff)

```bash
fd -H -E .git '<pattern>' <dir>          # hidden, exclude .git
fd -e ts -e tsx 'config' src/            # by extension
```

pi-fff tools (`fffind`) add frecency ranking — prefer for fuzzy file pick.

## Grep content (rg / fff)

```bash
rg --hidden --glob '!.git' -n 'TODO|FIXME'   # standard scan
rg -l --hidden 'pattern' src/                # files only
rg --json -n 'pattern' | jq -c '. | select(.type=="match")'  # structured
```

pi-fff `ffgrep` for fuzzy content + frecency.

## Structural code search (ast-grep)

```bash
sg --pattern 'console.log($$$)' --lang ts    # NOT rg — finds AST nodes
sg --pattern 'useState($_)' -l               # list files
ast-grep --help | head -40                   # sg is alias, deprecated warning ok
```

Use sg when: function calls, JSX, imports, any syntax-aware query.
Use rg when: strings, comments, TODO, free text.

## JSON filter (jq / yq)

```bash
rg --json -n 'x' | jq -c 'select(.type=="match") | .data.path.text'
cat config.yaml | yq '.jobs[] | .name'
```

## fzf picker

```bash
fd -t f | fzf --preview 'bat --color=never --paging=never {} | head -80'
rg -l 'TODO' | fzf -m
```

Never use bare `grep -r` / `find . -name`. Blocked by modern-tools extension.
