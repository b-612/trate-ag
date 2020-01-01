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
    if (screen.width <= window.util.TABLET_MAX_WIDTH) {
      window.mainNav.toggleNavFromResize();
      window.mainNav.removeDesktopListeners();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > window.util.TABLET_MAX_WIDTH) {
      window.mainNav.addDesktopListeners();
      window.mainNav.removeMobileListeners();
    }

    window.mainNav.onItemMouseoutDesk();
    window.sliders.makeSlider(window.newProducts.makeSlides(window.backend.xhrResults.newProducts, true), window.newProducts.newProductsSection, window.newProducts.containerClass, window.newProducts.listClass);
  });

  checkWindowSize();
  window.addEventListener('resize', onWindowResize);
})();
