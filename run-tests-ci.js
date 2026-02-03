process.env.CI = "true";

// Configure jest-junit output
process.env.JEST_JUNIT_OUTPUT_DIR = "reports/junit";
process.env.JEST_JUNIT_OUTPUT_NAME = "junit.xml";

// Force Jest to use reporters (works with CRA because we inject via env var)
process.env.JEST_REPORTERS = "default jest-junit";

const { spawnSync } = require("child_process");

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["react-scripts", "test", "--watchAll=false"],
  { stdio: "inherit", shell: false }
);

process.exit(result.status ?? 1);
