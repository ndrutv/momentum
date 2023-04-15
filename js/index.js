import time from './modules/time';
import greeting from './modules/greeting';
import slider from './modules/slider';
import quotes from './modules/quotes';
import weather from './modules/weather';
import player from './modules/player';

window.addEventListener('DOMContentLoaded', () => {
    time();
    greeting();
    slider();
    quotes();
    weather();
    player();
});