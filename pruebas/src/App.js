import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import noteService from "./Services/noteServices.js";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event) => {
    setNewNotes(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToObject = {
      userId: 1,
      id: notes.length + 1,
      title: newNote,
      body: newNote + "-body",
    };
    noteService
      .create(noteToObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNotes("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      {isLoading ? "Cargando..." : ""}
      <ol>
        {notes.map((note) => (
          <Note
            key={note.id}
            title={note.title}
            body={note.body}
            important={note.important}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input typeof="text" onChange={handleChange} value={newNote} />
        <button>Subir nota</button>
      </form>
    </div>
  );
};

export default App;
