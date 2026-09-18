# ADR 005: absorb over manual fixup

Date: 2026-09-18
Slug: git-workflow-gh-json-for-agents-lazygit-for-humans

## Decision

Stack fixups with `git absorb` (auto-maps hunks to stack commits), conventional-commit messages, absorb-before-push.

## Context

Manual `rebase -i` fixup lists require the agent to compute commit hashes and edit todos — error-prone under context pressure. absorb infers the target commit per hunk from the working tree.

## Consequences

- `git-absorb` is a required install alongside lazygit.
- Commits use `type(scope): subject`; absorb runs while the stack is local (pre-push).
