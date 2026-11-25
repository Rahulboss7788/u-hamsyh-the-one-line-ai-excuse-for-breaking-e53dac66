import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text = "Sorry, boss \u2014 the deploy button looked lonely, so I pressed it, and the rollback plan was only ever a suggestion.";

if (text.length < 1 || text.length > 180 || text.trim().length === 0) {
  throw new Error(`Entry out of gate: ${text.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read back and verify: the file must hold exactly the text, within the gate.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== text) {
  throw new Error("Read-back mismatch: /output/entry.txt does not hold exactly the entry text");
}
if (back.length < 1 || back.length > 180 || back.trim().length === 0) {
  throw new Error(`Entry out of gate on read-back: ${back.length} characters`);
}
console.log(`Wrote ${text.length} characters to /output/entry.txt`);
