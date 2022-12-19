const playBtn = document.querySelector(".play-btn")
const prevBtn = document.querySelector(".fa-step-backward")
const nextBtn = document.querySelector(".fa-step-forward")
const musicContainer = document.querySelector(".music-controls")
const audio = document.querySelector("#audio")
const progress = document.querySelector(".progress")
progressContainer = document.querySelector(".progress-container")

// To open the HOW TO PLAY section
document.querySelector(".fa-question").addEventListener("click", function(){
  document.querySelector(".instuctions").style.display = "block";
})

// To close the HOW TO PLAY section
document.querySelector(".fa-times").addEventListener("click", function(){
  document.querySelector(".instuctions").style.display = "none";
})

//To close the CONGRATULATIONS pop up
document.querySelector(".congratulations button").addEventListener("click", function(){
  document.querySelector(".congratulations").style.display = "none";
})

// To close the YOU LOST section
document.querySelector(".lost-times").addEventListener("click", function(){
  document.querySelector(".lost").style.display = "none";
})

// Fuction to play the song
function playSong() {
  playBtn.classList.remove("fa-play")
  playBtn.classList.add("fa-pause")
  audio.play()
}

// Fuction to pause the song
function pauseSong() {
  playBtn.classList.remove("fa-pause")
  playBtn.classList.add("fa-play")
  audio.pause()
}

// Function to update the progress bar of song
function updateProgress() {
  const currentTime = audio.currentTime
  const duration = audio.duration
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = progressPercent + '%'

  if (audio.currentTime == audio.duration){
    pauseSong()
  }
}

// Function to set the progress bar of song
function setProgress(e) {
  const widthPx = progressContainer.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / widthPx) * duration
}

//Event listner for Play button click
playBtn.addEventListener("click", function(){
  const isPlaying = playBtn.classList.contains("fa-pause")
//Condition to check if music is playing
  if(isPlaying) {
    pauseSong()
  }
  else {
    playSong()
  }
})
//Event listner for Previous button click
prevBtn.addEventListener("click", function(){
  audio.currentTime = 0
})
//Event listner for Next button click
nextBtn.addEventListener("click", function(){
  audio.currentTime = audio.duration
  pauseSong()
})
//Statement to update progress bar
audio.ontimeupdate = updateProgress
//Statement to set progress bar from container
progressContainer.addEventListener("click", setProgress)

const shareButton = document.querySelector(".share")
const title = window.document.title;
const url = window.document.location.href;

shareButton.addEventListener("click", function(){
    if(navigator.share){
        navigator.share({
        text: "Hey,Can you guess the song this tune is from?",
        url: `${url}`,
        title: `${title}`
        })
    } else {
        navigator.clipboard.writeText("Hey,Can you guess the song this tune is from?")
    }
})

const shareButton2 = document.querySelector(".share2")

shareButton2.addEventListener("click", function(){
    if(navigator.share){
        navigator.share({
        text: "Hey,Can you guess the song this tune is from?",
        url: `${url}`,
        title: `${title}`
        })
    } else {
        navigator.clipboard.writeText("Hey,Can you guess the song this tune is from?")
    }
})
