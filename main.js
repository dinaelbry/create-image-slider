// get slider items | array.from[es6 features]
let sliderImg = Array.from(document.querySelectorAll(".slider-container img"));

// get number of slide
let slidesCount = sliderImg.length;

// set current slide
let currentSlide = 1;

// slide number element
let slideNumElement = document.getElementById("slide-number");

// prev & next buttons
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

// handle click on prev & next
nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

// create main ul element
let paginationElement = document.createElement("ul");

// set id on created ul element
paginationElement.setAttribute("id", "pagination-ul");

// create list item based on slides count
for (let i = 1; i <= slidesCount; i++) {
  // create li
  let paginationItem = document.createElement("li");
  // set custom attribute
  paginationItem.setAttribute("data-index", i);
  // set item content
  paginationItem.appendChild(document.createTextNode(i));
  // append items to the main ul list
  paginationElement.appendChild(paginationItem);
}

// add the created ul element to the page
document.getElementById("indicators").appendChild(paginationElement);

// get new created ul
let paginationCreatedUl = document.getElementById("pagination-ul");

// get pag items
let paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

// loop through all bullets items
for (let i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    checker();
  };
}

// trigger the checker function
checker();

// pause on hover
let autoSlide = setInterval(nextSlide, 5000);
document
  .querySelector(".slider-container")
  .addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });
document
  .querySelector(".slider-container")
  .addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 5000);
  });

// next slide
function nextSlide() {
  currentSlide++;

  if (currentSlide > slidesCount) {
    // return to first slide
    currentSlide = 1;
  }
  checker();
}

// prev slide
function prevSlide() {
  currentSlide--;
  if (currentSlide < 1) {
    currentSlide = slidesCount;
  }
  checker();
}

// create the checker
function checker() {
  // set the slide number
  slideNumElement.textContent = `slide ${currentSlide} of ${slidesCount} `;
  // remove all active classes
  removeAllActive();
  // set active class on current slide
  sliderImg[currentSlide - 1].classList.add("active");
  //set active class on current pagination item
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");

  //   // check if current slide is the first
  //   if (currentSlide == 1) {
  //     // add disabled class on prev btn
  //     prevBtn.classList.add("disabled");
  //   } else {
  //     // remove disabled class on prev btn
  //     prevBtn.classList.remove("disabled");
  //   }

  //   // check if current slide is the last
  //   if (currentSlide == slidesCount) {
  //     // add disabled class on next btn
  //     nextBtn.classList.add("disabled");
  //   } else {
  //     // remove disabled class on next btn
  //     nextBtn.classList.remove("disabled");
  //   }
}

// remove all active classes from img and pag bullets
function removeAllActive() {
  // loop through img
  sliderImg.forEach(function (img) {
    img.classList.remove("active");
  });

  // loop through pag bullets
  paginationBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}
