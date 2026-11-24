// The Long Roast: Lawmakers and the File They Cannot Convert — one
// satirical sentence written to /output/entry.txt. Congress will regulate
// your algorithm, your wallet, and your feed — but it cannot regulate a
// Word document into a PDF, so the law arrives as a screenshot.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Congress will regulate your algorithm, your wallet, and your feed, but it cannot regulate a Word document into a PDF, so the law arrives as a screenshot.";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > 320) {
    throw new Error(`entry must be 1-320 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single sentence on one line");
  }
  // Exactly one sentence: one sentence-ending mark, and it must close the text.
  const closers = (text.match(/[.!?]/g) ?? []).length;
  if (closers !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending with a period");
  }
  // Invisible whitespace (non-breaking space, zero-width space) would
  // silently change the judged bytes without showing on screen.
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("read-back mismatch: entry.txt differs from LINE");
  }
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
assertGate(LINE);
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
verifyWritten(`${outDir}/entry.txt`, LINE);

// revised: the roast works because the screenshot IS the law — the format failure is the punchline, not the setup.
