function handleSearchSubmit(event) {
	event.preventDefault();

	let searchInput = document.getElementById("search-form-input");
	searchCity(searchInput.value);
}

function searchCity(city) {
	let key = "6atoab0f92eca3d102a54e7250f4dd0f";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;

	axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
	let city = response.data.city;
	let country = response.data.country;
	let description = response.data.condition.description;
	let temp = response.data.temperature.current;
	let humidity = response.data.temperature.humidity;
	let feels_like = response.data.temperature.feels_like;
	let wind = response.data.wind.speed;

	if (document.getElementById("fahrenheit").classList.contains("selected")) {
		//convert to imperial if fahrenheit is selected
		temp = (parseFloat(temp) * 9) / 5 + 32;
		feels_like = (parseFloat(feels_like) * 9) / 5 + 32;
		wind = parseFloat(wind) / 2.237;
	}

	let cityElement = document.getElementById("city");
	let countryElement = document.getElementById("country");
	let descriptionElement = document.getElementById("description");
	let tempElement = document.getElementById("current-temp");
	let humidityElement = document.getElementById("humidity");
	let feelsLikeElement = document.getElementById("feels-like");
	let windElement = document.getElementById("wind");

	cityElement.innerHTML = city;
	countryElement.innerHTML = country;
	descriptionElement.innerHTML = description;
	tempElement.innerHTML = Math.round(temp);
	humidityElement.innerHTML = Math.round(humidity);
	feelsLikeElement.innerHTML = Math.round(feels_like);
	windElement.innerHTML = Math.round(wind);

	let searchFormElement = document.getElementById("search-form");
	searchFormElement.reset();
}

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Dallas");
