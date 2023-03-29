var carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("div")[0];
component = document.querySelector(".component");
arrow = document.querySelectorAll(".component i");
items = document.querySelectorAll(".progress-list li");
list = carousel.querySelectorAll("div");
let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = component.clientWidth;

function start() {
  colorChange();
  changeProgressPosition();
  timer = true;
  dragBlock = false;
}
start()

function update(){
  time = 300*(list.length);
  setTimeout(colorChange, time);
  setTimeout(currentItem, time);
  setTimeout(changeProgressPosition, time)
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
maxTime = 600

function setProgress() {
  if (timer != true){
    return 0;
  }
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
  update()
}

arrow.forEach(icon => {
  icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      update();
  })
});

items.forEach(item => {
  item.addEventListener("click", () => {
    for (let i = 0; i < list.length; i++){
      card = document.querySelector("[data-th=" + CSS.escape(item.dataset.th) + "]");
    }
    scrolling = card.offsetLeft;
    carousel.scrollTo({
      top: 0, 
      left: scrolling,
      behavior: 'smooth'
    });
    totalSeconds = 0;
    update();
  })
})

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
  totalSeconds = 0;
  carousel.classList.remove("dragging");
  isDragStart = false;
  autoSlide();
  update();
}

function colorChange () {
  lengthArray = list.length;
  for (let i = 0; i < lengthArray; i++){
    if (isInViewport(carousel.querySelectorAll("div")[i]) == true) {
      document.getElementsByTagName("body")[0].style.backgroundColor = carousel.querySelectorAll("div")[i].style.color;
      return;
    }
    else {
      // document.getElementsByTagName("body")[0].style.backgroundColor = "#343F4F";
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
      item = document.getElementsByClassName("is-current")[0];
      var rect = item.getBoundingClientRect();
      document.getElementsByClassName("progress")[0].style.left = (item.offsetLeft) + "px";
      document.getElementsByClassName("progress")[0].style.width = rect.width + 'px';
    }
  }
}

document.getElementById("nav-brandID").addEventListener("click", function() {
  console.log("test");
})

document.getElementById("hamburger").addEventListener("click", function() {
  menu = document.getElementById("hamburger");
  navMenu = document.querySelector(".nav-menu");
  menu.classList.toggle("active");
  navMenu.classList.toggle("active");
})

list.forEach(slide => {
  slide.addEventListener("click", () => {
    AboutMe = document.getElementById(slide.dataset.th+'Page');
    AboutMe.classList.toggle("off");

    carousel.classList.toggle("active");
    slide.classList.toggle("active");

    for (let i = 0; i < list.length; i++) {
      if (list[i].classList.contains("active") == false && carousel.classList.contains("active") == true){
        list[i].classList.toggle("disable");
      } else if (list[i].classList.contains("disable") == true && carousel.classList.contains("active") == false) {
        list[i].classList.toggle("disable");
        // jump(slide.dataset.th+'Id');
        carousel.scrollLeft = slide.offsetLeft;
      }
    }
    if (slide.classList.contains("active")){
      slide.style.backgroundColor = slide.style.color;
    } else {
      slide.style.backgroundColor = 'rgba(255, 140, 0, 0)';
    }

    itemList = document.querySelector(".progress-list");
    itemList.classList.toggle("disable");
    
    totalSeconds = 0;
    timer = !timer;
    dragBlock = !dragBlock;
  })
})

function jump(h){
  var url = location.href;               //Save down the URL without hash.
  location.href = "#"+h;                 //Go to the target element.
  history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}


if (dragBlock == false){
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
}
