'use strict';

(function () {
  var checkWindowSize = function () {
    if (window.matchMedia('(max-width: ' + window.util.TABLET_MAX_WIDTH + 'px').matches) {
      window.mainNav.toggleNav();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > window.util.TABLET_MAX_WIDTH) {
      window.mainNav.addDesktopListeners();
      window.mainNav.removeMobileListeners();
    }
  };

  var onWindowResize = window.util.debounce(function () {
    if (screen.width <= window.util.TABLET_MIN_WIDTH) {
      window.mainNav.toggleNavFromResize();
      window.mainNav.removeMobileListeners();
      window.mainNav.removeDesktopListeners();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > window.util.TABLET_MAX_WIDTH) {
      window.mainNav.removeDesktopListeners();
      window.mainNav.removeMobileListeners();
      window.mainNav.addDesktopListeners();
    }

    window.mainNav.onItemMouseoutDesk();

    window.swiperActivate.activeSliders.forEach(function (it) {
      it.destroy();
    });

    window.sliders.makeSlider(window.offersSlider.makeOffers(window.backend.xhrResults.offers), window.offersSlider.offerSection, window.offersSlider.containerClass, window.offersSlider.listClass, true);

    window.sliders.makeSlider(window.newProducts.makeSlides(window.backend.xhrResults.newProducts, true), window.newProducts.newProductsSection, window.newProducts.containerClass, window.newProducts.listClass, true);

    window.sliders.makeSlider(window.events.makeSlides(window.backend.xhrResults.events, true), window.events.eventsSection, window.events.containerClass, window.events.listClass, false);
  });

  checkWindowSize();
  window.addEventListener('resize', onWindowResize);
})();
