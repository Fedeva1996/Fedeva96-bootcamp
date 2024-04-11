const Persons = ({ persons, newFilter, handleDelete }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person.id)}>Borrar</button>
        </p>
      ))}
  </div>
);

export default Persons;