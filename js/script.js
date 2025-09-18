

// Display latitude and longitude of selected city
document.addEventListener('DOMContentLoaded', function() {
	const select = document.getElementById('city-select');
	const forecastDiv = document.getElementById('weather-forecast');

	function showForecast() {
		if (typeof getSelectedCityData === 'function') {
			const cityData = getSelectedCityData();
			if (cityData) {
				let dataLocation = `https://www.7timer.info/bin/api.pl?lon=${cityData.longitude}&lat=${cityData.latitude}&product=civillight&output=json`;
								fetch(dataLocation)
									.then(response => response.json())
									.then(data => {
										// Handle the API response
										if (data && Array.isArray(data.dataseries)) {
												// Clear previous forecast
                                                console.log(data);
												const forecastContainer = document.getElementById('forecast-container');
												if (!forecastContainer) return;
													forecastContainer.innerHTML = '';
												data.dataseries.slice(0, 7).forEach(item => {
														// Format date from YYYYMMDD to readable format
														const rawDate = item.date.toString();
														const year = rawDate.substring(0, 4);
														const month = rawDate.substring(4, 6);
														const day = rawDate.substring(6, 8);
														// Create JS Date object
														const jsDate = new Date(`${year}-${month}-${day}`);
														const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
														const dayOfWeek = daysOfWeek[jsDate.getDay()];
														const formattedDate = `${dayOfWeek}, ${day}/${month}`;

														let weatherDescription;
														switch (item.weather) {
															case 'clear':
																weatherDescription = 'Clear';
																break;
															case 'mcloudy':
																weatherDescription = 'Cloudy';
																break;
															case 'lightrain':
																weatherDescription = 'Light Rain';
																break;
															case 'ishower':
																weatherDescription = 'Isolated Showers';
																break;
															case 'cloudy':
																weatherDescription = 'Cloudy';
																break;
															case 'oshower':
																weatherDescription = 'Occasional Showers';
																break;
															case 'pcloudy':
																weatherDescription = 'Partly Cloudy';
																break;
															default:
																weatherDescription = item.weather;
														}

														// Create forecast card
														const card = document.createElement('div');
														card.className = 'forecast-card';
														card.innerHTML = `
																<div class="forecast-day">${formattedDate}</div>
                                                                <div class="weather-icon">
                                                                    <img src="images/${item.weather}.png" alt="${item.weather}" />
                                                                </div>
																<div class="weather-description">Weather: ${weatherDescription}</div>
																<div class="temperature">Temperature: ${item.temp2m.min} / ${item.temp2m.max} °C</div>
																<div class="wind-speed">Wind: ${item.wind10m_max} m/s</div>
														`;

														let background = document.body;
														background.style.backgroundImage = `url(${cityData.image})`;
														forecastContainer.appendChild(card);
												});
										}
									});
		}
	}
};
	select.addEventListener('change', showForecast);
	// Show for initial selection
	showForecast();
});


