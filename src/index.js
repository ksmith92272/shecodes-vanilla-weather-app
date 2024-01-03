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
	let wind = response.data.wind.speed;
	let feels_like = response.data.temperature.feels_like;
	let icon = response.data.condition.icon;
	let date = new Date(response.data.time * 1000);
	let formattedDate = formatDate(date);

	if (document.getElementById("imperial").classList.contains("selected")) {
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
	//iconElement.innerHTML = icon;

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

	if (document.getElementById("imperial").classList.contains("selected")) {
		if (hours > 12) {
			hours = hours - 12;
		}
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

searchCity("Tokyo");

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
