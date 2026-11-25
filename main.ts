// The GPS Swears It Was a Shortcut — make.fun entry program.
// Writes the GPS's one-line excuse to /output/entry.txt.
// Gate: UTF-8 text, 1 to 200 characters, one line, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I took you to the wedding AND the lake. The map never said they were separate events.";

const OUT_PATH = "/output/entry.txt";

// Gate limits from the competition rules: UTF-8 text, 1 to 200 characters.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Byte-for-byte read-back: what the judge reads must be exactly what we wrote.
  const readBack = readFileSync(OUT_PATH);
  if (!readBack.equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
  }
  console.log(`wrote ${[...ENTRY].length} characters to ${OUT_PATH} (read-back verified)`);
}

main();
