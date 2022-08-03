const greeting = document.querySelector('.greeting-container .greeting')
const userName = document.querySelector('.name')

function getTimeOfDay(hours){
    if(hours>=0 && hours <=11.59){
        return 'morning'
    }else if(hours>=12&& hours<=16.59 ){
        return 'afternoon'
    }else if(hours >=17 && hours <=20.59){
        return 'evening'
    }else{
        return 'night'
    }
}

function displayTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();
    
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = `Good ${timeOfDay}, `;
    
    greeting.textContent = greetingText
}
displayTimeOfDay()

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)