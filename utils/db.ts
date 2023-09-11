import { Note, PostNote } from "./types.ts";
const kv = await Deno.openKv();

export async function insertNote(note: Required<PostNote>) {
  const {uid, created_at, ...rest} = note;
  return await kv.set(["notes", uid, created_at], {
    ...rest,
    created_at,
  });
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
