
import {BASE_URL,API_KEY} from '@env'


const fetchWeatherData = (type, searchParams) => {
  const url = `${BASE_URL}/${type}${searchParams}appid=${API_KEY}`;
  return fetch(url).then((res) => res.json());
  };

  export {
    fetchWeatherData
  }