# Glossary

- **modern tool**: Rust/Go CLI replacing coreutils with structured, .gitignore-aware, token-cheap output (rg, fd, fzf, bat, eza, delta, sg, jq).
- **fg family**: fd + rg + fzf + fff fuzzy-find and content-search family. fff adds frecency ranking via pi-fff extension.
- **pi extension**: TypeScript module via pi.registerTool / pi.on(tool_call). Only enforcement point that survives LLM tool dispatch.
- **pi skill**: SKILL.md package with frontmatter name+description, loaded on-demand. Progressive disclosure for tool flags.
- **vertical slice**: One ticket delivering docs + config + code + test demoable in one context window. No horizontal layer tickets.
