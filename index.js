const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("div")[0];
component = document.querySelector(".component");
arrow = document.querySelectorAll(".component i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = component.clientWidth;

arrow.forEach(icon => {
  icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
  })
});

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
  carousel.classList.remove("dragging");
  isDragStart = false;
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);