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

export default time;