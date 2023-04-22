// Replace YOUR_API_KEY with your actual API key
const API_KEY = "LUZp4SngR0SZU5XdmpfVjgUciLdZjDti";

// Get references to the input fields and submit button
const addressInput = document.getElementById("address");
const timePeriodInput = document.getElementById("time-period");
const submitButton = document.querySelector("button[type='submit']");

// Add event listener to the submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the user input values
    const address = addressInput.value;
    const timePeriod = timePeriodInput.value;

    // Build the API URL with the user input values
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1&addressdetails=1`;

    // Call the API with fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Get the latitude and longitude from the API response
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Call the function to display the map with the latitude and longitude
            displayMap(lat, lon);
        })
        .catch(error => console.error(error));
});

function displayMap(latitude, longitude) {
    // Create a Leaflet map instance
    const map = L.map("map").setView([latitude, longitude], 13);

    // Add the OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
    }).addTo(map);

    // Add a marker for the geocoded location
    L.marker([latitude, longitude]).addTo(map);
}
