// Initialize the map
var map = L.map('map').setView([0, 0], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	maxZoom: 18
}).addTo(map);

function geocode() {
	// Get the user input values
	var address = document.getElementById('address').value;
	var date = document.getElementById('date').value;

	// Geocode the address using OpenStreetMap API
	axios.get('https://nominatim.openstreetmap.org/search', {
		params: {
			format: 'json',
			q: address,
			limit: 1
		}
	}).then(function(response) {
		if (response.data.length > 0) {
			// Get the latitude and longitude of the geocoded address
			var lat = response.data[0].lat;
			var lon = response.data[0].lon;

			// Add a marker to the map at the geocoded address with the submitted date as the label
			L.marker([lat, lon]).addTo(map).bindPopup(date).openPopup();

			// Zoom the map to the location of the marker
			map.setView([lat, lon], 13);
		} else {
			alert('Unable to geocode address');
		}
	}).catch(function(error) {
		alert('Unable to geocode address');
	});
}
