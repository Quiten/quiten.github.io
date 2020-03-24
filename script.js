function open_menu() {
  document.getElementById("sidebar").style.width = "200px";
}
function close_menu() {
  document.getElementById("sidebar").style.width = "0";
}


function playsong() {
  document.getElementById("Player").play();
}

function pausesong() {
  document.getElementById("Player").pause();
}

function stopsong() {
  document.getElementById('Player').setcurrentTime();/**tried also with audio.currentTime here. Didn't worked **/
  audio.currentTime = 0;
}

function forwardAudio() {
  audio = document.getElementById('Player'); /**tried also with audio.currentTime here. Didn't worked **/
  crim = document.getElementById("Son");
  crim.play();
  audio.currentTime += 10.0

}

function resetAudio() {
  audio = document.getElementById('player');
  crim = document.getElementById('Son');
  
}