let inputCity = document.querySelector(".form-control");
let searchButton = document.querySelector(".search-form-button");

// My api key
let apiKey = "0968472c2bf24b729bf6206c08f6fed2";

let createWeatherCard = (weatherItem) => {
  return`                    
  <li class="card">
  <h3>04/22/2024</h3>
  <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon">
  <h4>Temp: </h4>
  <h4>Wind: mps</h4>
  <h4>Humidity: %</h4>
</li>
`
}

let getWeatherInformation = (cityName, lat, lon) => {
  let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {

      // Filters the forecast to get only one forecast per day
      let forecastDays = [];
      let fiveDayForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!forecastDays.includes(forecastDate)) {
          return forecastDays.push(forecastDate);
        }
      });
      console.log(fiveDayForecast);
      fiveDayForecast.forEach(weatherItem => {
        createWeatherCard(weatherItem);
      })
    })
    .catch(() => {
      alert("Uh oh! An error occured while fetching the weather forecast.");
    });
};

// Use Geocoding API from OW
let getCityCoordinates = () => {
  let cityName = inputCity.value.trim();
  if (!cityName) return; // Return if search form is empty
  let geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

  // console.log(geoApiUrl);

  // Get entered city coordinates (lat, lon, and name) from API response
  fetch(geoApiUrl)
    .then((res) => res.json())
    .then((data) => {
      //  console.log(data);
      if (!data.length)
        return alert(`Oh snap! No coordinates where found for ${cityName}.`);
      let { name, lat, lon } = data[0];
      getWeatherInformation(name, lat, lon);
    })
    .catch(() => {
      alert("Uh oh! An error occured while fetching those coordinates.");
    });
  // console.log(cityName);
};

searchButton.addEventListener("click", getCityCoordinates);
