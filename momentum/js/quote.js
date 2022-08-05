const changeQuoteButton = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')

let defaultUserLang4 = navigator.language

function getRandomNum(maxNum){
    return Math.floor(Math.random() * maxNum);
}

async function getQuotes() {  
    const quotesURL = `./js/quotes-${defaultUserLang4}.json`;
    const response = await fetch(quotesURL);
    const quotesArray = await response.json(); 
    displayQuote(quotesArray)
}


function displayQuote(quotesArray){
    let quoteRandomNum = getRandomNum(quotesArray.length)
    quote.innerHTML = `" ${quotesArray[quoteRandomNum].q} "`
    author.innerHTML = `${quotesArray[quoteRandomNum].a}`
}

changeQuoteButton.addEventListener('click', getQuotes)
getQuotes();