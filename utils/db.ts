import { Note } from "./types.ts";
let index = 0;
const kv = new Map();

export function insertNote(note: Note) {
  kv.set(["notes", index], note);
  index++;
  return index;
}

export function listNotes() {
  const notes: Note[] = [];
  const iter = kv.values();
  for (const value of iter) {
    notes.push(value);
  }
  return notes;
}
