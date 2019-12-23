'use strict';

(function () {
  var navBtns = Array.from(document.querySelectorAll('.offers-slider__nav-button'));

  var slidesLists = Array.from(document.querySelectorAll('.swiper-wrapper'));

  var getItems = function (list) {
    var items = Array.from(list.querySelectorAll('li'));

    return items;
  };

  var getAllItems = function (lists) {
    var allItems = [];

    lists.forEach(function (it) {
      allItems.push(getItems(it));
    });

    return allItems;
  };

  var disableElements = function (indexElements) {
    indexElements.forEach(function (currentItem) {
      currentItem.forEach(function (it) {
        var indexElelments = Array.from(it.querySelectorAll('a'));

        if (it.classList.contains('swiper-slide-active')) {
          indexElelments.forEach(function (current) {
            current.tabIndex = 0;
          });
        } else {
          indexElelments.forEach(function (current) {
            current.tabIndex = -1;
          });
        }
      });

    });
  };


  var onNavElementClick = function () {
    disableElements(getAllItems(slidesLists));
  };

  var setListeners = function () {
    navBtns.forEach(function (it) {
      it.addEventListener('click', onNavElementClick);
    });
  };

  disableElements(getAllItems(slidesLists));
  setListeners();
})();
