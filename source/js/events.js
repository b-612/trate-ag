'use strict';

(function () {
  var DESK_SLIDER_RATE = 2;
  var TABLET_SLIDER_RATE = 1;

  var rateCounter = 0;
  var maxRate = 0;

  var containerClass = 'events__slider';
  var itemListClass = 'events__list';
  var listClass = 'events-slider__list';

  var eventTemplate = document.querySelector('#event');
  var eventExample = eventTemplate.content.querySelector('.event');
  var eventsSection = document.querySelector('.events');
  var slideListTemp = document.querySelector('#slide-list');
  var slideListItem = slideListTemp.content.querySelector('.swiper-slide');
  var slideItem;
  var slideList;

  var makeEvents = function (eventsData) {
    var allEvents = [];

    eventsData.forEach(function (it, i) {
      var eventItem = eventExample.cloneNode(true);
      var eventDate = eventItem.querySelector('.event__date');
      var eventTitle = eventItem.querySelector('.event__title');
      var description = eventItem.querySelector('.event__description');
      var eventLink = eventItem.querySelector('.event__link');

      window.offersSlider.makeElemOrAttr(eventDate, [it.date, it.dateTime], ['textContent', 'dateTime']);
      window.offersSlider.makeElemOrAttr(eventTitle, [it.title], ['textContent']);
      window.offersSlider.makeElemOrAttr(description, [it.description], ['textContent']);
      window.offersSlider.makeElemOrAttr(eventLink, [it.link], ['href']);
      window.offersSlider.setStyleBackImg(it.src, eventItem, 'event--', i);

      allEvents.push(eventItem);
    });

    return allEvents;
  };

  var pushItemsInSlide = function (maxR, element, i, allSlides) {
    if (rateCounter === 0 || rateCounter === maxR) {
      slideItem = slideListItem.cloneNode(true);
      slideList = slideItem.querySelector('ul');

      if (rateCounter === maxR || i === 0) {
        allSlides.push(slideItem);
        rateCounter = 0;
      }

      slideList.classList.add(itemListClass);
    }

    if (rateCounter < maxR) {
      slideList.appendChild(element);

      rateCounter++;
    }
  };

  var makeSlides = function (itemsData, isResize) {
    if (isResize) {
      rateCounter = 0;
    }

    var allItems = makeEvents(itemsData);
    var allSlides = [];

    maxRate = screen.width >= window.util.DESKTOP_MIN_WIDTH ?
      DESK_SLIDER_RATE : TABLET_SLIDER_RATE;

    if (maxRate === DESK_SLIDER_RATE) {
      allItems.forEach(function (it, i) {
        pushItemsInSlide(maxRate, it, i, allSlides, isResize);
      });
    } else {
      allItems.forEach(function (it) {
        it.classList.add('swiper-slide');
        allSlides.push(it);
      });
    }

    return allSlides;
  };

  window.backend.getSendData(window.data.EVENTS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, eventsSection, containerClass, listClass, makeSlides, false, window.sliders.removeSlidesSection, false, 'events', false);

  window.events = {
    eventsSection: eventsSection,
    containerClass: containerClass,
    listClass: listClass,
    makeSlides: makeSlides
  };
})();
