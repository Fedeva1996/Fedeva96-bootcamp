const Countries = ({ countries, filter }) => (
  <div>
    {countries
    .filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    .map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ))}
  </div>
);

export default Countries;
