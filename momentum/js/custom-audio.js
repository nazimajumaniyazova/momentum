let audioPlayNum = 0;
let audioIsPlay = false;

const customPlayer = document.querySelector('.audio-player')
const audioTimeline = document.querySelector('.audio-timeline')
const audioProgressBar = document.querySelector('.audio-progress')
const audioDuration  = document.querySelector('.audio-duration')
const audioCurrentTime = document.querySelector('.audio-current-time')
const audioPlayBtn = document.querySelector('.audio-play')
const audioLoopBtn = document.querySelector(".audio-loop")
const audioRandomBtn = document.querySelector(".audio-random")
const audioNextBtn = document.querySelector(".audio-next")
const audioPrevBtn = document.querySelector(".audio-prev")
const audioImg = document.querySelector(".audio-img")
const audioName = document.querySelector(".audio-name")

const playListContainer2 = document.querySelector('.auido-player-playlist')

function createPlaylist(){
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('audio-play-item')
        li.dataset.index = i;
        li.textContent = playList[i].title;
        playListContainer2.append(li)
    }
}
createPlaylist()

const customAudioArray = document.querySelectorAll('.audio-play-item')

playListContainer2.addEventListener('click', (event)=>{
    let eventTarget = event.target.closest('.audio-play-item')
    console.log('dd')
    customAudioArray.forEach(elem =>{
        elem.classList.remove('item-active')
        console.log('ss')
    })
    eventTarget.classList.add('item-active')
    audioPlayNum = eventTarget.dataset.index
    audioIsPlay  = false;
    customAudioPlay()
    
})

const customAudio = new Audio("");
customAudio.src = 'http://127.0.0.1:5501/momentum'+ playList[audioPlayNum].src;
audioImg.src = 'http://127.0.0.1:5501/momentum'+ playList[audioPlayNum].img;
audioName.textContent = playList[audioPlayNum].name
audioTimeline.addEventListener("click",(event)=>{
    const timelineWidth = window.getComputedStyle(audioTimeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth) * customAudio.duration;
    customAudio.currentTime = timeToSeek
})


customAudio.addEventListener('loadeddata',()=>{
    audioDuration.textContent = getTimeCodeFromNum(customAudio.duration);
    audioImg.src = 'http://127.0.0.1:5501/momentum'+ playList[audioPlayNum].img;
    customAudio.volume = .75;
})

customAudio.addEventListener('ended',()=>{
    if(!audioLoopBtn.classList.contains('audio-loop_active')){
       customAudio.currentTime = 0;
       customAudio.play()
       activePlayingItem()
    }else{
        if(!audioRandomBtn.classList.contains("audio-random_active")){
            audioPlayNum = getRandomPlayNum()
            customAudioPlay()
            activePlayingItem()
            return;
        }
        if(audioPlayNum >= playList.length-1){
            audioPlayNum = 0
            customAudioPlay()
            activePlayingItem()
            return;
        }
        audioPlayNum++
        customAudioPlay()
        activePlayingItem()
    } 
})
audioNextBtn.addEventListener('click',()=>{
    if(!audioRandomBtn.classList.contains("audio-random_active")){
        audioPlayNum = getRandomPlayNum()
        customAudioPlay()
        activePlayingItem()
        return;
    }
    if(audioPlayNum >= playList.length-1){
        audioPlayNum = 0
        audioIsPlay = true;
        customAudioPlay()
        activePlayBtn()
        activePlayingItem()
        return;
    }
    audioIsPlay = true;
    audioPlayNum++
    customAudioPlay()
    activePlayBtn()
    activePlayingItem()
})
audioPrevBtn.addEventListener('click',()=>{
    if(!audioRandomBtn.classList.contains("audio-random_active")){
        audioPlayNum = getRandomPlayNum()
        customAudioPlay()
        activePlayingItem()
        return;
    }
    if(audioPlayNum === 0 ){
        audioPlayNum = playList.length - 1
        audioIsPlay = true
        customAudioPlay()
        activePlayBtn()
        activePlayingItem()
        return
    }
    audioPlayNum--
    audioIsPlay = true
    customAudioPlay()
    activePlayBtn()
    activePlayingItem()
})
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}

function customAudioPlay(){
    if(!audioIsPlay){
        audioPlayBtn.classList.remove('a-play')
        audioPlayBtn.classList.add('a-pause')
        customAudio.play()
    }
    customAudio.src = 'http://127.0.0.1:5501/momentum'+ playList[audioPlayNum].src;
    audioName.textContent = playList[audioPlayNum].name
    customAudio.play()
}
setInterval(()=>{
    audioProgressBar.style.width = customAudio.currentTime / customAudio.duration * 100 + '%'
    audioCurrentTime.textContent = getTimeCodeFromNum(customAudio.currentTime)
},500)

audioPlayBtn.addEventListener("click", ()=>{
    if(customAudio.paused){
        audioPlayBtn.classList.remove('a-play')
        audioPlayBtn.classList.add('a-pause')
        customAudio.play()
        activePlayingItem()
    }else{
        audioPlayBtn.classList.remove("a-pause");
        audioPlayBtn.classList.add("a-play");
        customAudio.pause()
        activePlayingItem()
    }
    
})
audioLoopBtn.addEventListener('click',()=>{
   audioLoopBtn.classList.toggle('audio-loop_active')
})
audioRandomBtn.addEventListener('click', ()=>{
    audioRandomBtn.classList.toggle('audio-random_active')
})
function activePlayBtn(){

    if(audioIsPlay){
        audioPlayBtn.classList.remove('a-play')
        audioPlayBtn.classList.add('a-pause')
        audioIsPlay = false
        customAudio.play()
        return
    }else{
        audioPlayBtn.classList.remove("a-pause");
        audioPlayBtn.classList.add("a-play");
        audioIsPlay = true
        customAudio.pause()
    }

}
function getRandomPlayNum(){
    return Math.floor(Math.random() * (playList.length));
}

const audioArray2 = document.querySelectorAll('.play-item')

playListContainer2.addEventListener('click', (event)=>{
    let eventTarget = event.target.closest('.play-item')
    audioArray2.forEach(elem =>{
        elem.classList.remove('item-active')
    })
    eventTarget.classList.add('item-active')
    audioPlayNum = eventTarget.dataset.index
    audioIsPlay  = false;
    customAudioPlay()
    
})
function activePlayingItem(){
    customAudioArray.forEach(elem =>{
        elem.classList.remove('item-active')
    })
    customAudioArray[audioPlayNum].classList.add('item-active')
}