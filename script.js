// Get references to HTML elements
const addressInput = document.getElementById('address');
const dateInput = document.getElementById('date');
const mapContainer = document.getElementById('map');

// Initialize map
const map = L.map(mapContainer).setView([51.505, -0.09], 13);

// Create tile layer from OpenStreetMap
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18
});

// Add tile layer to map
tileLayer.addTo(map);

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get user input values
  const address = addressInput.value;
  const date = dateInput.value;

  // Geocode the address using OpenStreetMap API
  axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1`)
    .then(response => {
      // Get latitude and longitude from response
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;

      // Create marker with geocoded location and date label
      const marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup(`Ancestor lived here on ${date}`).openPopup();

      // Set map view to geocoded location
      map.setView([latitude, longitude], 13);
    })
    .catch(error => console.error(error));
}

// Attach form submission handler
const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);
