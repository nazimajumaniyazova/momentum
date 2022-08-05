const changeQuoteButton = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')


function getRandomNum(){
    return Math.floor(Math.random() * 50);
}

async function getQuotes() {  
    const quotesURL = './js/quotes.json';
    const response = await fetch(quotesURL);
    const quotesArray = await response.json(); 
    displayQuote(quotesArray)
}


function displayQuote(quotesArray){
    let quoteRandomNum = getRandomNum()
    quote.innerHTML = `" ${quotesArray[quoteRandomNum].q} "`
    author.innerHTML = `${quotesArray[quoteRandomNum].a}`
}

changeQuoteButton.addEventListener('click', getQuotes)
getQuotes();