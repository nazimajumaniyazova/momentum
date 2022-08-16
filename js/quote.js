const changeQuoteButton = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const quoteContainer = document.querySelector('.quote-container')

let defaultUserLang4 = navigator.language

function isDisplayQuote(displayQuote){
    if(displayQuote){
        quoteContainer.style.display = 'block'
    }else{
        quoteContainer.style.display = 'none'
    }
}

function changeQuoteLang(lang){
    defaultUserLang4 = lang
    getQuotes()
}


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