import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const getWeather = (cityName) => {
  const request = axios.get(
    `${weatherUrl}?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_URL}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
