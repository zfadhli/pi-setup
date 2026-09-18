# ADR 003: Skills over system-prompt bloat

Date: 2026-09-18
Slug: enhance-pi-with-modern-tools-such-as-fg

## Decision

Skills carry usage bodies (rg flags, eza tree depth, sg patterns); `AGENTS.md` carries only preference bullets.

## Context

Full flag docs in every system prompt waste ~2-4k tokens per turn. Skills are progressive disclosure: descriptions always in context, bodies loaded on-demand via `read` or `/skill:name`.

## Consequences

- `modern-search`, `repo-map`, `data-tasks` skills are normative bodies.
- `AGENTS.md` stays under 30 lines of preference bullets.
