const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("div")[0];
component = document.querySelector(".component");
arrow = document.querySelectorAll(".component i");
list = carousel.querySelectorAll("div");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = component.clientWidth + component.clientWidth * 0.005;

arrow.forEach(icon => {
  icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(colorChange, 500);
  })
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = component.clientWidth + component.clientWidth * 0.005;
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
  setTimeout(colorChange, 500);
}

function colorChange () {
  lengthArray = list.length;
  // console.log(diff);
  for (let i = 0; i < lengthArray; i++){
    if (isInViewport(carousel.querySelectorAll("div")[i]) == true) {
      // console.log("Go to positive (left)");
      document.getElementsByTagName("body")[0].style.backgroundColor = carousel.querySelectorAll("div")[i].style.background;
      return;
    }
    else {
      document.getElementsByTagName("body")[0].style.backgroundColor = "#343F4F";
    }
  }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
