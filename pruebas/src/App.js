import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import noteService from "./Services/noteServices.js";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};
const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setMessage(`A new note '${newNote}' created`);
        setNewNotes("");
        setTimeout(() => {
          setMessage(null);
        }, 2000);
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
        setMessage(`Note '${note.title}' been updated`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
      .catch((error) => {
        setMessage(`Note '${note.title}' has an error`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      {message === "" ? "" : <Notification message={message} />}
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
      <Footer />
    </div>
  );
};

export default App;
