import { useState } from "react";
import { Note } from "./Note.js";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleChange = (event) => {
    setNewNotes(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("nota creada");
    const noteToObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5,
    };
    console.log(noteToObject);
    setNotes(notes.concat(noteToObject));
    setNewNotes("");
    /*{
      id: 1,
      content: 'HTML is easy',
      important: true
    },*/
  };
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        {showAll ? "Show all" : "Show only important"}
      </button>
      <ol>
        {notes
        .filter((note) => showAll || note.important)
        .map((note) => (
          <Note key={note.id} content={note.content} />
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
