const API_KEY = "LUZp4SngR0SZU5XdmpfVjgUciLdZjDti";
const geocodeURL = "https://nominatim.openstreetmap.org/search";

const addressInput = document.getElementById("address");
const dateInput = document.getElementById("date");
const submitButton = document.getElementById("submit");
const mapDiv = document.getElementById("map");

submitButton.addEventListener("click", e => {
  e.preventDefault();
  const address = addressInput.value;
  const date = dateInput.value;
  if (address && date) {
    const params = {
      q: address,
      format: "json",
      limit: 1,
      addressdetails: 1
    };
    axios.get(geocodeURL, { params })
      .then(response => {
        const { lat, lon, display_name } = response.data[0];
        const map = L.map(mapDiv).setView([lat, lon], 15);
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${display_name}</b><br>${date}`).openPopup();
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=${API_KEY}`, {
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while geocoding the address. Please try again.");
      });
  } else {
    alert("Please enter both an address and a date.");
  }
});
