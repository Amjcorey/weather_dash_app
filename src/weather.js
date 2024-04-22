//Refreshed weather data
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  //Elements
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

// Local time
// function formatDate(date) {
//   let minutes = date.getMinutes();
//   let hours = date.getHours();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   let day = days[date.getDay()];

//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   return `${day}, ${hours}:${minutes}`;
// }

function fetchLocalation(city) {
  let city = city.trim().toLowerCase();
  let apiKey = '0968472c2bf24b729bf6206c08f6fed2';
  let apiUrl = `https://api.openweathermap.org/geo/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(apiUrl);
  // axios.get(apiUrl).then(refreshWeather);
fetch(apiUrl).then((response) => {
  if (!response.ok) {
    throw new Error("Cannot find that city");
  }
  return response.json();
})
.then((data) => {
  if ( data && data.length > 0 ) {
    let { lat, lon } = data[0];
    fetchLocalWeather( city, lat, lon );
  } 
  else {
    displayError("Cannot find that city");
  }
})
.catch((error) => {
  console.error("Error: ", error);
  displayError("There was an error while retrieving that information...");
});
}

// Err message function
function displayError(message) {
  let errorContainer = document.getElementById('error-message');
  errorContainer.textContent = message;
  errorContainer.classList.remove('hidden');
  setTimeout(() => errorContainer.classList.add('hidden', 3000)) //confirm port
}

// function fetch city weather
function fetchWeatherData(city, lat, lon) {
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
}
// function handleSearchSubmit(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-form-input");
//   console.log(searchInput.value);
//   searchCity(searchInput.value);
// }



// //Get time stamp
// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   return days[date.getDay()];
// }

// function storeSearchData(city) {
//   let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//   if (!searchHistory.includes(city)) {
//     searchHistory.push(city);
//     localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//   }
// }

// function updateSearchInputHistory() {
//   const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
//   const searchHistoryContainer = document.getElementById("search-input-history");

//   searchHistoryContainer.innerHTML = "";

//   searchHistory.forEach((city) => {
//     const historyData = document.createElement("div");
//     historyData.className = "history-data";
//     historyData.addEventListener("click", () => {
//       displayWeather
//     })
//   })
// }

// let searchFormElement = document.querySelector("#search-form");
// searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Seattle");
