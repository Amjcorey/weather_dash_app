//Refreshed weather data
function refreshWeather(response) {
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

//Elements
    timeElement.innerHTML = formateDate(date);
}




// Local time


function formateDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let currentDay = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${days} ${hours}:${minutes}`;
}


function searchCity(city) {
    let apiKey  = "70de72ce25d0801c193edd1d17ced422";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 // console.log(apiUrl);
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input-form");

    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Seattle");