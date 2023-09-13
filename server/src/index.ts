import express from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";
import {
  create,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateSingleNote,
} from "./controllers/note";

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

app.post("/create", create);

app.patch("/:noteId", updateSingleNote);

app.delete("/:noteId", deleteNote);

app.get("/:noteId", getNoteById);

app.get("/", getAllNotes);

app.listen(8000, () => {
  console.log("listening");
});
