import React, { useState, ChangeEventHandler } from "react";
import NoteItem from "./components/NoteItem";
import axios from "axios";

const App = () => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const [notes, setNotes] = useState<
    {
      id: string;
      title: string;
      description?: string;
    }[]
  >([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await axios.post(
            "http://localhost:8000/note/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          if (data.note) {
            setNotes([data.note, ...notes]);
            setValues({ title: "", description: "" });
          }
        }}
        className="bg-white shadow-lg rounded p-5 space-y-6"
      >
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          <input
            type="text"
            className="w-full border-b-2 border-gray-700 outline-none"
            placeholder="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
      {/* Note Items*/}
      {notes.map((note) => {
        return <NoteItem key={note._id} title={note.title} />;
      })}
    </div>
  );
};

export default App;
