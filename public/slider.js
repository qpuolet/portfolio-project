// function Slider() {
//   this.slideCount = 1;
//
//   this.showSlide = function (n = 1){
//     this.n = n;
//     let slides =  document.getElementsByClassName("sliderItem");
//     if (this.n > slides.length) this.slideCount = 1;
//     if(this.n < 1) this.slideCount = slides.length;
//     for (let i = 0; i < slides.length; i++) {
//       i === (this.slideCount - 1)?
//         slides[i].style.display = "block" :
//         slides[i].style.display = "none";
//     }
//   }
//
//   this.init = function() {
//     this.showSlide();
//   }
//
//   this.changeIndex = function(x) {
//     this.x = x;
//
//     let num = this.slideCount += this.x;
//     this.showSlide(num)
//   }
// }
//
// let blogSlider = new Slider();
//
// blogSlider.init();

let Slider = {
  config: {
    prevSlide: null,
    curSlide: 0,
    nextSlide: null,
    autoPlay: false,
    isArrow: true,
    slideCount: 0,
    coordXDown: 0,
    cordXUp: 0,
  },

  initArrows() {
    this.prevArrow = document.createElement('button');
    this.prevArrow.className = 'slider__arrowLeft';
    this.prevArrow.innerHTML = '<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>';
    this.prevArrow.onclick = this.prevSlide.bind(this);

    this.nextArrow = document.createElement('button');
    this.nextArrow.className = 'slider__arrowRight';
    this.nextArrow.innerHTML = '<i class="fa fa-chevron-right fa-lg" aria-hidden="true"></i>';
    this.nextArrow.onclick = this.nextSlide.bind(this);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.prevArrow);
    fragment.appendChild(this.nextArrow);

    this.node.appendChild(fragment);
  },

  initMouseHandlers() {
    this.node.onmousedown = this.mouseDown.bind(this);
    this.node.onmouseup = this.mouseUp.bind(this);
    this.node.ontouchstart = this.touchDown.bind(this);
    this.node.ontouchend = this.touchUp.bind(this);
  },

  nextSlide() {
    // changing prevSlide index
    this.config.prevSlide = this.config.curSlide;

    // changing curSlide index
    if(this.config.curSlide === this.config.slideCount) {
      this.config.curSlide = 0;
    } else {
      this.config.curSlide +=1;
    }

    // changing nextSlide index
    if(this.config.curSlide + 1 <= this.config.slideCount) {
      this.config.nextSlide = this.config.curSlide + 1;
    } else {
      this.config.nextSlide = 0;
    }

    console.log('prev=' + this.config.prevSlide + ' curr=' + this.config.curSlide + ' next=' + this.config.nextSlide);
    this.goToSlide(this.config.curSlide);
  },

  prevSlide() {
    // changing nextSlide index
    this.config.nextSlide = this.config.curSlide;

    // changing curSlide index
    if(this.config.curSlide === 0) {
      this.config.curSlide = this.config.slideCount;
    } else {
      this.config.curSlide -= 1;
    }
    // changing prevSlide index

    if(this.config.curSlide - 1 >= 0) {
      this.config.prevSlide = this.config.curSlide - 1;
    } else {
      this.config.prevSlide = this.config.slideCount;
    }

    console.log('prev=' + this.config.prevSlide + ' curr=' + this.config.curSlide + ' next=' + this.config.nextSlide);
    this.goToSlide(this.config.curSlide);
  },

  mouseDown(event) {
    console.log('down', event.clientX);
    this.config.coordXDown = event.clientX;
  },

  mouseUp() {
    console.log('up', event.clientX);
    this.config.coordXUp = event.clientX;
    this.swipe();
  },

  touchDown() {
    console.log('touchDown', event.touches[0].clientX);
    this.config.coordXDown = event.touches[0].clientX;
    console.log(this.config.coordXDown);
  },

  touchUp() {
    console.log('touchUp', event.changedTouches[0].clientX);
    this.config.coordXUp = event.changedTouches[0].clientX;
    this.swipe();
  },

  swipe () {

    let swipeX = this.config.coordXDown - this.config.coordXUp;
    console.log(swipeX);
    let swipeSize = 120;
    if (window.matchMedia("(max-width: 480px)").matches) swipeSize = 60;
    if (swipeX < 0 && swipeX < -swipeSize) { this.prevSlide()}
    if(swipeX > 0 && swipeX > swipeSize) { this.nextSlide() }
  },

  initSlide() {
    let curSlide = Array.from(this.node.getElementsByClassName('sliderItem'))[0];
    curSlide.classList.add("aTemp");
  },

  init(node, config) {
    this.config = Object.assign({}, this.config, config || {});
    this.config.slideCount = node.children.length - 1;
    if (this.config.slideCount < 1) return;
    this.node = node;
    node.Slider = this;
    this.initSlide();
    this.initArrows();
    this.initMouseHandlers();
  },

  goToSlide(x) {
    console.log('goToSlide', x);
    let curSlide = Array.from(this.node.getElementsByClassName('sliderItem'));
    curSlide.forEach(slide => slide.classList.remove('aTemp'));
    curSlide[x].classList.add('aTemp');
  },

};

Array.prototype.forEach.call(document.querySelectorAll('.postPreview__slidesList'), (node) => {
  Object.create(Slider).init(node, {isArrow: false, test: true});
});