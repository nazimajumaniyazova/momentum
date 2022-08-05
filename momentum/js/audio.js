import playList from './playList.js';

const playerControls = document.querySelector('.player-controls')
const playListContainer = document.querySelector('.play-list')
const playerIcon = document.querySelector('.play')
let isPlay = false;
let playNum = 0;

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
    audio.src = 'http://127.0.0.1:5500/momentum'+ playList[playNum].src;
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
    if(playNum===playList.length-1){
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



