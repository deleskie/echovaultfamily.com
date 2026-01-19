#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

function usage() {
  // eslint-disable-next-line no-console
  console.log(`Usage:
  node scripts/image-library.mjs index [--dir artifacts] [--previews artifacts/previews] [--out artifacts/index.json]
  node scripts/image-library.mjs promote <artifactFilename> <publicSubdir> [--id my-name]

Examples:
  npm run assets:index
  node scripts/image-library.mjs promote artifacts/photo-1586368942140-4ff23ba4de29.avif images/library --id families-letters
`);
}

function parseArgs(argv) {
  const result = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      result._.push(token);
      continue;
    }
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      result[key] = true;
      continue;
    }
    result[key] = value;
    i += 1;
  }
  return result;
}

function run(cmd, args, { cwd } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (buf) => {
      stdout += buf.toString();
    });
    child.stderr.on("data", (buf) => {
      stderr += buf.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      const error = new Error(`${cmd} ${args.join(" ")} exited with code ${code}\n${stderr}`);
      error.code = code;
      reject(error);
    });
  });
}

async function statSafe(filePath) {
  try {
    return await fs.stat(filePath);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function getSourceFromFilename(filename) {
  if (filename.startsWith("pexels-")) return "pexels";
  if (filename.startsWith("photo-") || filename.startsWith("premium_photo-") || filename.startsWith("unsplash-")) {
    return "unsplash";
  }
  return "unknown";
}

async function identifyDimensions(imagePath) {
  const { stdout } = await run("magick", ["identify", "-format", "%w %h", imagePath]);
  const [widthRaw, heightRaw] = stdout.trim().split(/\s+/);
  const width = Number.parseInt(widthRaw, 10);
  const height = Number.parseInt(heightRaw, 10);

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`Could not parse dimensions for ${imagePath}: "${stdout}"`);
  }

  return { width, height };
}

function inferOrientation(width, height) {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

async function ensurePreview(inputPath, previewPath) {
  const inputStat = await statSafe(inputPath);
  const previewStat = await statSafe(previewPath);
  if (!inputStat) {
    throw new Error(`Missing source image: ${inputPath}`);
  }
  if (previewStat && previewStat.mtimeMs >= inputStat.mtimeMs) {
    return;
  }

  await fs.mkdir(path.dirname(previewPath), { recursive: true });
  await run("magick", [
    inputPath,
    "-auto-orient",
    "-strip",
    "-resize",
    "900x900>",
    "-quality",
    "82",
    previewPath
  ]);
}

async function writeContactSheet(previewDir, outputPath) {
  const entries = await fs.readdir(previewDir, { withFileTypes: true });
  const previews = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".jpg") && name !== path.basename(outputPath))
    .sort((a, b) => a.localeCompare(b, "en"));

  if (previews.length === 0) {
    return;
  }

  await run("magick", [
    "montage",
    ...previews.map((name) => path.join(previewDir, name)),
    "-auto-orient",
    "-strip",
    "-thumbnail",
    "220x220^",
    "-gravity",
    "center",
    "-extent",
    "220x220",
    "-tile",
    "6x",
    "-geometry",
    "+18+18",
    "-background",
    "#0b1020",
    "-border",
    "0",
    outputPath
  ]);
}

async function indexArtifacts({ dir, previewsDir, outFile }) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en"));

  const indexed = [];

  for (const filename of images) {
    const absolutePath = path.join(dir, filename);
    const { width, height } = await identifyDimensions(absolutePath);
    const orientation = inferOrientation(width, height);
    const previewName = `${path.parse(filename).name}.jpg`;
    const previewAbsolutePath = path.join(previewsDir, previewName);
    await ensurePreview(absolutePath, previewAbsolutePath);

    const fileStat = await fs.stat(absolutePath);
    indexed.push({
      id: path.parse(filename).name,
      filename,
      source: getSourceFromFilename(filename),
      path: path.posix.join(path.basename(dir), filename),
      preview: path.posix.join(path.basename(dir), path.basename(previewsDir), previewName),
      width,
      height,
      orientation,
      aspect: Number((width / height).toFixed(4)),
      bytes: fileStat.size,
      mtime: fileStat.mtime.toISOString(),
      tags: [],
      notes: ""
    });
  }

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(
    outFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        root: path.basename(dir),
        images: indexed
      },
      null,
      2
    ) + "\n"
  );

  const contactSheetPath = path.join(previewsDir, "contact-sheet.jpg");
  await writeContactSheet(previewsDir, contactSheetPath);

  // eslint-disable-next-line no-console
  console.log(
    `Indexed ${indexed.length} images → ${outFile}\nContact sheet → ${contactSheetPath}\n`
  );
}

async function promoteArtifact({ artifactPath, publicSubdir, id }) {
  const artifactStat = await statSafe(artifactPath);
  if (!artifactStat) {
    throw new Error(`Artifact not found: ${artifactPath}`);
  }

  const parsed = path.parse(artifactPath);
  const safeId = id || parsed.name;
  const destDir = path.join("public", publicSubdir);
  const jpgPath = path.join(destDir, `${safeId}.jpg`);
  const webpPath = path.join(destDir, `${safeId}.webp`);

  await fs.mkdir(destDir, { recursive: true });
  await run("magick", [artifactPath, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "82", jpgPath]);
  await run("magick", [artifactPath, "-auto-orient", "-strip", "-resize", "1600x1600>", "-quality", "75", webpPath]);

  // eslint-disable-next-line no-console
  console.log(`Wrote:\n- ${jpgPath}\n- ${webpPath}\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [command, ...positional] = args._;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    process.exit(0);
  }

  if (command === "index") {
    const dir = args.dir || "artifacts";
    const previewsDir = args.previews || path.join(dir, "previews");
    const outFile = args.out || path.join(dir, "index.json");
    await indexArtifacts({ dir, previewsDir, outFile });
    return;
  }

  if (command === "promote") {
    const [artifactPath, publicSubdir] = positional;
    if (!artifactPath || !publicSubdir) {
      usage();
      process.exit(1);
    }
    await promoteArtifact({ artifactPath, publicSubdir, id: args.id });
    return;
  }

  usage();
  process.exit(1);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error?.stack || String(error));
  process.exit(1);
});

