

const STATE = {
    lang: navigator.language,
    photoSource: 'github',
    displayTime: true,
    displayWeather: true,
    displayPlayer: 'default',
    displayQuote: true,
    displayDate: true,
    displayGreeting: true,
    timeFormat: 'ru',
    displayTodo: true,
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

const settingsButton  = document.querySelector('.settings-icon')
const settingsList  = document.querySelector('.settings-list')

const LangList  = document.querySelector('.lang-list')
const LangListInputs  = document.querySelectorAll('.lang-list input')

const timeDisplay  = document.querySelector('.settings-time input')

const weatherDisplay = document.querySelector('.settings-weather input')

const playerDisplay = document.querySelector('.settings-player .settings-options')
const playerDisplayInputs = document.querySelectorAll('.settings-player input')

const quoteDisplay = document.querySelector('.settings-quote input')

const dateDisplay = document.querySelector('.settings-date input')

const greetingDisplay = document.querySelector('.settings-greeting input')

const timeFormat = document.querySelector('.settings-time-format .settings-options')
const timeFormatInputs = document.querySelectorAll('.settings-time-format input')

const todoDisplay = document.querySelector('.settings-todo input')

settingsButton.addEventListener('click',()=>{
   settingsList.classList.toggle('active')
})
window.onclick = function(event) {
    if ( !event.target.closest('.settings-list')  && event.target !=settingsButton) {
        settingsList.classList.remove('active')
    }
}
LangList.addEventListener('change', (e)=>{
    let eventTarget = e.target.closest('.lang-radio')
    STATE.lang = eventTarget.value
    changeWeatherLang(STATE.lang)
    changeDateLang(STATE.lang)
    changeGreetingLang(STATE.lang)
    changeQuoteLang(STATE.lang)
})

timeDisplay.addEventListener('change',()=>{
    STATE.displayTime = timeDisplay.checked
    isDisplayTime(STATE.displayTime)
})

weatherDisplay.addEventListener('change',()=>{
    STATE.displayWeather = weatherDisplay.checked
    isDisplayWeather(STATE.displayWeather)
})

playerDisplay.addEventListener('change',(e)=>{
    let eventTarget = e.target.closest('.radio-player')
    STATE.displayPlayer = eventTarget.value
    console.log(STATE.displayPlayer)
    isDisplayPlayer(STATE.displayPlayer)
})

quoteDisplay.addEventListener('change',()=>{
 
    STATE.displayQuote = quoteDisplay.checked
    isDisplayQuote(STATE.displayQuote)
})

dateDisplay.addEventListener('change',()=>{
 
    STATE.displayDate = dateDisplay.checked
    isDisplayDate(STATE.displayDate)
})

greetingDisplay.addEventListener('change',()=>{
 
    STATE.displayGreeting = greetingDisplay.checked
    isDisplayGreeting(STATE.displayGreeting)
})

timeFormat.addEventListener('change', (e)=>{
    let eventTarget = e.target.closest('.time-format-radio')
    STATE.timeFormat = eventTarget.value
    showTime(STATE.timeFormat)
})

todoDisplay.addEventListener('change', ()=>{
    STATE.displayTodo = todoDisplay.checked;
    isDisplayTodo(STATE.displayTodo)
})
function setLocalStorage2() {
    localStorage.setItem('displayTime', STATE.displayTime);
    localStorage.setItem('displayWeather', STATE.displayWeather);
    localStorage.setItem('displayPlayer', STATE.displayPlayer);
    localStorage.setItem('displayQuote', STATE.displayQuote);
    localStorage.setItem('displayDate', STATE.displayDate);
    localStorage.setItem('displayGreeting', STATE.displayGreeting);
    localStorage.setItem('timeFormat', STATE.timeFormat);
    localStorage.setItem('lang', STATE.lang);
    localStorage.setItem('displayTodo', STATE.displayTodo);
}
window.addEventListener('beforeunload', setLocalStorage2)

function getLocalStorage2() {
    if(localStorage.getItem('displayTime')) {
        STATE.displayTime = localStorage.getItem('displayTime');
    }
    if(localStorage.getItem('displayWeather')){
        STATE.displayWeather = localStorage.getItem('displayWeather');
    }
    if(localStorage.getItem('displayPlayer')){
        STATE.displayPlayer = localStorage.getItem('displayPlayer');
    }
    if(localStorage.getItem('displayQuote')){
        STATE.displayQuote = localStorage.getItem('displayQuote');
    }
    if(localStorage.getItem('displayDate')){
        STATE.displayDate = localStorage.getItem('displayDate');
    }
    if(localStorage.getItem('displayGreeting')){
        STATE.displayGreeting = localStorage.getItem('displayGreeting');
    }
    if(localStorage.getItem('timeFormat')){
        STATE.timeFormat = localStorage.getItem('timeFormat');
    }
    if(localStorage.getItem('lang')){
        STATE.lang = localStorage.getItem('lang');
    }
    if(localStorage.getItem('displayTodo')) {
        STATE.displayTodo = localStorage.getItem('displayTodo');
    }
}
window.addEventListener('load', ()=>{
    getLocalStorage2();

    timeDisplay.checked = (STATE.displayTime === 'true');
    isDisplayTime(timeDisplay.checked);

    weatherDisplay.checked = (STATE.displayWeather === 'true');
    isDisplayWeather(weatherDisplay.checked)

    // playerDisplay.checked = (STATE.displayPlayer === 'true');
    // isDisplayPlayer(playerDisplay.checked)

    quoteDisplay.checked = (STATE.displayQuote === 'true');
    isDisplayQuote(quoteDisplay.checked)

    dateDisplay.checked = (STATE.displayDate === 'true');
    isDisplayDate(dateDisplay.checked)

    greetingDisplay.checked = (STATE.displayGreeting === 'true');
    isDisplayGreeting(greetingDisplay.checked)

    todoDisplay.checked = (STATE.displayTodo === 'true');
    isDisplayTodo(todoDisplay.checked)

    timeFormatInputs.forEach(input =>{
        input.checked = (input.value === STATE.timeFormat)
    })
    LangListInputs.forEach(lang =>{
        lang.checked =  (lang.value === STATE.lang)
    })

    playerDisplayInputs.forEach(input =>{
        input.checked = (input.value === STATE.displayPlayer) 
    })
    isDisplayPlayer(STATE.displayPlayer)
    changeWeatherLang(STATE.lang)
    changeDateLang(STATE.lang)
    changeGreetingLang(STATE.lang)
    changeQuoteLang(STATE.lang)
})
