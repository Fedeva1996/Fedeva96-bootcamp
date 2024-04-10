import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber, id: persons.length + 1};
    if (persons.find((person) => person.name === newName)) {
      alert(newName + " ya existe en la lista");
      return;
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(newNumber + " ya existe en la lista");
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <div>
      <h2>Filter</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm handleName={handleName} handleNumber={handleNumber} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
