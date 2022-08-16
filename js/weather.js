const weatherTranslation ={
    ru: {
        feelsLiks: 'Ощущается как',
        windSpeed: 'Скорость ветра',
        humidity: 'Влажность'
    },
    en:{
        feelsLiks: 'Feels like',
        windSpeed: 'Wind speed',
        humidity: 'Humidity' 
    }
}
const weatherContainer = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherFeelsLike = document.querySelector('.feels-like');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity')

const city = document.querySelector('.city')

const weatherError = document.querySelector('.weather-error');

let defaultUserLang = navigator.language

function changeWeatherLang(lang){
    defaultUserLang = lang
    getWeather()
}

function isDisplayWeather(displayWeather){
    if(displayWeather){
       
        weatherContainer.style.display = 'flex'
    }else{
       
        weatherContainer.style.display = 'none'
    }
}

async function getWeather(cityName){
    let url = ''
    cityName = cityName || localStorage.getItem('cityName')
    if(cityName){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${defaultUserLang}&appid=d206e968eb0bd9f3c52c7fb132340ca8&units=metric`
    }
    else{
        let localCityName = await detectLocation()
        city.value = localCityName
        url = `https://api.openweathermap.org/data/2.5/weather?q=${localCityName}&lang=${defaultUserLang}&appid=d206e968eb0bd9f3c52c7fb132340ca8&units=metric`
    }

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        resetWeather()
        weatherError.innerHTML = `Error! city not found for '${cityName || localStorage.getItem('cityName') }'!`
        return
    }
 
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.innerHTML = `${data.main.temp}&deg;C`
    weatherDescription.textContent = data.weather[0].description
    weatherFeelsLike.innerHTML = `${weatherTranslation[defaultUserLang].feelsLiks}: ${data.main.feels_like}&deg;C`
    weatherWind.textContent = `${weatherTranslation[defaultUserLang].windSpeed}: ${data.wind.speed} m/s`
    weatherHumidity.textContent = `${weatherTranslation[defaultUserLang].humidity}: ${data.main.humidity}%`
    
    
}
getWeather()

city.addEventListener('change',()=>{
    const cityName = city.value
    weatherError.innerHTML = ''
    getWeather(cityName)
})

async function detectLocation(){
    let response = await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=5fa6232427344799b0bb39120fb5772d', { method: 'GET'})
    let location  = await response.json()
    return location.city.name
}
function resetWeather(){
    weatherIcon.className ='weather-icon owf'
    temperature.innerHTML = ''
    weatherDescription.textContent = ''
    weatherFeelsLike.innerHTML = ''
    weatherWind.textContent = ''
    weatherHumidity.textContent = ''
}
function setLocalStorage() {
    localStorage.setItem('cityName', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('cityName')) {
        city.value = localStorage.getItem('cityName');
    }
}
window.addEventListener('load', getLocalStorage)