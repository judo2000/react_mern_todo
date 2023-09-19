import React, { useState } from "react";
import NoteItem from "./components/NoteItem";

const App = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white shadow-lg rounded p-5 space-y-6">
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          {title.trim() && title.length < 3 ? (
            <p className="text-red-500">Title is too short</p>
          ) : null}
          <input
            type="text"
            className="w-full border-b-2 border-gray-700 outline-none"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <textarea
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            placeholder="Description"
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
      {/* Note Items*/}

      <NoteItem title="My first reusable component" />
      <NoteItem title="My second reusable component" />
      <NoteItem title="My third reusable component" />
    </div>
  );
};

export default App;
