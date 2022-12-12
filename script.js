const searchButton = document.querySelector('#button-addon2');
const inputKeyword = document.querySelector('.input-keyword');

const app = document.querySelector('body');

searchButton.addEventListener('click', function() {

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputKeyword.value+"&appid=1fe5f03e8b679377cbc41601289edfdd&units=metric")
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let result = document.querySelector('.result')

            result.innerHTML = `
                                <h2>${response.name}, ${response.sys.country}</h2>
                                <h5><span class="temp">${response.main.temp}°С</span> <span class="temp">${response.weather[0].description}</span></h5>
                                <p>Temperature from ${response.main.temp_min}°С to ${response.main.temp_max}°С</p>
                                <h5>Wind Speed : ${response.wind.speed} m/s</h5>
                                <h5">Clouds : ${response.clouds.all}%</h5>
                                <h4>Geo Coordinates : [${response.coord.lat}, ${response.coord.lon}]</h4>`
            const weatt = response.weather[0].description
            console.log(weatt)
            if(weatt == 'broken clouds') {
                app.style.backgroundImage =`url(./img/brokencloudd.jpg)`;

            }     
            else if(weatt == 'mist') {
                app.style.backgroundImage =`url(./img/mist.png)`;

            }    
            else if(weatt == 'few clouds') {
                app.style.backgroundImage =`url(./img/fewcloud.jpg)`;

            }
            else if(weatt == 'overcast clouds') {
                app.style.backgroundImage =`url(./img/gelap.jfif)`;
                
            }
            else if(weatt == 'light rain') {
                app.style.backgroundImage =`url(./img/lightrain.jpg)`;
            }
            
            else if(weatt == 'moderate rain') {
                app.style.backgroundImage =`url(./img/moderaterain.jpg)`;
            }

            // else {
            //     app.style.backgroundImage =`url(./img/gambar3.jpg)`;
            //     searchButton.style.fontColor = "#FFFFFF";
            //     searchButton.style.background = "#e5ba92";
            // }         
        })
    inputKeyword.value = null;

})

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;
}
