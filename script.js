async function getWeather() {
   const cityInput = document.querySelector('.city-input').value;
   
   // Skip if the user clicked search without typing anything
   if (!cityInput) return; 

   // Step 1: Get coordinates for the city
   const geoResponse = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(cityInput)
   );
   const geoData = await geoResponse.json();
   const latitude = geoData.results[0].latitude;
   const longitude = geoData.results[0].longitude;
   
   // Step 2: Get the weather (Updated URL to fetch relative_humidity_2m)
   const weatherResponse = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relative_humidity_2m"
   );
   const weatherData = await weatherResponse.json();
   
   // Step 3: Extract the data correctly from the "current" object
   const { temperature_2m, relative_humidity_2m } = weatherData.current;
   
   // Step 4: Update the DOM
   document.querySelector('.celcius').innerText = temperature_2m + "°C🔥";
   
   // Calculate Fahrenheit and round it to a clean number
   const fahrenheit = Math.round((temperature_2m * 9/5) + 32);
   document.querySelector('.temperature').innerText = fahrenheit + "°F❄️";
   
   // Update Humidity using the correct variable
   document.querySelector('.Humidity').innerText = "Humidity: " + relative_humidity_2m + "%";
   
   console.log(weatherData);
   return weatherData;
}