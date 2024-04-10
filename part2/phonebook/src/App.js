import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "555 555 555" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = { name: newName, phone: newPhone };
    if (persons.find((person) => person.name === newName)) {
      alert(newName + " ya existe en la lista");
      return;
    } else if (persons.find((person) => person.phone === newPhone)) {
      alert(newPhone + " ya existe en la lista");
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewPhone("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          Number: <input onChange={handlePhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p>
          {person.name}: {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
