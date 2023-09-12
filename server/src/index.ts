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
  // const newNote = new Note<NoteDocument>({
  //   title: (req.body as IncomingBody).title,
  //   description: (req.body as IncomingBody).description,
  // });

  // await newNote.save();
  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  res.json({ message: "Note created!" });
});

app.listen(8000, () => {
  console.log("listening");
});
