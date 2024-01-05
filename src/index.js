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

function toCelsius(temp) {
	let celsius = (parseFloat(temp) - 32) / 1.8;
	return celsius;
}

function toFahrenheit(temp) {
	let fahrenheit = parseFloat(temp) * 1.8 + 32;
	return fahrenheit;
}

function toKmHFromMeS(meS) {
	let kmH = parseFloat(meS) * 3.6;
	return kmH;
}

function toKmHFromMiH(miH) {
	let kmH = parseFloat(miH / 1.609);
	return kmH;
}

function toMiHFromKmH(kmH) {
	let miH = parseFloat(kmH) * 1.609;
	return miH;
}

function updateWeather(response) {
	let city = response.data.city;
	let country = response.data.country;
	let description = response.data.condition.description;
	let temp = response.data.temperature.current;
	let humidity = response.data.temperature.humidity;
	let wind = toKmHFromMeS(response.data.wind.speed);
	let feels_like = response.data.temperature.feels_like;
	let icon = response.data.condition.icon_url;

	let date = new Date(response.data.time * 1000);
	let formattedDate = formatDate(date);

	if (document.getElementById("imperial").classList.contains("selected")) {
		//convert to imperial if fahrenheit is selected
		temp = toFahrenheit(temp);
		feels_like = toFahrenheit(feels_like);
		wind = toKmHFromMiH(wind);
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

	getForecast(response.data.city);

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
	//confirm Imperial isn't already selected
	if (document.getElementById("imperial").classList.contains("deselected")) {
		//update current stats
		let tempElement = document.getElementById("current-temp");
		let feelsLikeElement = document.getElementById("feels-like");
		let windSpeedElement = document.getElementById("wind");
		let windSpeedUnitsElement = document.getElementById("wind-speed-units");

		temp = toFahrenheit(tempElement.textContent);
		feels_like = toFahrenheit(feelsLikeElement.textContent);
		wind_speed = toMiHFromKmH(windSpeedElement.textContent);
		windSpeedUnits = "mi/h";

		tempElement.innerHTML = Math.round(temp);
		feelsLikeElement.innerHTML = Math.round(feels_like);
		windSpeedElement.innerHTML = Math.round(wind_speed);
		windSpeedUnitsElement.innerHTML = windSpeedUnits;

		//update forecast temps
		let forecastDays = document.querySelectorAll(`.forecast-temp`);
		forecastDays.forEach(function (element) {
			let tempID = element.getAttribute("id");
			let tempElement = document.getElementById(tempID);
			let updatedTemp = toFahrenheit(tempElement.textContent);
			tempElement.innerHTML = Math.round(updatedTemp);
		});

		//change class
		let imperialUnitsElement = document.getElementById("imperial");
		let metricsUnitsElement = document.getElementById("metric");

		imperialUnitsElement.classList.remove("deselected");
		imperialUnitsElement.classList.add("selected");

		metricsUnitsElement.classList.remove("selected");
		metricsUnitsElement.classList.add("deselected");
	}
}

function convertToMetric() {
	//confirm Metric isn't already selected
	if (document.getElementById("metric").classList.contains("deselected")) {
		//update current stats
		let tempElement = document.getElementById("current-temp");
		let feelsLikeElement = document.getElementById("feels-like");
		let windSpeedElement = document.getElementById("wind");
		let windSpeedUnitsElement = document.getElementById("wind-speed-units");

		temp = toCelsius(tempElement.textContent);
		feels_like = toCelsius(feelsLikeElement.textContent);
		wind_speed = toKmHFromMiH(windSpeedElement.textContent);
		windSpeedUnits = "km/h";

		tempElement.innerHTML = Math.round(temp);
		feelsLikeElement.innerHTML = Math.round(feels_like);
		windSpeedElement.innerHTML = Math.round(wind_speed);
		windSpeedUnitsElement.innerHTML = windSpeedUnits;

		//update forecast temps
		let forecastDays = document.querySelectorAll(`.forecast-temp`);
		forecastDays.forEach(function (element) {
			let tempID = element.getAttribute("id");
			let tempElement = document.getElementById(tempID);
			let updatedTemp = toCelsius(tempElement.textContent);
			tempElement.innerHTML = Math.round(updatedTemp);
		});

		//change class
		let imperialUnitsElement = document.getElementById("imperial");
		let metricsUnitsElement = document.getElementById("metric");

		imperialUnitsElement.classList.remove("selected");
		imperialUnitsElement.classList.add("deselected");

		metricsUnitsElement.classList.remove("deselected");
		metricsUnitsElement.classList.add("selected");
	}
}

function getForecast(city) {
	let key = `6atoab0f92eca3d102a54e7250f4dd0f`;
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}`;

	axios(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

	return days[date.getDay()];
}

function displayForecast(response) {
	let forecastHTML = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			let date = formatForecastDay(day.time);
			let icon = day.condition.icon_url;
			let maxTemp = day.temperature.maximum;
			let minTemp = day.temperature.minimum;

			if (document.getElementById("imperial").classList.contains("selected")) {
				maxTemp = toFahrenheit(day.temperature.maximum);
				minTemp = toFahrenheit(day.temperature.minimum);
			}

			forecastHTML =
				forecastHTML +
				`<div class="forecast-day">
						<div class="forecast-date">${date}</div>
						<img
							src=${icon}
							class="forecast-icon"
						/>
						<div class="forecast-temperatures">
							<span class="forecast-max"><span class = "forecast-temp" id=${index}max>${Math.round(
					maxTemp
				)}</span>°</span>
							<span class="forecast-min"><span class = "forecast-temp" id=${index}min>${Math.round(
					minTemp
				)}</span>°</span>
						</div>
					</div>`;
		}
	});

	let forecastElement = document.getElementById("forecast-container");
	forecastElement.innerHTML = forecastHTML;
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
