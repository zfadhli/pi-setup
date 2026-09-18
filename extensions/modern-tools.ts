import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

export default function (pi: ExtensionAPI) {
  // Redirect legacy tools -> modern equivalents (ticket 01).
  // repo_map tool added in ticket 02 (same seam, extended here).
  pi.on("tool_call", async (event) => {
    const name = event.toolName;
    if (name === "grep") {
      return {
        block: true,
        reason: "Use rg (--hidden --glob '!.git' -n) or ffgrep instead of grep. See /skill:modern-search.",
      };
    }
    if (name === "find") {
      return {
        block: true,
        reason: "Use fd (-H -E .git) or fffind instead of find. See /skill:modern-search.",
      };
    }
    if (name === "ls") {
      return {
        block: true,
        reason: "Use eza (-T -L 2 --git-ignore) or repo_map instead of ls. See /skill:repo-map.",
      };
    }
  });

  pi.registerTool({
    name: "repo_map",
    label: "Repo Map",
    description:
      "Token-cheap repo map: eza tree (depth 2) + tokei language breakdown + fd file counts. Use for 'map this repo' tours.",
    parameters: Type.Object({
      dir: Type.Optional(Type.String({ description: "Directory to map (default cwd)" })),
      depth: Type.Optional(Type.Number({ description: "Tree depth, default 2, max 4" })),
    }),
    async execute(_toolCallId, params) {
      const { execFile } = await import("node:child_process");
      const { promisify } = await import("node:util");
      const run = promisify(execFile);
      const dir = params.dir || process.cwd();
      const depth = Math.min(params.depth ?? 2, 4);
      const out: string[] = [];
      try {
        const { stdout } = await run("eza", ["-T", "-L", String(depth), "--git-ignore", "--icons=never", dir], { timeout: 15000, maxBuffer: 1 << 20 });
        out.push("## tree (eza)\n```\n" + stdout.slice(0, 3000) + "\n```");
      } catch {
        try {
          const { stdout } = await run("fd", [".", dir, "-t", "f", "-t", "d", "--max-depth", String(depth + 1)], { timeout: 15000, maxBuffer: 1 << 20 });
          out.push("## tree (fd fallback)\n```\n" + stdout.split("\n").slice(0, 80).join("\n") + "\n```");
        } catch (e) {
          out.push(`## tree failed: ${String(e).slice(0, 200)}`);
        }
      }
      try {
        const { stdout } = await run("tokei", ["--output", "json", dir], { timeout: 20000, maxBuffer: 1 << 20 });
        const j = JSON.parse(stdout);
        const langs = Object.entries(j)
          .filter(([k]) => k !== "Total")
          .map(([lang, v]: [string, any]) => `- ${lang}: ${v.code} code / ${v.files?.length ?? v.reports?.length ?? "?"} files`)
          .slice(0, 20);
        out.push("## languages (tokei)\n" + langs.join("\n"));
        if (j.Total) out.push(`\nTotal: ${j.Total.code} code lines, ${j.Total.files} files`);
      } catch {
        out.push("## languages: tokei not available (brew install tokei)");
      }
      const text = out.join("\n\n").slice(0, 5000);
      return { content: [{ type: "text" as const, text }], details: { dir, depth } };
    },
  });
}
