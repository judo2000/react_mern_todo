import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  // need data to create new note/todo
  console.log(req.body);
  res.json({ message: "I am listening" });
});

app.listen(8000, () => {
  console.log("listening");
});
