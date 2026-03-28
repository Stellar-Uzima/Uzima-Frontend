import fs from "node:fs";
import path from "node:path";

const statsPath = path.join(process.cwd(), ".next", "analyze", "client-stats.json");

if (!fs.existsSync(statsPath)) {
  console.error(`Missing stats file: ${statsPath}`);
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
const chunks = stats.chunks || [];
const modules = stats.modules || [];

const initialChunkIds = new Set(
  chunks.filter((chunk) => chunk.initial).map((chunk) => String(chunk.id)),
);

const packageSizes = new Map();
const appCodeKey = "(app code)";

for (const mod of modules) {
  if (!mod || !Array.isArray(mod.chunks) || mod.chunks.length === 0) {
    continue;
  }

  const isInInitial = mod.chunks.some((chunkId) => initialChunkIds.has(String(chunkId)));
  if (!isInInitial) {
    continue;
  }

  const identifier = mod.identifier || mod.name || "";
  const size = Number(mod.size || 0);

  let packageName = appCodeKey;

  const nodeModulesIdx = identifier.lastIndexOf("node_modules/");
  if (nodeModulesIdx >= 0) {
    const sub = identifier.slice(nodeModulesIdx + "node_modules/".length);
    const parts = sub.split("/");
    if (parts[0]?.startsWith("@")) {
      packageName = `${parts[0]}/${parts[1] || ""}`;
    } else {
      packageName = parts[0] || appCodeKey;
    }
  }

  packageSizes.set(packageName, (packageSizes.get(packageName) || 0) + size);
}

const sorted = [...packageSizes.entries()].sort((a, b) => b[1] - a[1]);
const top10 = sorted.slice(0, 10);

console.log("Top dependencies in initial client chunks (by parsed module size):");
for (const [pkg, size] of top10) {
  console.log(`${pkg}\t${size}`);
}

const report = {
  generatedAt: new Date().toISOString(),
  initialChunkCount: initialChunkIds.size,
  topDependencies: top10.map(([name, size]) => ({ name, size })),
};

const reportDir = path.join(process.cwd(), "analyze");
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, "main-bundle-top-deps.json"), JSON.stringify(report, null, 2));
