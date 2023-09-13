import express from "express";
import "./db";
import noteRouter from "./routers/note";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/note", noteRouter);

app.listen(8000, () => {
  console.log("listening");
});
