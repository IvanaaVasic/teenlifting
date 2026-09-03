// PostToolUse hook: runs `npx eslint --fix` on the changed file if it's a
// lintable JS/TS source. Silent on non-matches. Reads Claude Code hook JSON
// from stdin.
import { spawnSync } from "node:child_process";

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const p = JSON.parse(raw)?.tool_input?.file_path;
    if (!p || !/\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(p)) return;
    spawnSync("npx", ["eslint", "--fix", p], {
      stdio: "inherit",
      shell: true,
    });
  } catch {
    // swallow — hook must never block a successful edit
  }
});
