'use strict';

(function () {
  var offerTemlate = document.querySelector('#offer');
  var offerSection = document.querySelector('.offers');
  var containerClass = 'offers-slider';
  var listClass = 'offers-slider__list';

  var makeOffers = function (offers) {
    var allOfferItems = [];
    var offerTemp = offerTemlate.content.querySelector('.offers-slide');

    offers.forEach(function (it) {
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

      offer.style = 'background-image: url("' + it.slideUrl + '")';

      allOfferItems.push(offer);
    });

    return allOfferItems;
  };

  window.backend.getSendData(window.data.OFFERS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, offerSection, containerClass, listClass, makeOffers, false, window.sliders.removeSlidesSection, false, false);
})();
