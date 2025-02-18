
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const APIKey = "d3c690bedbe6acd9e748c4d4aefaa684";
const unsplashAccessKey = "0Cyk2fIuOle8JuvORn8-7Wir72PQgid2Ksz_IRnN3pw"; // Replace with your Unsplash API access key

// Event handler untuk event click
search.addEventListener("click", performSearch);

// Event handler untuk event keypress
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Retrieve background image from Unsplash
      fetch(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}`
      )
        .then((response) => response.json())
        .then((unsplashJson) => {
          const body = document.querySelector("body");
          if (unsplashJson.urls && unsplashJson.urls.regular) {
            body.style.backgroundImage = `url(${unsplashJson.urls.regular})`;
          }

          // Rest of your code
          const image = document.querySelector(".weather-box img");
          const temperature = document.querySelector(
            ".weather-box .temperature"
          );
          const description = document.querySelector(
            ".weather-box .description"
          );
          const humidity = document.querySelector(
            ".weather-details .humidity span"
          );
          const wind = document.querySelector(".weather-details .wind span");

          switch (json.weather[0].main) {
            case "Clear":
              image.src = "images/clear.png";
              break;

            case "Rain":
              image.src = "images/rain.png";
              break;

            case "Snow":
              image.src = "images/snow.png";
              break;

            case "Clouds":
              image.src = "images/cloud.png";
              break;

            case "Haze":
              image.src = "images/mist.png";
              break;

            default:
              image.src = "";
          }

          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

          weatherBox.style.display = "";
          weatherDetails.style.display = "";
          weatherBox.classList.add("fadeIn");
          weatherDetails.classList.add("fadeIn");
          container.style.height = "590px";
        });
    });
}
