import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: exactly one letter — A for coffee, the bolder half of the
// coffee-or-tea argument. Coffee is the vivid, funny, true default:
// it jolts, it fuels, it is the drink the morning actually runs on.
const LETTER = "A";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LETTER);

// Self-check: read back and verify byte-identical, exactly one character,
// no trailing newline, no whitespace at all, and the letter is A or B.
const back = readFileSync(out, "utf8");
if (back !== LETTER) throw new Error("read-back mismatch");
if (back.length !== 1) throw new Error("entry must be exactly one letter");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (/\s/.test(back)) throw new Error("whitespace in entry");
if (back !== "A" && back !== "B")
  throw new Error("entry must be A for coffee or B for tea");
console.log(`wrote entry.txt (${back.length} char)`);
