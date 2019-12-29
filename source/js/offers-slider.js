'use strict';

(function () {
  var MOBILE_MAX_WIDTH = 767;
  var DESKTOP_MIN_WIDTH = 1340;
  var RETINA_DPI = '144dpi';
  var RETINA_DPPX = '1.5dppx';

  var offerTemlate = document.querySelector('#offer');
  var offerSection = document.querySelector('.offers');
  var containerClass = 'offers-slider';
  var listClass = 'offers-slider__list';

  var makeOffers = function (offers) {
    var allOfferItems = [];
    var offerTemp = offerTemlate.content.querySelector('.offers-slide');

    offers.forEach(function (it, i) {
      var offer = offerTemp.cloneNode(true);

      var offerTitle = offer.querySelector('.offers-slide__title');
      var offerDescription = offer.querySelector('.offers-slide__description');
      var offerButton = offer.querySelector('.offers-slide__link');

      if (it.title) {
        offerTitle.textContent = it.title;
      } else {
        offerTitle.remove();
      }

      if (it.description) {
        offerDescription.textContent = it.description;
      } else {
        offerDescription.remove();
      }

      if (it.buttonText) {
        offerButton.textContent = it.buttonText;
        offerButton.href = it.buttonLink;
      } else {
        offerButton.remove();
      }

      offer.classList.add('offers-slide--' + (i + 1));

      var style = '<style scope>'
        +
        '@media (max-width: ' + MOBILE_MAX_WIDTH + 'px) {\n'
        +
        '  .offers-slide--' + (i + 1) + ' {\n'
        +
        '    background-image: url("' + it.slideUrl.slice(0, -9) + '-mob@1x.jpg");\n'
        +
        '  }\n\n'
        +
      '    @media (min-resolution: ' + RETINA_DPI + '), (min-resolution: ' + RETINA_DPPX + ') {\n'
        +
        '    .offers-slide--' + (i + 1) + ' {\n'
        +
        '      background-image: url("' + it.slideUrl.slice(0, -9) + '-mob@2x.jpg");\n'
        +
        '    }\n' +
        '  }\n'
        +
        '}\n\n'
        +
        '@media (min-width: ' + DESKTOP_MIN_WIDTH + 'px) {\n'
        +
        '  .offers-slide--' + (i + 1) + ' {\n'
        +
        '    background-image: url("' + it.slideUrl + '");\n'
        +
        '  }\n' +
        '}</style>';

      offer.insertAdjacentHTML('afterbegin', style);

      allOfferItems.push(offer);
    });

    return allOfferItems;
  };

  window.backend.getSendData(window.data.OFFERS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, offerSection, containerClass, listClass, makeOffers, false, window.sliders.removeSlidesSection, false, false);
})();
