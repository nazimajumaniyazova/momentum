const time = document.querySelector('.time')
const data = document.querySelector('.date')

function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}

function showDate(){
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    data.textContent = currentDate;
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
showTime()
showDate()
