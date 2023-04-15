/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/greeting.js":
/*!********************************!*\
  !*** ./js/modules/greeting.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const greeting = () => {
    const greeting = document.querySelector('.greeting');
    const name = document.querySelector('.name');
    
    const setName = () => {
        if (!localStorage.getItem('name')) {
            name.setAttribute('placeholder', '[Enter name]');
        } else {
            name.value = localStorage.getItem('name');
        }
    };

    setName();

    name.addEventListener('input', () => {
        const value = name.value;
        
        localStorage.setItem('name', value);
        setName();
    });

    // 
    const date = new Date();
    const hours = date.getHours();
    
    if ( hours >= 0 && hours < 6 ) {
        greeting.textContent = 'Good night';
    } else if ( hours >= 6 && hours < 12 ) {
        greeting.textContent = 'Good morning';
    } else if ( hours >= 12 && hours < 18 ) {
        greeting.textContent = 'Good afternoon'; 
    } else {
        greeting.textContent = 'Good evening'; 
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (greeting);

/***/ }),

/***/ "./js/modules/player.js":
/*!******************************!*\
  !*** ./js/modules/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/modules/utils.js");


const player = () => {
    // задаем переменные
    const controlsPlay = document.querySelector('.play');
    const controlsPrev = document.querySelector('.play-prev');
    const controlsNext = document.querySelector('.play-next');
    const ulList = document.querySelector('.play-list');


    // получаем данные
    let list = null;

    const getList = async () => {
        list = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getData)('./playlist.json');
    };


    // выводим плейлист
    let trackList = null;
    
    const setList = async () => {
        await getList();

        list.favorite.forEach((e) => {
            const li = document.createElement('li');
            li.classList.add('play-item');
            li.textContent = e.title;
            ulList.append(li);
        });

        trackList = document.querySelectorAll('.play-item');
    };

    setList();


    // создаем плеер
    const audio = new Audio();


    // переключаем play/pause
    const switchPlay = () => {
        if (!controlsPlay.classList.contains('pause')) {
            controlsPlay.classList.add('pause');
        }
    };


    // запускаем трек
    const playAudio = () => {
        audio.src = list.favorite[currentTrack].src;
        audio.play();

        switchPlay();
        markActive();
    };


    // останавливаем трек
    const stopAudio = () => {
        audio.pause();

        trackList[currentTrack].classList.remove('item-active');
    };


    // отмечаем активный трек
    let currentTrack = 0;

    const markActive = () => {
        trackList.forEach((e) => {
            e.classList.remove('item-active');
        });

        trackList[currentTrack].classList.add('item-active');
    };


    // отслеживаем нажатие play/pause
    controlsPlay.addEventListener('click', () => {
        controlsPlay.classList.toggle('pause');
        
        if (controlsPlay.classList.contains('pause')) {
            playAudio();
        } else {
            stopAudio();
        }
    });

    // отслеживаем нажатие Prev
    controlsPrev.addEventListener('click', () => {
        currentTrack--;

        if (currentTrack < 0) {
            currentTrack = list.favorite.length - 1;
        }

        playAudio();
    });


    // отслеживаем нажатие Next
    controlsNext.addEventListener('click', () => {
        currentTrack++;

        if (currentTrack > list.favorite.length - 1) {
            currentTrack = 0;
        }

        playAudio();
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./js/modules/quotes.js":
/*!******************************!*\
  !*** ./js/modules/quotes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/modules/utils.js");



const quotes = () => {
    // задаем переменные
    const btnChangeQuote = document.querySelector('.change-quote');
    const divQuote = document.querySelector('.quote');
    const divAuthor = document.querySelector('.author');

    // устанавливаем данные
    let res = null;

    const setQuote = async () => {
        res = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getData)('./quotes.json');

        const randomQuote = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandom)(res.quotes.length);
        const quote = res.quotes[randomQuote].text;
        const author = res.quotes[randomQuote].author;

        divQuote.textContent = quote;
        divAuthor.textContent = author;
    };

    setQuote();

    btnChangeQuote.addEventListener('click', () => {
        setQuote();
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (quotes);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/modules/utils.js");


const slider = () => {
    // задаем переменные
    const body = document.querySelector('.body');
    const prevSlide = document.querySelector('.slide-prev');
    const nextSlide = document.querySelector('.slide-next');

    // создаем массив ссылок
    const date = new Date();
    const hours = date.getHours();
    const slideArray = new Array(20).fill('');

    const res = (dayTime) => slideArray.map((_, i) => {
        let url = 'https://raw.githubusercontent.com/ndrutv/momentum-images/assets/images';
        let count;

        count = i < 9 ? `0${i + 1}` : count = i + 1;
        
        slideArray[i] = `${url}/${dayTime}/${count}.jpg`;
    });
    
    if ( hours >= 0 && hours < 6 ) {
        res('night');
    } else if ( hours >= 6 && hours < 12 ) {
        res('morning');
    } else if ( hours >= 12 && hours < 18 ) {
        res('afternoon');
    } else {
        res('evening');
    }
    
    // установка изображения
    const setSlide = (slide) => {  
        const img = new Image();
        img.src = slide;
        img.addEventListener('load', () => {
            body.style.backgroundImage = `url("${slide}")`;
        });
    };
    
    const randomSlide = slideArray[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getRandom)(20)]; // рандомный слайд
    let currentSlide = slideArray.indexOf(randomSlide); // текущий слайд
    
    // рандомный слайд при загрузке
    setSlide(randomSlide);

    // предыдущий слайд
    prevSlide.addEventListener('click', () => {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slideArray.length - 1;
        }

        const prev = slideArray[currentSlide];

        setSlide(prev);
    });

    // следующий слайд
    nextSlide.addEventListener('click', () => {
        currentSlide++;
        
        if (currentSlide > slideArray.length - 1) {
            currentSlide = 0;
        }

        const next = slideArray[currentSlide];
        setSlide(next);
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/time.js":
/*!****************************!*\
  !*** ./js/modules/time.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const time = () => {
    const timeBlock = document.querySelector('.time');
    const dateBlock = document.querySelector('.date');

    const setDate = () => {
        const date = new Date();
        const dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };

        timeBlock.textContent = date.toLocaleTimeString();
        dateBlock.textContent = date.toLocaleDateString('en-US', dateOptions);
    };

    setDate();

    setInterval(() => {
        setDate();
    }, 1000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (time);

/***/ }),

/***/ "./js/modules/utils.js":
/*!*****************************!*\
  !*** ./js/modules/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "getRandom": () => (/* binding */ getRandom)
/* harmony export */ });
// рандомайзер
const getRandom = (max) => {
    return Math.floor(Math.random() * max);
};

// фетч данных
const getData = async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    if (response.ok) {
        return json;
    }
};



/***/ }),

/***/ "./js/modules/weather.js":
/*!*******************************!*\
  !*** ./js/modules/weather.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weather);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/time */ "./js/modules/time.js");
/* harmony import */ var _modules_greeting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/greeting */ "./js/modules/greeting.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_quotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/quotes */ "./js/modules/quotes.js");
/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/weather */ "./js/modules/weather.js");
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/player */ "./js/modules/player.js");







window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_time__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_greeting__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_quotes__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_weather__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_player__WEBPACK_IMPORTED_MODULE_5__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map