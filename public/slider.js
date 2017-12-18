// let slideIndex = 1;
//
// showSlide();
//
// function changeSlideIndex(x) {
//   showSlide(slideIndex += x);
// }
//
// function showSlide(n = 1) {
//   let slides =  document.getElementsByClassName("sliderItem");
//   if (n > slides.length) slideIndex = 1;
//   if(n < 1) slideIndex = slides.length;
//
//   for (i = 0; i < slides.length; i++) {
//     i === (slideIndex - 1)?
//       slides[i].style.display = "block" :
//       slides[i].style.display = "none";
//   }
// }

function Slider() {
  this.slideIndex = 1;

  this.showSlide = function (n = 1){
    this.n = n;
    let slides =  document.getElementsByClassName("sliderItem");
    if (this.n > slides.length) this.slideIndex = 1;
    if(this.n < 1) this.slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
      i === (this.slideIndex - 1)?
        slides[i].style.display = "block" :
        slides[i].style.display = "none";
    }
  }

  this.init = function() {
    this.showSlide();
  }

  this.changeIndex = function(x) {
    this.x = x;

    let num = this.slideIndex += this.x;
    this.showSlide(num)
  }
}

let blogSlider = new Slider();

blogSlider.init();