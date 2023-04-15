import { getRandom } from "./utils";
import { getData } from "./utils";

const quotes = () => {
    // задаем переменные
    const btnChangeQuote = document.querySelector('.change-quote');
    const divQuote = document.querySelector('.quote');
    const divAuthor = document.querySelector('.author');

    // устанавливаем данные
    let res = null;

    const setQuote = async () => {
        res = await getData('./quotes.json');

        const randomQuote = getRandom(res.quotes.length);
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

export default quotes;