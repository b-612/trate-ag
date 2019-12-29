'use strict';

(function () {
  var TABLET_MAX_WIDTH = 1279;

  var checkWindowSize = function () {
    if (window.matchMedia('(max-width: ' + TABLET_MAX_WIDTH + 'px').matches) {
      window.mainNav.toggleNav();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > TABLET_MAX_WIDTH) {
      window.mainNav.addDesktopListeners();
      window.mainNav.removeMobileListeners();
    }
  };

  var onWindowResize = function () {
    if (screen.width <= TABLET_MAX_WIDTH) {
      window.mainNav.toggleNavFromResize();
      window.mainNav.removeDesktopListeners();
      window.mainNav.addMobileListeners();
    }

    if (screen.width > TABLET_MAX_WIDTH) {
      window.mainNav.addDesktopListeners();
      window.mainNav.removeMobileListeners();
    }

    window.mainNav.onItemMouseoutDesk();
  };

  checkWindowSize();
  window.addEventListener('resize', onWindowResize);
})();
