# ADR 002: Extension over bash alias for enforcement

Date: 2026-09-18
Slug: enhance-pi-with-modern-tools-such-as-fg

## Decision

Enforce via `~/.pi/agent/extensions/modern-tools.ts` (`registerTool repo_map` + `on(tool_call)` redirect), not shell aliases.

## Context

Aliases in `.bashrc`/`.zshrc` don't reliably survive LLM `bash` tool context (non-interactive, different cwd, tmux vs RPC). Extension `tool_call` interception is the only point that sees every dispatch.

## Consequences

- Alias setup is docs-only, nice-to-have.
- Extension is normative; must handle `terminate: false` so one blocked call doesn't kill whole batch.
