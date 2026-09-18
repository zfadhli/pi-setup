# Glossary

- **modern tool**: Rust/Go CLI replacing coreutils with structured, .gitignore-aware, token-cheap output (rg, fd, fzf, bat, eza, delta, sg, jq).
- **fg family**: fd + rg + fzf + fff fuzzy-find and content-search family. fff adds frecency ranking via pi-fff extension.
- **pi extension**: TypeScript module via pi.registerTool / pi.on(tool_call). Only enforcement point that survives LLM tool dispatch.
- **pi skill**: SKILL.md package with frontmatter name+description, loaded on-demand. Progressive disclosure for tool flags.
- **vertical slice**: One ticket delivering docs + config + code + test demoable in one context window. No horizontal layer tickets.
- **gh JSON contract**: gh CLI with --json flag piped to jq. The only agent-safe GitHub interface: stable schema, no table parsing.
- **human/agent interface split**: lazygit TUI for the human; gh --json for the agent. Each side uses the interface that fits it.
- **auto-fixup (absorb)**: git absorb auto-assigns working-tree hunks as fixup commits to the right stack commit. No manual rebase todos.
- **conventional commit**: type(scope): subject format (feat/fix/docs/refactor/test/chore). Required on every commit the skill produces.
