// Wait for the page to load before running the JavaScript code
document.addEventListener("DOMContentLoaded", function(event) {
  // Get the form and map elements from the HTML
  const form = document.querySelector("form");
  const mapContainer = document.getElementById("map");

  // Define the default coordinates and zoom level
  const defaultCoordinates = [0, 0];
  const defaultZoomLevel = 2;

  // Initialize the map with the default coordinates and zoom level
  const map = L.map(mapContainer).setView(defaultCoordinates, defaultZoomLevel);

  // Add the tile layer to the map using OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  // Handle form submission
  form.addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the address and time period from the form
    const address = document.getElementById("address").value;
    const timePeriod = document.getElementById("time-period").value;

    // Use OpenStreetMap Nominatim API to geocode the address
    const apiKey = "LUZp4SngR0SZU5XdmpfVjgUciLdZjDti";
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Get the latitude and longitude from the geocoding result
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        // Set the map center to the geocoded coordinates and zoom level
        map.setView([latitude, longitude], 12);

        // Add a marker to the map at the geocoded coordinates
        const marker = L.marker([latitude, longitude]).addTo(map);

        // Add a popup to the marker with the ancestor's address and time period
        const popupContent = `
          <p><b>Ancestor's Address:</b> ${address}</p>
          <p><b>Time Period:</b> ${timePeriod}</p>
        `;
        marker.bindPopup(popupContent).openPopup();
      })
      .catch(error => {
        console.log(error);
        alert("There was an error geocoding the address.");
      });
  });
});
