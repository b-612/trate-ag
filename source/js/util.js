'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var UtilOption = {
    FRAGMENT: document.createDocumentFragment(),
    MOBILE_MAX_WIDTH: 767,
    TABLET_MIN_WIDTH: 768,
    TABLET_MAX_WIDTH: 1279,
    DESKTOP_MIN_WIDTH: 1340,
    RETINA_DPI: '144dpi',
    RETINA_DPPX: '1.5dppx',

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };

  window.util = UtilOption;
})();
