const Country = ({ countries, filter }) =>
  countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    .map((country) => (
      <div key={country.name.common}>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <ul>
          {Object.values(country.languages).map((lenguage) => (
            <li key={lenguage}>{lenguage}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
      </div>
    ));

export default Country;
