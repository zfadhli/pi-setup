---
name: data-tasks
description: Wrangle JSON/YAML and run tasks with jq, yq, sd, just, mise, watchexec. Use for config edits, log mining, task discovery, file watching.
---

# Data + Tasks

## jq (JSON)

```bash
cat log.json | jq -c 'select(.level=="error") | {msg, file}'
rg --json -n 'TODO' | jq -c 'select(.type=="match") | .data.path.text'
```

## yq (YAML/TOML/XML)

```bash
yq '.jobs[].name' config.yml
yq -p json -o yaml '.a=1' file.json
```

## sd (safer sed)

```bash
sd 'foo' 'bar' src/**/*.ts          # no escaping hell
sd -F 'a.b' 'a_b' file.txt          # fixed-string mode
```

Prefer `sd` over `sed -i` in agent commands.

## just (tasks)

```bash
just -l              # discover — ALWAYS run before guessing npm scripts
just test            # run suite
just map             # repo tour
```

## mise (env)

```bash
mise ls              # pinned toolchains from mise.toml
mise x -- node -v    # run with pinned env
```

## watchexec (watch, not poll)

```bash
watchexec -e ts,md -- just test     # rerun on change
```

Do not poll with `sleep` loops. Prefer `watchexec` or tmux long-run.
