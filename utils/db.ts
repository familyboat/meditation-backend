import { Note } from "./types.ts";
const kv = await Deno.openKv();

export async function insertNote(note: Note) {
  const index = crypto.randomUUID();
  const resp = await kv.set(["notes", index], note);
  if (resp.ok) {
    return index
  }
  return null
}

export async function listNotes() {
  const notes: Note[] = [];
  const iter = kv.list<Note>({
    prefix: ['notes']
  });
  for await (const {value} of iter) {
    notes.push(value);
  }
  return notes;
}
