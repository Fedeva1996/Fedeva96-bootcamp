import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("renderizado");
    setIsLoading(true);
    axios.get("http://localhost:3001/notes").then((response) => {
      const { data } = response;
      setNotes(data);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setNewNotes(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("nota creada");
    const noteToObject = {
      id: notes.length + 1,
      title: newNote,
      body: newNote + "-body",
    };
    console.log(noteToObject);
    setNotes(notes.concat(noteToObject));
    setNewNotes("");
  };
  return (
    <div>
      <h1>Notes</h1>
      {isLoading ? "Cargando..." : ""}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} title={note.title} body={note.body} />
        ))}
      </ol>
      <form onSubmit={handleClick}>
        <input typeof="text" onChange={handleChange} value={newNote} />
        <button>Subir nota</button>
      </form>
    </div>
  );
};

export default App;
