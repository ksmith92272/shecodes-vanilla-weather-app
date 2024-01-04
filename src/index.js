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
	let wind = parseFloat(response.data.wind.speed) * 3.6;
	let feels_like = response.data.temperature.feels_like;
	let icon = response.data.condition.icon_url;
	let date = new Date(response.data.time * 1000);
	let formattedDate = formatDate(date);

	if (document.getElementById("imperial").classList.contains("selected")) {
		//convert to imperial if fahrenheit is selected
		temp = (parseFloat(temp) * 9) / 5 + 32;
		feels_like = (parseFloat(feels_like) * 9) / 5 + 32;
		wind = parseFloat(wind) / 1.609;
	}

	let cityElement = document.getElementById("city");
	let countryElement = document.getElementById("country");
	let descriptionElement = document.getElementById("description");
	let tempElement = document.getElementById("current-temp");
	let humidityElement = document.getElementById("humidity");
	let windElement = document.getElementById("wind");
	let feelsLikeElement = document.getElementById("feels-like");
	let iconElement = document.getElementById("condition-icon");
	let dateElement = document.getElementById("date");

	cityElement.innerHTML = city;
	countryElement.innerHTML = country;
	descriptionElement.innerHTML = description;
	tempElement.innerHTML = Math.round(temp);
	humidityElement.innerHTML = Math.round(humidity);
	windElement.innerHTML = Math.round(wind);
	feelsLikeElement.innerHTML = Math.round(feels_like);
	dateElement.innerHTML = formattedDate;
	iconElement.src = icon;

	//clear form
	let searchFormElement = document.getElementById("search-form");
	searchFormElement.reset();
}

function formatDate(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();

	if (hours < 10) {
		hours = `0${hours}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	return `${day}<br />${hours}:${minutes}`;
}

function convertToImperial() {
	if (document.getElementById("imperial").classList.contains("deselected")) {
		let tempElement = document.getElementById("current-temp");
		let feelsLikeElement = document.getElementById("feels-like");
		let windSpeedElement = document.getElementById("wind");
		let windSpeedUnitsElement = document.getElementById("wind-speed-units");

		temp = parseFloat(tempElement.textContent) * 1.8 + 32;
		feels_like = parseFloat(feelsLikeElement.textContent) * 1.8 + 32;
		wind_speed = parseFloat(windSpeedElement.textContent) / 1.609;
		windSpeedUnits = "mi/h";

		tempElement.innerHTML = Math.round(temp);
		feelsLikeElement.innerHTML = Math.round(feels_like);
		windSpeedElement.innerHTML = Math.round(wind_speed);
		windSpeedUnitsElement.innerHTML = windSpeedUnits;

		let imperialUnitsElement = document.getElementById("imperial");
		let metricsUnitsElement = document.getElementById("metric");

		imperialUnitsElement.classList.remove("deselected");
		imperialUnitsElement.classList.add("selected");

		metricsUnitsElement.classList.remove("selected");
		metricsUnitsElement.classList.add("deselected");
	}
}

function convertToMetric() {
	if (document.getElementById("metric").classList.contains("deselected")) {
		let tempElement = document.getElementById("current-temp");
		let feelsLikeElement = document.getElementById("feels-like");
		let windSpeedElement = document.getElementById("wind");
		let windSpeedUnitsElement = document.getElementById("wind-speed-units");

		temp = (parseFloat(tempElement.textContent) - 32) / 1.8;
		feels_like = (parseFloat(feelsLikeElement.textContent) - 32) / 1.8;
		wind_speed = parseFloat(windSpeedElement.textContent) * 1.609;
		windSpeedUnits = "km/h";

		tempElement.innerHTML = Math.round(temp);
		feelsLikeElement.innerHTML = Math.round(feels_like);
		windSpeedElement.innerHTML = Math.round(wind_speed);
		windSpeedUnitsElement.innerHTML = windSpeedUnits;

		let imperialUnitsElement = document.getElementById("imperial");
		let metricsUnitsElement = document.getElementById("metric");

		imperialUnitsElement.classList.remove("selected");
		imperialUnitsElement.classList.add("deselected");

		metricsUnitsElement.classList.remove("deselected");
		metricsUnitsElement.classList.add("selected");
	}
}

//Event listeners
let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let imperialUnitElement = document.getElementById("imperial");
imperialUnitElement.addEventListener("click", convertToImperial);

let metricUnitElement = document.getElementById("metric");
metricUnitElement.addEventListener("click", convertToMetric);

//On page load
searchCity("Dallas");
