'use strict';

(function () {
  var activateOffersSlider = function () {
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

  var activateNewProductsSlider = function () {
    var newProductsSlider = new Swiper ('.new-products__slider', {
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
    activateOffersSlider: activateOffersSlider
  };

  window.onload = function () {
    activateNewProductsSlider();
  };
})();
