import {Note} from "./Note.js"
const App = ({notes}) => {

  return (
    <div>
      <h1>Notes</h1>
      <ol>
        {notes.map((note) => (
          <Note key={note.id} content={note.content} important={note.important}/>
        ))}
      </ol>
    </div>
  );
};

export default App;
