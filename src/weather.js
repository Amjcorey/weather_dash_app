let inputCity = document.querySelector(".form-control");
let searchButton = document.querySelector(".search-form-button");

const getCityCoordinates = () => {
  let cityName = inputCity.value.trim();
  if(!cityName) return; // Return if search form is empty

  // console.log(cityName);
}

searchButton.addEventListener("click", getCityCoordinates);




// function fetchLocalation() {

//   let apiKey = '0968472c2bf24b729bf6206c08f6fed2';
//   let apiUrl = `https://api.openweathermap.org/geo/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//   console.log(apiUrl);
// }