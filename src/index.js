function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.getElementById("search-form-input");
	let cityElement = document.getElementById("city");
	cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.getElementById("search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
