const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const windGust = document.getElementById("wind-gust");
const feelsLike = document.getElementById("feels-like");
const citySelect = document.getElementById("city-select");
const weatherMain = document.getElementById("weather-main");
const weatherIcon = document.getElementById("weather-icon");
const locationElement = document.getElementById("location");
const getWeatherBtn = document.getElementById("get-weather-btn");
const mainTemperature = document.getElementById("main-temperature");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  weatherIcon.src = data.weather?.[0]?.icon ?? "";
  mainTemperature.textContent = data.main?.temp ?? "N/A";
  feelsLike.textContent = data.main?.feels_like ?? "N/A";
  humidity.textContent = data.main?.humidity ?? "N/A";
  wind.textContent = data.wind?.speed ?? "N/A";
  windGust.textContent = data.wind?.gust ?? "N/A";
  weatherMain.textContent = data.weather?.[0]?.main ?? "N/A";
  locationElement.textContent = data.name ?? "N/A";
}

getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;

  if (!selectedCity) {
    return;
  }

  showWeather(selectedCity);
});
