import { getRandom } from "./utils";

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
    
    const randomSlide = slideArray[getRandom(20)]; // рандомный слайд
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

export default slider;