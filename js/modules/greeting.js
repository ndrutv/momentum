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

export default greeting;