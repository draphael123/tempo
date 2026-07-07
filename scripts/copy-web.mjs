// Copies the web app (the source of truth at repo root) into www/,
// which Capacitor uses as its webDir. Keeps the Vercel PWA deploy (served
// from root) and the native build reading from a single set of files.
import { mkdirSync, copyFileSync, rmSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

// Everything the app needs at runtime. (Icons matched by prefix below.)
const files = ["index.html", "sw.js", "manifest.webmanifest", "icon.svg"];
const iconPngs = readdirSync(root).filter(f => /^icon.*\.png$/.test(f));

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

for (const f of [...files, ...iconPngs]) {
  const src = join(root, f);
  if (existsSync(src)) copyFileSync(src, join(www, f));
  else console.warn("skip (missing):", f);
}

console.log(`www/ built — ${readdirSync(www).length} files copied.`);
