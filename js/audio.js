//import playList from './playList.js';
const playList = [
    {      
      title: 'Aqua Caelestis',
      src: '/assets/sounds/Aqua Caelestis.mp3',
      duration: '00:39',
      img: '/assets/img/Sensorica-Aqua-Caelestis.jpg',
      name: 'Sensorica - Aqua Caelestis'
    },  
    {      
      title: 'River Flows In You',
      src: '/assets/sounds/River Flows In You.mp3',
      duration: '01:37',
      img: '/assets/img/river-flowers-in-you.jpg',
      name:'Yurima - River Flows In You'
    },
    {      
        title: 'Holocene',
        src: '/assets/sounds/Bon Iver-Holocene.mp3',
        duration: '00:37',
        img:'/assets/img/Bon_Iver_-_Holocene_cover.jpg',
        name:'Bon Iver - Holocene'
    },
    {      
        title: 'Strangers In The Night',
        src: '/assets/sounds/strangers-in-the-night-instrumental.mp3',
        duration: '02:43',
        img:'/assets/img/strangers-in-the-night.jpg',
        name: 'Frank Sinatra - Strangers In The Night'
    },
    {      
        title: 'So Far',
        src: '/assets/sounds/lafur_Arnalds_Arnr_Dan_-_So_Far.mp3',
        duration: '00:38',
        img:'/assets/img/So-Far-Olafur-Arnalds.jpg',
        name: 'Olafur Arnalds - So Far'
    }
]

const defaultPlayerContainer = document.querySelector('.player')
const customPlayerContainer = document.querySelector('.audio-player')

const playerControls = document.querySelector('.player-controls')
const playListContainer = document.querySelector('.play-list')
const playerIcon = document.querySelector('.play')

let isPlay = false;
let playNum = 0;

function isDisplayPlayer(displayPlayer){
    if(displayPlayer === 'default'){
        defaultPlayerContainer.style.visibility = 'visible'
        defaultPlayerContainer.style.display = 'block'
        customPlayerContainer.style.display = 'none'
    }else if(displayPlayer === 'off'){
        defaultPlayerContainer.style.visibility = 'hidden'
        defaultPlayerContainer.style.display = 'block'
        customPlayerContainer.style.display = 'none'
    }else{
        defaultPlayerContainer.style.display = "none"
        customPlayerContainer.style.display = 'flex'
    }
}


const audio = new Audio();

function createPlaylist(){
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item')
        li.dataset.index = i;
        li.textContent = playList[i].title;
        playListContainer.append(li)
    }
}
createPlaylist()

const audioArray = document.querySelectorAll('.play-item')

playerControls.addEventListener("click",(event)=>{
    let eventTarget = event.target;
    if(eventTarget.classList.contains('play')){
        eventTarget.classList.toggle('pause');
        playAudio()
    }
    if(eventTarget.classList.contains('play-prev')){
        playPrev()
    }
    if(eventTarget.classList.contains('play-next')){
        playNext()
    }
})


function playAudio(){

    audio.src = 'https://nazimajumaniyazova.github.io/Momentum/'+ playList[playNum].src;
    audio.currentTime = 0;
    if(isPlay){
        audio.pause();
        isPlay = false
    }else{
        audio.play();
        isPlay = true
    }
    if(isPlay){
        playerIcon.classList.add('pause');
    }
    audioArray.forEach(elem =>{
        elem.classList.remove('item-active')
    })
    audioArray[playNum].classList.add('item-active')
    audio.onended = ()=>{
        playNext()
    }
}

playListContainer.addEventListener('click', (event)=>{
    let eventTarget = event.target.closest('.play-item')
    audioArray.forEach(elem =>{
        elem.classList.remove('item-active')
    })
    eventTarget.classList.add('item-active')
    playNum = eventTarget.dataset.index
    isPlay = false;
    playAudio()
    
})

function playNext(){
    if(playNum >= playList.length-1){
        playNum = 0
        isPlay = false
        playAudio()
        return;
    }
    isPlay = false
    playNum++
    playAudio()
}
function playPrev(){
    if(playNum === 0 ){
        playNum = playList.length - 1
        isPlay = false
        playAudio()
        return
    }
    isPlay = false
    playNum--
    playAudio()
}
