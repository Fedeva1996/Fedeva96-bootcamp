import { useEffect, useState } from "react";
import CountriesServices from "../Services/CountriesServices";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    CountriesServices.getWeather(country.name.common)
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div key={country.name.common}>
      {}
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <ul>
        {Object.values(country.languages).map((lenguage) => (
          <li key={lenguage}>{lenguage}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      {Object.keys(weather).length > 0 ? (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          ></img>
          <p>Wind {weather.wind.speed} km/s</p>
        </div>
      ) : (
        "cargando clima"
      )}
    </div>
  );
};

export default Country;
