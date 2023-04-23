window.onload = function() {
  const form = document.querySelector('form');
  const addressInput = document.querySelector('#address');
  const dateInput = document.querySelector('#date');
  const mapDiv = document.querySelector('#map');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const address = addressInput.value;
    const date = dateInput.value;

    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const map = L.map(mapDiv).setView([lat, lon], 13);

        const marker = L.marker([lat, lon]).addTo(map);

        marker.bindPopup(`<b>${address}</b><br>${date}`).openPopup();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};
