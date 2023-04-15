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

export { getRandom, getData };