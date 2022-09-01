import { fetchWeatherData } from "../config/config";
import { formatCurrentWeather,formatForecastWeather } from "../helpers/formatWeatherUtils";

const getWeatherData = async ({lat,lon,units}) => {
    const params = `?lat=${lat}&lon=${lon}&units=${units}&`
    const CurrentWeather = await fetchWeatherData(
      "weather",
      params
    );

    const forecastParams = `${params}exlude=${encodeURIComponent('current,minutely,alerts')}&`
    const ForecastWeather = await fetchWeatherData("onecall",forecastParams).then(formatForecastWeather);
    
    return {...CurrentWeather, ...ForecastWeather };
  };

  export {
    getWeatherData
  }