import Country from "./Country";

const Countries = ({ countries, filter, handleShow }) => {
  let country = "";
  if (filter === "") {
    return;
  } else {
    country = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter)
    );
  }
  if (country.length > 10) {
    return "To many matches, specify another filter";
  } else if (country.length === 1) {
    return <Country country={country[0]} />;
  } else {
    return (
      <div>
        {country.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => handleShow(country.name.common, country.capital)}
            >
              Mostrar
            </button>
          </p>
        ))}
      </div>
    );
  }
};

export default Countries;
