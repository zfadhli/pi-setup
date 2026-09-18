# ADR 001: Subtract before you add — override, don't duplicate tools

Date: 2026-09-18
Slug: enhance-pi-with-modern-tools-such-as-fg

## Decision

Override `grep/find/ls` via `tool_call` block + `fff override` mode. Do not add parallel tool names.

## Context

pi core ships `read, bash, grep, find, ls`. Adding `rg-search`, `fd-find` alongside doubles prompt surface and models still pick legacy tools.

## Consequences

- `pi --exclude-tools grep,find,ls` or extension block forces modern path.
- Block message must name replacement (`Use rg/ffgrep instead`) or agents stall.
