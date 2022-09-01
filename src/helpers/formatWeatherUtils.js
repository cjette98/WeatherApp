import moment from 'moment-timezone'

const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
  
    const { main: details, icon } = weather[0];
  
    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      icon,
      speed,
    };
  };

  const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "LLL"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
  
    hourly = hourly.slice(1, 23).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
  
    return { timezone, daily, hourly };
  };

  
  const formatToLocalTime = (
    secs,
    zone,
    format
  ) => moment.unix(secs).tz(zone).format(format)

  export {
    formatCurrentWeather,
    formatForecastWeather
  }