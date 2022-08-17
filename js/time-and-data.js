const time = document.querySelector('.time')
const data = document.querySelector('.date')

let defaultUserLang3 = navigator.language

if(defaultUserLang3 != 'ru'){
    defaultUserLang3 = 'en'
}

function changeDateLang(lang){
    defaultUserLang3 = lang
    showDate()
}

function isDisplayTime(displayTime){
    if(displayTime){
        time.style.display = 'block'
        showTime()
    }else{
        time.style.display = 'none'
    }
}
function isDisplayDate(displayDate){
    if(displayDate){
        data.style.display = 'block'
    }else{
        data.style.display = 'none'
    }
}
function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString(STATE.timeFormat);
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}

function showDate(){
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(defaultUserLang3, options);
    data.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
}

function ResetDate() {
    let reset = new Date();
    reset.setHours(24, 0, 0, 0);
    let t = reset.getTime() - Date.now();
    setTimeout(function() {
        showDate()
        ResetDate()
    }, t);
}

ResetDate()
//showTime()
showDate()
