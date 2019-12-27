'use strict';

(function () {
  var activateSliders = function () {
    var offersSlider = new Swiper ('.offers-slider', {
      // Optional parameters
      cssMode: true,
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
        touchRatio: 0
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      mousewheel: true,
      keyboard: true,
    });
};

  // var testSlider = new Swiper ('.new-products__slider', {
  //   // Optional parameters
  //   cssMode: true,
  //   direction: 'horizontal',
  //   loop: true,
  //
  //   // If we need pagination
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: false,
  //     touchRatio: 0
  //   },
  //
  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //
  //   mousewheel: true,
  //   keyboard: true,
  // });

  window.swiperActivate = {
    activateSliders: activateSliders
  };
})();
