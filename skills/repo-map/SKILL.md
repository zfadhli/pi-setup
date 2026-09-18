---
name: repo-map
description: Map any repo in <5k tokens with eza tree + tokei breakdown. Use for repo tours, onboarding, 'map this repo', context budgeting.
---

# Repo Map

## Fast map (preferred: repo_map tool)

The `repo_map` extension tool runs `eza -T -L 2` + `tokei --output json` and returns <5k tokens. Use it when available.

## Manual fallback

```bash
eza -T -L 2 --git-ignore --icons=never <dir>     # tree, 2 levels max
tokei --output json <dir> | jq -r 'to_entries[] | "\(.key): \(.value.code) code"'  # languages
fd . <dir> -t f -E .git | wc -l                  # file count
bat --paging=never --color=never --line-range 1:60 <file>  # peek
```

Rules: never `ls -R` (unbounded). Depth ≤2 for maps, ≤4 only on request.
Diffs: `delta --side-by-side --line-numbers` or `difft --display side-by-side`.
