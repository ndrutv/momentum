import { getData } from "./utils";

const player = () => {
    // задаем переменные
    const controlsPlay = document.querySelector('.play');
    const controlsPrev = document.querySelector('.play-prev');
    const controlsNext = document.querySelector('.play-next');
    const ulList = document.querySelector('.play-list');


    // получаем данные
    let list = null;

    const getList = async () => {
        list = await getData('./playlist.json');
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

export default player;