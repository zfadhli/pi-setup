---
name: git-workflow
description: GitHub workflow for pi agents and humans — gh --json for agents, lazygit for humans. Use for issues, PRs, branches, conventional commits, absorb fixups.
---

# Git Workflow

Rule: the agent touches GitHub **only** via `gh --json` + `jq`. Never parse human tables. The human reviews in `lazygit`.

## Read: issues and PRs as data

```bash
gh auth status                                            # must pass first
gh issue list --json number,title,labels --limit 20 \
  | jq -c '.[] | {n: .number, t: .title}'
gh issue view 12 --json number,title,body,comments \
  | jq -r '.title, (.comments[] | "- \(.author.login): \(.body[:120])")'
gh pr list --json number,title,headRefName --limit 10 \
  | jq -c '.[] | {n: .number, t: .title, br: .headRefName}'  # status overview, mined
gh pr list --json number,title,headRefName,checks \
  | jq -c '.[] | {n: .number, t: .title, br: .headRefName}'
gh pr view 7 --json number,title,files,reviews \
  | jq -r '.files[] | "\(.path) +\(.additions)/-\(.deletions)"'
```

Field selection (`--json f1,f2`) keeps output token-cheap. Add `--jq` for one-shot filters.

## Write: branches, conventional commits, absorb fixups

```bash
git switch -c feat/<scope>-<short>          # branch per issue, e.g. feat/auth-oauth
# ... edit ...
git add -p && git commit -m "feat(auth): add oauth callback"  # type(scope): subject
# types: feat fix docs refactor test chore. Subject imperative, <72 chars.
# ... more edits to already-committed lines ...
git absorb                                   # auto-maps hunks as fixup! to stack commits
 git log --oneline -5                        # verify fixup! landed, then push
```

`git absorb` infers the target commit per hunk — never hand-edit `rebase -i` todos. Absorb while the stack is local (pre-push). Docs-only pager config for readable diffs (human runs once):

```bash
git config --global core.pager "delta --line-numbers --side-by-side"
git config --global interactive.diffFilter "delta --color-only"
```

Diffs in agent commands: `git diff | delta --line-numbers` or `difft --display side-by-side`.

## Ship: issue to PR, then hand to human

Full flow, one stage at a time:

```bash
gh issue view 12 --json number,title --jq '.number'   # 1. pick issue
git switch -c feat/<scope>-<short>                   # 2. branch
# ... commits + absorb ... && git push -u origin HEAD # 3. push stack
gh pr create --fill --json number,url                # 4. PR as data
  --jq '{n: .number, url}'
gh pr view 7 --json mergeStateStatus --jq '.mergeStateStatus'
git diff main...HEAD | delta --line-numbers           # review diff, not gh tables
gh pr merge 7 --squash --json merged --jq '.merged'   # 5. merge when green
```

Handoff: human opens `lazygit` for final review; agent reports only `--json` facts (checks, reviewDecision, mergeable). Never create draft/exploratory PRs — rehearse read-only (`pr list`) until the push is real.
