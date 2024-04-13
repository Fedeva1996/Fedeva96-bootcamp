const Countries = ({ countries, filter, handleButton }) => (
  <div>
    {countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
      .map((country) => (
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleButton(country.name.common)}>
            Mostrar
          </button>
        </p>
      ))}
  </div>
);

export default Countries;
