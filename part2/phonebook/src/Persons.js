const Persons = ({ persons, newFilter }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
  </div>
);
export default Persons;
