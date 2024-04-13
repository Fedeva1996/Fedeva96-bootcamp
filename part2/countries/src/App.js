import { useEffect, useState } from "react";
import "./App.css";
import Countries from "./Countries";
import Country from "./Country";
import CountriesServices from "./Services/CountriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    CountriesServices.getAll()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleButton = (name) => {
    setFilter(name);
  };

  return (
    <div className="App">
      Find countries <input onChange={handleFilter}></input>
      {loading === false ? (
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        ).length > 10 ? (
          <p>To many matches, specify another filter</p>
        ) : countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          ).length === 1 ? (
          <Country countries={countries} filter={filter} />
        ) : (
          <Countries
            countries={countries}
            filter={filter}
            handleButton={handleButton}
          />
        )
      ) : (
        "Cargando"
      )}
    </div>
  );
}

export default App;
