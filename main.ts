import { Router, Application, oakCors } from "./deps.ts";
import { insertNote, listNotes } from "./utils/db.ts";

const router = new Router();
router.get("/notes", async (ctx) => {
  const notes = await listNotes();
  console.log(`all notes are ${notes}`)
  ctx.response.body = notes
})
.post("/notes", async (ctx) => {
  const note = await ctx.request.body().value
  console.log(`recieved ${note} from ${ctx.request.ip}`)
  const index = await insertNote(note);
  if (index === null) {
    ctx.response.body = {
      error: 'insert fail'
    }
  } else {
    ctx.response.body = {
      message: `note id is ${index}`
    }
  }
})
;

const app = new Application();
app.use(oakCors())
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });