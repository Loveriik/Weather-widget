function weather() {
    navigator.geolocation.getCurrentPosition(showPosition);
    /*Отображение времени*/
    setInterval (function() {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        let clock = document.getElementById('time');
        clock.innerHTML = hours + ':' + minutes + ':' + seconds;
    }, 1000);
}

async function showPosition(position) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`;
    const url1 = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    const response = await fetch(url)
    const response1 = await fetch(url1)
    const data =  await response.json();
    const data1 = await response1.json();
    const temp = document.getElementById('temperature');
    temp.innerHTML = data.current_weather.temperature + '°';
    const speed = document.getElementById('windspeed');
    speed.innerHTML = 'Скорость ветра: ' + data.current_weather.windspeed;
    const city = document.getElementById('city');
    city.innerHTML = data1.address.city + ', ' + data1.address.country;

    const image = document.getElementById('icon_image');
    const color = document.getElementById('mainTab');
    let container = document.querySelectorAll('.text');

    switch (data.current_weather.weathercode) {
        case 0: case 1:
            image.classList.add('fa-solid', 'fa-sun', 'fa-8x');   
            color.style.background = 'linear-gradient(45deg, rgb(255,255,255,0.6), rgb(255,255,0))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-sun');
            }   
            break;
        case 2:
            image.classList.add('fa-solid', 'fa-cloud-sun', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #A2DEF6 20%, rgb(252,257,0))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-cloudSun');
            }  
            break;
        case 3:
            image.classList.add('fa-solid', 'fa-cloud', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #8D9090, #2C2D2D)';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-cloud');
            }    
            break;
        case 45: case 48:
            image.classList.add('fa-solid', 'fa-smog', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, rgb(188,190,192), rgb(230,231,232))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-fog');
            }   
            break;
        case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67:
            image.classList.add('fa-solid', 'fa-umbrella', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, rgb(1,33,105,0.8), rgb(108,172,228,0.6))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-umbrella');
            }   
            break;
        case 71: case 73: case 75: case 77: case 85: case 86:
            image.classList.add('fa-solid','fa-snowflake', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #ECECEC, #CFEFFC)';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-snowflake');
            }   
            break;
        case 80: case 81: case 82:
            image.classList.add('fa-solid', 'fa-cloud-showers-heavy', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #2350D9, #1A2D99)';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-heavyRain');
            }  
            break;
        case 95: case 96: case 99:
            image.classList.add('fa-solid', 'fa-bolt', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #1C1C1C, rgb(247,234,72))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].classList.add('text-thunder');
            }  
            break;
    }

}
 async function cityCheck(){

    const cityName = document.getElementById('city_text').value
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=<${cityName}>&appid=2be791dc49af83ecf84ed02d7c165f9f`
    const response2 = await fetch(cityUrl);
    const data2 = await response2.json();
    if (data2.length == 0) {
        alert('Значение не корректно');
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${data2[0].lat}&longitude=${data2[0].lon}&current_weather=true`;
    const url1 = `https://nominatim.openstreetmap.org/reverse?lat=${data2[0].lat}&lon=${data2[0].lon}&format=json`
    const response = await fetch(url)
    const response1 = await fetch(url1)
    const data =  await response.json();
    const data1 = await response1.json();
    const temp = document.getElementById('temperature');
    temp.innerHTML = data.current_weather.temperature + '°';
    const speed = document.getElementById('windspeed');
    speed.innerHTML = 'Скорость ветра: ' + data.current_weather.windspeed;
    const city = document.getElementById('city');
    city.innerHTML = data1.address.city + ', ' + data1.address.country;

    const image = document.getElementById('icon_image');
    const color = document.getElementById('mainTab');
    let container = document.querySelectorAll('.text');

    switch (data.current_weather.weathercode) {
        case 0: case 1:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-sun', 'fa-8x');   
            color.style.background = 'linear-gradient(45deg, rgb(255,255,255,0.6), rgb(255,255,0))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-sun');
            }     
            break;
        case 2:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-cloud-sun', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #A2DEF6 20%, rgb(252,257,0))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-cloudSun');
            }       
            break;
        case 3:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-cloud', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #8D9090, #2C2D2D)'; 
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-cloud');
            }    
            break;
        case 45: case 48:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-smog', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, rgb(188,190,192), rgb(230,231,232))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-fog');
            }  
            break;
        case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-umbrella', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, rgb(1,33,105,0.8), rgb(108,172,228,0.6))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-umbrella');
            } 
            break;
        case 71: case 73: case 75: case 77: case 85: case 86:
            image.removeAttribute('class');
            image.classList.add('fa-solid','fa-snowflake', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #ECECEC, #CFEFFC)';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-snowflake');
            } 
            break;
        case 80: case 81: case 82:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-cloud-showers-heavy', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #2350D9, #1A2D99)';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-heavyRain');
            } 
            break;
        case 95: case 96: case 99:
            image.removeAttribute('class');
            image.classList.add('fa-solid', 'fa-bolt', 'fa-8x');
            color.style.background = 'linear-gradient(45deg, #1C1C1C, rgb(247,234,72))';
            for (let i = 0; i <= container.length-1; i++) {
                container[i].removeAttribute('class');
                container[i].classList.add('text', 'text-bolt');
            } 
            break;
    }
 }