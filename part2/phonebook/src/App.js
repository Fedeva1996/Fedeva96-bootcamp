import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import PersonsServices from "./Services/PersonsServices.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PersonsServices.getAll().then((response) => {
      setPersons(response);
      setIsLoading(false);
    });
  }, []);

  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(newName + " ya existe en la lista");
      return;
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(newNumber + " ya existe en la lista");
      return;
    }
    PersonsServices.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Filter</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {isLoading ? <p>Loading...</p> : ""}
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
