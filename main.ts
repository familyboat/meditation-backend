import { Router, Application, oakCors } from "./deps.ts";
import { insertNote, listNotes } from "./utils/db.ts";
import { PostNote } from "./utils/types.ts";

const router = new Router();
router.get("/notes", async (ctx) => {
  const url = new URL(ctx.request.url);
  let uid = url.searchParams.get('uid');
  let username = url.searchParams.get('username');
  if (!uid) {
    uid = crypto.randomUUID();
    username = (Math.random()).toString(36).slice(2);
  }

  const notes = await listNotes();
  console.log(`all notes are ${notes}`)
  ctx.response.body = {
    notes,
    uid,
    username,
  }
})
.post("/notes", async (ctx) => {
  const note : PostNote = await ctx.request.body().value
  console.log(`recieved ${note} from ${ctx.request.ip}`)
  let {uid, username} = note;
  if (!uid) {
    uid = crypto.randomUUID();
    username = (Math.random()).toString(36).slice(2);
    note.uid = uid;
    note.username = username;
  }
  const resp = await insertNote(note as Required<PostNote>);
  const rest = {
    uid,
    username,
  }
  if (resp.ok) {
    ctx.response.body = {
      error: 'insert fail',
      ...rest
    }
  } else {
    ctx.response.body = {
      message: `insert success`,
      ...rest
    }
  }
})
;

const app = new Application();
app.use(oakCors())
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });