// Fortune Cookie for the Liquidated Trader
// program/v1 — writes one fortune-cookie line to /output/entry.txt.
// Node 22, no network, no randomness: same output on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One line, 19 words: an oracular setup, then the cookie itself
// delivers the twist — the wallet is empty, but the cookie is still full.
const FORTUNE =
  "The market took your money, trader — but left you this cookie, which, unlike your wallet, is still full.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Guard the gate before writing: the sealed scorer requires UTF-8 text
// of 1–160 characters, not only whitespace, and the brief caps the
// fortune at 20 words on a single line. Fail loudly rather than
// shipping an entry the judge never sees.
const words = FORTUNE.trim().split(/\s+/);
if (
  FORTUNE.length < 1 ||
  FORTUNE.length > 160 ||
  !FORTUNE.trim() ||
  words.length > 20 ||
  FORTUNE.includes("\n")
) {
  throw new Error("Fortune violates the entry gate (1-160 chars, <=20 words, one line)");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, FORTUNE, "utf8");
