const warningText = document.getElementById('warning-text');
warningText.style.display = "none"

const loadGeo = () => {
     const searchField = document.getElementById('search-field');
     const searchFieldText = searchField.value;

     const displayData = document.getElementById('display-data')
     displayData.textContent = "";
     searchField.value = ""
     if (searchFieldText.length == 0) {
          warningText.style.display = "block"
     } else {
          warningText.style.display = "none"
          const apiKey = 'a90a0ba6655a4d75caca5eb937db2e05';
          const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchFieldText}&appid=${apiKey}`;
          fetch(url)
               .then(res => res.json())
               .then(data => getGeo(data[0]))
     }

}

const getGeo = async data => {
     // console.log(data.lat, data.lon);
     const apiKey = 'a90a0ba6655a4d75caca5eb937db2e05';
     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}`;
     const res = await fetch(url)
     const weatherData = await res.json();
     // console.log(weatherData);
     const convertTime = (time) => {
          let unixTimestamp = time;
          // Create a new JavaScript Date object based on the timestamp
          // multiplied by 1000 so that the argument is in milliseconds, not seconds.
          var date = new Date(unixTimestamp * 1000);
          // Hours part from the timestamp
          var hours = date.getHours();
          // Minutes part from the timestamp
          var minutes = "0" + date.getMinutes();
          // Seconds part from the timestamp
          var seconds = "0" + date.getSeconds();

          // Will display time in 10:30:23 format
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

          return formattedTime;
     }
     const tempConvert = temp => {
          const result = temp - 273.15;
          const final = parseInt(result);
          return final
     }
     const sunrise = convertTime(`${weatherData.sys.sunrise}`);
     const sunset = convertTime(`${weatherData.sys.sunset}`);
     const mainTemp = tempConvert(`${weatherData.main.temp}`);
     const mainFeelsLike = tempConvert(`${weatherData.main.feels_like}`);
     // const tempMin = tempConvert(`${weatherData.main.temp_min}`);
     // const tempMax = tempConvert(`${weatherData.main.temp_max}`);
     // <h2>Minimum Temparature: ${tempMin}</h2>
     // <h2>Maximum Temperature: ${tempMax}</h2>
     // <h2>Main Weather: ${weatherData.weather[1].main} </h2>
     // <h2>Weather Description: ${weatherData.weather[1].description} </h2>
     // console.log(sunrise, sunset);
     const displayData = document.getElementById('display-data')
     const div = document.createElement('div')

     div.innerHTML = `
     <h1>City Name: ${weatherData.name}, ${weatherData.sys.country}</h1>
     <h2>Main Weather: ${weatherData.weather[0].main} </h2>
     <h2>Weather Description: ${weatherData.weather[0].description} </h2>
     <h2>Main Temparature: ${mainTemp}°</h2>
     <h2>Temparature Feels Like: ${mainFeelsLike}°</h2>
     <h2>Sunrise: ${sunrise} <small>(24 hour format)</small></h2>
     <h2>Sunset: ${sunset} <small>(24 hour format)</small></h2>
     <h2>Cloud Percentage: ${weatherData.clouds.all}%</h2>
     <h2>Wind Speed: ${weatherData.wind.speed} m/s</h2>
     <h2>Wind Degree: ${weatherData.wind.deg}°</h2>
     <h2>Visibility: ${weatherData.visibility / 1000} km</h2>
     <h2>Atmospheric Pressure: ${weatherData.main.pressure}</h2>
     <h2>Humidity: ${weatherData.main.humidity} %</h2>
     
     
     `
     displayData.appendChild(div)
}