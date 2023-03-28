var carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("div")[0];
component = document.querySelector(".component");
arrow = document.querySelectorAll(".component i");
list = carousel.querySelectorAll("div");
let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = component.clientWidth;

function start() {
  colorChange()
  console.log(firstImg.offsetWidth);
  console.log(component.clientWidth);
  console.log(firstImgWidth);
  console.log(firstImgWidth*(list.length-1));
  console.log(carousel.scrollLeft);
}
start()

function update(){
  setTimeout(colorChange, 800);
  setTimeout(currentItem, 800);
}

function updateCarousel () {
  scrollLeft = 0;
  colorChange();
  return scrollLeft;
}

window.onresize = function() {
  carousel.scrollLeft = updateCarousel();
  firstImgWidth = component.clientWidth;
  update();
  totalSeconds = 0;
};

progressBar = document.getElementById("bar");
setInterval(setProgress, 10);
totalSeconds = 0;
maxTime = 300

function setProgress() {
  console.log(carousel.scrollLeft);
  if (totalSeconds >= maxTime){
    totalSeconds = 0;
    percentage = 0;
    if (carousel.scrollLeft <= (firstImg.clientWidth*(list.length-1))){
      autoForward();
    } else {
      autoBackward();
    }
  } 
  else if (totalSeconds <= maxTime){
    ++totalSeconds
    percentage = ((totalSeconds / maxTime) * 100) ;
    progressBar.style.width = percentage + '%';
  }
  else {
    alert ("error with progressbar");
  } 
}

function autoForward () {
  carousel.scrollLeft += firstImgWidth*1.00005;
  update();
}

function autoBackward () {
  carousel.scrollLeft = 0;
  setTimeout(colorChange, 250*(list.length));
  setTimeout(currentItem, 1000)
}

arrow.forEach(icon => {
  icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      update();
  })
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (document.documentElement.clientHeight) &&
      rect.right <= (document.documentElement.clientWidth)
  );
}

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff);
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft){
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff; 
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
  carousel.classList.remove("dragging");
  isDragStart = false;
  autoSlide();
  update();
}

function colorChange () {
  lengthArray = list.length;
  // console.log(diff);
  for (let i = 0; i < lengthArray; i++){
    if (isInViewport(carousel.querySelectorAll("div")[i]) == true) {
      // console.log("Go to positive (left)");
      document.getElementsByTagName("body")[0].style.backgroundColor = carousel.querySelectorAll("div")[i].style.color;
      return;
    }
    else {
      document.getElementsByTagName("body")[0].style.backgroundColor = "#343F4F";
    }
  }
}

function currentItem () {
  var lis = document.getElementsByClassName("progress-list")[0].getElementsByTagName("li");
  for (let i = 0; i < list.length; i++){
    if (isInViewport(carousel.querySelectorAll("div")[i]) == true){
      pastItem = document.getElementsByClassName("is-current")[0];
      pastItem.classList.remove("is-current");
      lis[i].classList.add("is-current");
    }
  }
}

function changeProgressPosition () {
  for (let i = 0; i < list.length; i++){
    if (isInViewport(carousel.querySelectorAll("div")[i]) == true){
      progressbar = document.getElementById("progress");
      bar = document.getElementById("bar");
      currentItem = document.getElementsByClassName("is-current")[0];
      var rect = currentItem.getBoundingClientRect();
      
    }
  }
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

