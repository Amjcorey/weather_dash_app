




// Local time
let currentTime = new Date();

function formateDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let currentYear = date.getFullYear();
    let currentDay = days[date.getDay()];
    let currentMonth = months[date.getMonth()];
    let currentDate = date.getDate();

    let formattedDate = `Date: ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

    return formattedDate();

}


function searchCity(city) {
    let apiKey  = "XX";
    let apiUrl = "xxx";
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