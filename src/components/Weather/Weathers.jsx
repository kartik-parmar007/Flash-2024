import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Bhavnagar");
  const [tempInfo, setTempInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherInfo = async () => {
    if (!searchValue) return;

    setLoading(true);
    setError("");

    try {
      // Current weather
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=27e6399933d47a972ccc896a98d6ed2b`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();

      // Forecast weather
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=27e6399933d47a972ccc896a98d6ed2b`;
      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      if (weatherData.cod === 200 && forecastData.cod === "200") {
        const { temp, humidity, pressure } = weatherData.main;
        const { main: weathermood } = weatherData.weather[0];
        const { name } = weatherData;
        const { speed } = weatherData.wind;
        const { country, sunset } = weatherData.sys;

        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };

        setTempInfo(myNewWeatherInfo);

        // Process forecast data
        const forecastList = forecastData.list.slice(0, 5).map((entry) => ({
          date: entry.dt_txt,
          time: new Date(entry.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // Add time
          temp: entry.main.temp,
          weathermood: entry.weather[0].main,
        }));

        setForecastInfo(forecastList);
      } else {
        setError(weatherData.message || forecastData.message);
      }
    } catch (error) {
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  // Converting sunset time from seconds to a readable format
  const formatSunsetTime = (sec) => {
    const date = new Date(sec * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };

  // Function to calculate time duration between forecasts
  const calculateTimeDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = end - start; // duration in milliseconds
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="search"
          placeholder="Search city..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={getWeatherInfo} className={styles.searchButton}>
          Search
        </button>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <div className={styles.weatherCard}>
            <h2>
              {tempInfo.name}, {tempInfo.country}
            </h2>
            <div className={styles.weatherInfo}>
              <div className={styles.temperature}>
                <span>{tempInfo.temp}&deg;C</span>
              </div>
              <div className={styles.details}>
                <p>
                  <strong>Weather:</strong> {tempInfo.weathermood}
                </p>
                <p>
                  <strong>Humidity:</strong> {tempInfo.humidity}%
                </p>
                <p>
                  <strong>Pressure:</strong> {tempInfo.pressure} hPa
                </p>
                <p>
                  <strong>Wind Speed:</strong> {tempInfo.speed} m/s
                </p>
                <p>
                  <strong>Sunset:</strong> {formatSunsetTime(tempInfo.sunset)}{" "}
                  PM
                </p>
              </div>
            </div>
          </div>

          <div className={styles.forecast}>
            <h3>Forecast Schedule for Weather Changes</h3>
            <div className={styles.forecastList}>
              {forecastInfo.map((entry, index) => {
                const nextEntry = forecastInfo[index + 1];
                const timeDuration = nextEntry
                  ? calculateTimeDuration(entry.date, nextEntry.date)
                  : "N/A";

                return (
                  <div key={index} className={styles.forecastItem}>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {entry.time}
                    </p>{" "}
                    {/* Display the time */}
                    <p>
                      <strong>Temperature:</strong> {entry.temp}&deg;C
                    </p>
                    <p>
                      <strong>Weather:</strong> {entry.weathermood}
                    </p>
                    <p>
                      <strong>Time until next forecast:</strong> {timeDuration}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
