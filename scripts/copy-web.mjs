// Copies the web app (the source of truth at repo root) into www/,
// which Capacitor uses as its webDir. Keeps the Vercel PWA deploy (served
// from root) and the native build reading from a single set of files.
import { mkdirSync, copyFileSync, rmSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

// Everything the app needs at runtime. (Icons matched by prefix below.)
const files = ["index.html", "sw.js", "manifest.webmanifest", "icon.svg"];
const iconPngs = readdirSync(root).filter(f => /^icon.*\.png$/.test(f));
const dirs = ["fonts"]; // bundled webfonts (offline)

function copyDir(rel){
  const src = join(root, rel), dst = join(www, rel);
  if (!existsSync(src)) { console.warn("skip dir (missing):", rel); return 0; }
  mkdirSync(dst, { recursive: true });
  let n = 0;
  for (const f of readdirSync(src)) {
    const s = join(src, f);
    if (statSync(s).isFile()) { copyFileSync(s, join(dst, f)); n++; }
  }
  return n;
}

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

let count = 0;
for (const f of [...files, ...iconPngs]) {
  const src = join(root, f);
  if (existsSync(src)) { copyFileSync(src, join(www, f)); count++; }
  else console.warn("skip (missing):", f);
}
for (const d of dirs) count += copyDir(d);

console.log(`www/ built — ${count} files copied.`);
