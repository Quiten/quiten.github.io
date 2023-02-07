function open_menu() {
  document.getElementById("sidebar").style.width = "200px";
}
function close_menu() {
  document.getElementById("sidebar").style.width = "0";
}


function playsong() {
  document.getElementById("Player").play();
}

function pausesong2() {
  myAudio = document.getElementById("Player");
  d = document.getElementById("Wereld");

  d.play();

  if(myAudio.paused){
    myAudio.play();
} else {  
  myAudio.pause();
}
}

function stopsong() {
  audio = document.getElementById('Player');
  exp = document.getElementById("Gold");
  audio.currentTime = 0;
  exp.play();
  audio.play();
}

function forwardAudio() {
  audio = document.getElementById('Player');
  crim = document.getElementById("Son");
  crim.play();
  audio.currentTime += 10.0

}

function playbackAudio() {
  audio = document.getElementById('Player');
  b = document.getElementById("Bites");
  b.play();
  audio.currentTime -= 10.0;
}