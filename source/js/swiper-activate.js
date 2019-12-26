'use strict';

(function () {
  var activateSiper = function () {
    var mySwiper = new Swiper ('.swiper-container', {
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

  window.swiperActivate = {
    activateSiper: activateSiper
  };

  window.sliderActiveElements.setListeners(window.sliderActiveElements.getNavBtns());
})();
