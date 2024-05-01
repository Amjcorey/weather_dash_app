let inputCity = document.querySelector(".form-control");
let searchButton = document.querySelector(".search-form-button");
let apiKey = "0968472c2bf24b729bf6206c08f6fed2";

let getCityCoordinates = () => {
  let cityName = inputCity.value.trim();
  if(!cityName) return; // Return if search form is empty
  let geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

  console.log(geoApiUrl);

  fetch(geoApiUrl).then(res => res.json()).then( data => {
    console.log(data);
  }).catch(() => {
    alert("Uh oh! An error occured while fetching those coordinates.");
  });
  // console.log(cityName);
}

searchButton.addEventListener("click", getCityCoordinates);


//   
//   let apiUrl = `https://api.openweathermap.org/geo/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//   console.log(apiUrl);