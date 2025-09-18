// This script loads city data from city_coordinates.csv and populates the dropdown.
// It also stores all city data for later use (API calls, etc.)
let citiesData = [];

fetch('city_coordinates.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1); // skip header
    const select = document.getElementById('city-select');
    select.innerHTML = '';
    citiesData = [];
    lines.forEach((line, idx) => {
      const parts = line.split(',');
      if (parts.length >= 4) {
        const latitude = parts[0].trim();
        const longitude = parts[1].trim();
        const city = parts[2].trim();
        const country = parts[3].trim();
        const image = parts[4].trim();
        if (city) {
          citiesData.push({ index: idx, city, country, latitude, longitude, image });
          const option = document.createElement('option');
          option.value = idx; // use index for selection
          option.textContent = `${city}, ${country}`;
          select.appendChild(option);
        }
      }
    });
  });

// Helper to get selected city data
function getSelectedCityData() {
  const select = document.getElementById('city-select');
  if (select.selectedIndex === 0) return null;
  const idx = select.value;
  return citiesData[idx];
}
