import express from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  // need data to create new note/todo
  console.log(req.body);
  res.json({ message: "I am listening" });
});

interface IncomingBody {
  title: string;
  description?: string;
}

app.post("/create", async (req, res) => {
  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  res.json({ message: "Note created!" });
});

app.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  // const note = await Note.findById(noteId);
  // if (!note) return res.json({ error: "Note not fou nd!" });

  const { title, description } = req.body as IncomingBody;
  // if (title) note.title = title;
  // if (description) note.description = description;

  const note = await Note.findByIdAndUpdate(
    noteId,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  if (!note) return res.json({ error: "Note not fou nd!" });

  await note.save();

  res.json({ note });
});

app.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await Note.findByIdAndDelete(noteId);

  if (!removedNote) res.json({ message: "Note not found!" });

  res.json({ message: "Note removed successfully!" });
});

app.listen(8000, () => {
  console.log("listening");
});
