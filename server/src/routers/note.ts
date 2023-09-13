import { Router } from "express";
import {
  create,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateSingleNote,
} from "../controllers/note";

const router = Router();

router.post("/create", create);
router.patch("/:noteId", updateSingleNote);
router.delete("/:noteId", deleteNote);
router.get("/:noteId", getNoteById);
router.get("/", getAllNotes);

export default router;
