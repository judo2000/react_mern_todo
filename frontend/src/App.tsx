import { useState, ChangeEventHandler, useEffect } from "react";
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

  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const getAllNotes = async () => {
      const { data } = await axios("http://localhost:8000/note");
      setNotes(data.notes);
    };
    getAllNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedNoteId) {
            // then update
            console.log("SELECTED NOTE ID ", selectedNoteId);
            const { data } = await axios.patch(
              `http://localhost:8000/note/${selectedNoteId}`,
              {
                title: values.title,
                description: values.description,
              }
            );

            const updatedNotes = notes.map((note) => {
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              setSelectedNoteId("");
              return note;
            });
            setNotes([...updatedNotes]);
            setValues({ title: "", description: "" });
            return;
          }
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
        return (
          <NoteItem
            onEditClick={() => {
              console.log(note.id);
              setSelectedNoteId(note.id);
              setValues({
                title: note.title,
                description: note.description || "",
              });
            }}
            onDeleteClick={async () => {
              const result = confirm("Are you sure?");
              if (result) {
                // delete
                await axios.delete(`http://localhost:8000/note/${note.id}`);
                // const updatedNotes = notes.filter(({ id }) => {
                //   if (id !== note.id) {
                //     return note;
                //   }
                // });
              }
            }}
            key={note.id}
            title={note.title}
          />
        );
      })}
    </div>
  );
};

export default App;
