const weather = () => {
    const inputCity = document.querySelector('.city');
    const spanTemperature = document.querySelector('.temperature');
    const spanWeatherDescription = document.querySelector('.weather-description');
    const divWind = document.querySelector('.wind');
    const divHumidity = document.querySelector('.humidity');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherError = document.querySelector('.weather-error');

    // устанавливаем стандартные значения
    if (!localStorage.getItem('city')) {
        localStorage.setItem('city', 'Minsk');
    }

    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'en');
    }

    if (!localStorage.getItem('units')) {
        localStorage.setItem('units', 'metric');
    }

    let city = localStorage.getItem('city');
    let lang = localStorage.getItem('city');
    let units = localStorage.getItem('units');

    // устанавливаем input.value при загрузке
    inputCity.value = city;

    // устанавливаем значение города
    const setCity = () => {
        city = inputCity.value;
        localStorage.setItem('city', city);

        if (inputCity.value < 1) {
            inputCity.setAttribute('placeholder', '[Enter city]');
        }

        getWeather(city, lang, units);
    };

    // нажатие Enter в Input
    inputCity.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setCity();
        }
    });

    // потеря фокуса Input
    inputCity.addEventListener('blur', (e) => {
        setCity();
    });

    // 
    const apiKey = '5a5b9e031663040bac75de74f3fca5f5';
    const url = 'https://api.openweathermap.org/data/2.5/weather';

    // фетчим данные
    const getWeather = async (city, lang, units) => {        
        const response = await fetch(`${url}?q=${city}&lang=${lang}&appid=${apiKey}&units=${units}`);
        const json = await response.json();

        if (response.ok) {
            const icon = json.weather[0].id;
            const temperature = Math.floor(json.main.temp);
            const weatherDescription = json.weather[0].description;
            const windSpeed = Math.floor(json.wind.speed);
            const humidity = json.main.humidity;

            weatherError.textContent = '';
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${icon}`);
            spanTemperature.textContent = `${temperature}°C`;
            spanWeatherDescription.textContent = weatherDescription;
            divWind.textContent = `Wind speed: ${windSpeed} m/s`;
            divHumidity.textContent = `Humidity: ${humidity}%`;
        } else {
            weatherError.textContent = `Error! city not found for "${inputCity.value}"!`;
            weatherIcon.className = 'weather-icon owf';
            spanTemperature.textContent = '';
            spanWeatherDescription.textContent = '';
            divWind.textContent = '';
            divHumidity.textContent = '';
        }
    };

    getWeather(city, lang, units);
};

export default weather;