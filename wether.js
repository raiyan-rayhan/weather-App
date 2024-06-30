const inputBox = document.querySelector(".input_box");
const searchBtn = document.getElementById("searchBtn");
const weatherImage = document.querySelector(".weather_image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind")
const lnf = document.querySelector('.loc-not-found')
const weatherBody = document.querySelector('.weather_body')

 async function checkWeather(city){
    const apiKey = '3edae54b61628cd1793a55bb3ee24349';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`).then(Response => Response.json());
        //console.log(weatherData);

    if(inputBox.value == ""){
      //sweet alert box
        swal({
            title: "OOpss!",
            text: "You Didn't enter any location",
            icon: "warning",
            button: "Try Again",
            });

    }else if(weatherData.cod === '404'){
        lnf.style.display = 'flex'
        weatherBody.style.display = 'none'
        return;
    }else{
        lnf.style.display = 'none';
        weatherBody.style.display = 'flex';
    };


    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed} km/H`;

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImage.src = './img/cloud.png'
            break;
        case 'Rain':
            weatherImage.src = './img/rain.png'
            break;
        case 'Clear':
            weatherImage.src = './img/clear.png'
            break;
        case 'Mist':
            weatherImage.src = './img/mist.png'
            break;
        case 'Snow':
            weatherImage.src = './img/snow.png'
            break;            
        case 'Haze':
            weatherImage.src = './img/haze.png'
            break;
    };
};


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});