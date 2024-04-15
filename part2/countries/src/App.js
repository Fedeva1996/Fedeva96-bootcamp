import { useEffect, useState } from "react";
import "./App.css";
import Countries from "./Components/Countries";
import CountriesServices from "./Services/CountriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

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

  const handleShow = (name) => {
    setFilter(name)
  };

  return (
    <div className="App">
      Find countries <input onChange={handleFilter}></input>
      {loading === false ? (
        <Countries countries={countries} handleShow={handleShow} filter={filter} />
      ) : (
        "Cargando"
      )}
    </div>
  );
}

export default App;
