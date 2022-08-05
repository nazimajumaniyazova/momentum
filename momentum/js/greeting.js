const greetingTranslation ={
    ru:{
        morning:'Доброе утро',
        afternoon: 'Добрый день',
        evening: 'Добрый вечер',
        night: ' Доброй ночи',
        inputPlaceholder: '[Введите Имя]'
    },
    en:{
        morning:'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        night: ' Good night',
        inputPlaceholder: '[Enter Name]'
    }
}
let defaultUserLang2 = navigator.language

const greeting = document.querySelector('.greeting-container .greeting')
const userName = document.querySelector('.name')

userName.placeholder = greetingTranslation[defaultUserLang2].inputPlaceholder

function getTimeOfDay(hours){
    if(hours>=0 && hours <=11.59){
        return greetingTranslation[defaultUserLang2].morning
    }else if(hours>=12&& hours<=16.59 ){
        return greetingTranslation[defaultUserLang2].afternoon
    }else if(hours >=17 && hours <=20.59){
        return greetingTranslation[defaultUserLang2].evening
    }else{
        return greetingTranslation[defaultUserLang2].night
    }
}

function displayTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();
    
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = timeOfDay;
    
    greeting.textContent = greetingText + ','
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