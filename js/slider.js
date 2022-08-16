const body = document.querySelector('body')
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')

let randomNum = getRandomNum()

function getRandomNum(){
    return Math.floor(Math.random() * (21 - 1) + 1);
}


function getSliderNext(){
    if(randomNum === 20){
        randomNum = 1;
        setBg()
    }else{
        randomNum++
        setBg()
    }

}
function getSliderPrev(){
    if(randomNum===1){
        randomNum = 20;
        setBg()
    }else{
        randomNum--
        setBg()
    }
}
slideNext.addEventListener('click', ()=>{

    getSliderNext()
})
slidePrev.addEventListener('click', ()=>{
  
    getSliderPrev()
})

function setBg(){
    let timeOfDay = setTimeOfDay();
    let bgNum = randomNum
    bgNum = bgNum.toString().padStart(2, "0")
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage = `url("${img.src}")`;
    }
}
function setTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();

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
setBg()
