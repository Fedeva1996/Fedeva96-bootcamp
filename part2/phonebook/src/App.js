import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import PersonsServices from "./Services/PersonsServices.js";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  //get all
  useEffect(() => {
    setIsLoading(true);
    PersonsServices.getAll().then((response) => {
      setPersons(response);
      setIsLoading(false);
    });
  }, []);

  //create new
  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(newName + " ya existe en la lista, ¿desea actualizarlo?")
      ) {
        handleUpdate(
          persons.find((person) => person.name === newName).id,
          newNumber
        );
        return;
      } else {
        alert("Operacion cancelada");
        return;
      }
    }
    PersonsServices.create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setMessage("Nueva persona");
        setClassName("success");
        setTimeout(() => {
          setMessage("");
          setClassName("");
        }, 2000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setMessage("Error: " + error);
        setClassName("error");
        setTimeout(() => {
          setMessage("");
          setClassName("");
        }, 2000);
      });
  };

  //update
  const handleUpdate = (id, newNumber) => {
    const person = persons.find((person) => person.id === id);
    const changedNumber = { ...person, number: newNumber };

    PersonsServices.update(id, changedNumber)
      .then((returnedNumber) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedNumber))
        );
        setMessage("Numero actualizado");
        setClassName("success");
        setTimeout(() => {
          setMessage("");
          setClassName("");
        }, 2000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setMessage(`Los datos de ${person.name} ya no estan en el servidor. Error: ${error}`);
        setClassName("error");
        setPersons(persons.filter((person) => person.id !== id));
        setTimeout(() => {
          setMessage("");
          setClassName("");
        }, 2000);
      });
  };

  //delete
  const handleDelete = (id) => {
    if (window.confirm("Seguro que quieres borrar?")) {
      PersonsServices.drop(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage("Persona eliminada");
          setClassName("success");
          setTimeout(() => {
            setMessage("");
            setClassName("");
          }, 2000);
        })
        .catch((error) => {
          setMessage("Error: " + error);
          setClassName("error");
          setTimeout(() => {
            setMessage("");
            setClassName("");
          }, 2000);
        });
    } else {
      window.alert("Operacion cancelada");
    }
  };
  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Filter</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add new</h2>
      <Notification message={message} className={className} />
      <PersonForm
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {isLoading ? <p>Loading...</p> : ""}
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
