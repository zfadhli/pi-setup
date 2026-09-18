# ADR 004: gh --json for agent, lazygit for human

Date: 2026-09-18
Slug: git-workflow-gh-json-for-agents-lazygit-for-humans

## Decision

Agent reads/writes GitHub only via `gh --json` + `jq`. Human uses lazygit TUI.

## Context

`gh` human tables are column-aligned prose: brittle to parse, heavy in tokens, and they change. `--json` exposes a stable schema selectable per field. lazygit is the fastest human review path but is unusable for agents (TUI).

## Consequences

- Every skill recipe uses `--json` + `jq`; table output in agent commands is a review finding.
- lazygit install is documented for the human only; the agent never drives it.
