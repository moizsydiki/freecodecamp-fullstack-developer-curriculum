let getWeather = async (city) => {
  const res = await fetch(`
        https://weather-proxy.freecodecamp.rocks/api/city/${city}
        `);

  const data = await res.json();
  return data;
};
