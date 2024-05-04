let inputCity = document.querySelector(".form-control");
let searchButton = document.querySelector(".search-form-button");
let currentLocationBtn = document.querySelector(".location-btn");
let currentWeatherDiv = document.querySelector(".current-weather");
let weatherCardDiv = document.querySelector(".forecast-cards");

// My api key
let apiKey = "0968472c2bf24b729bf6206c08f6fed2";

let createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    // HTML for the main weather display
    `
<div class="weather-overview">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h4>Temperature ${weatherItem.main.temp} F</h4>
                    <h4>High ${weatherItem.main.temp_max} | Low ${weatherItem.main.temp_min}</h4>
                    <h4>Wind: ${weatherItem.wind.speed}MPS</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon
                  }@4x.png" alt="weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>
`;
  } else {
    // HTML for five day forecast
    return `                    
  <li class="card">
  <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
  <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon
      }@2x.png" alt="weather-icon">
  <h4>Temp: ${weatherItem.main.temp}</h4>
  <h4>H:${weatherItem.main.temp_max} | L:${weatherItem.main.temp_min}</h4>
</li>
`;
  }
};

let getWeatherInformation = (cityName, lat, lon) => {
  let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

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

      //Clear previous weather data
      inputCity.value = "";
      currentWeatherDiv.innerHTML = "";
      weatherCardDiv.innerHTML = "";

      // console.log(fiveDayForecast);
      //Adding weather cards to DOM
      fiveDayForecast.forEach(weatherItem, (index) => {
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        } else {
          weatherCardDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        }
      });
    })
    .catch(() => {
      alert("Uh oh! An error occured while fetching the weather forecast.");
    });
};

// Use Geocoding API from OW
let getCityCoordinates = () => {
  let cityName = inputCity.value.trim();
  if (!cityName) return; // Return if search form is empty
  let geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}&units=imperial`;

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


// Get current location
let searchCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition (
    position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = "0968472c2bf24b729bf6206c08f6fed2";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
// console.log(data);
      })
      .catch(() => {
        alert("Uh oh! An error occured while fetching the city location.");
      });
    }, error => {
 console.log(error.code === error.PERMISSION_DENIED) {
  confirm("Cannot find current location. Please allow access to current location in browser settings and try again.");
 }
    }
  );
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// Add search history to local storage
// function executeSearch(searchCity) {
//   searchHistory.push(searchCity);
//   localStorage.setItem("searches", JSON.stringify(searchHistory));
//   getWeather(searchCity);
// }

currentLocationBtn.addEventListener("click", searchCurrentLocation);
searchButton.addEventListener("click", getCityCoordinates);