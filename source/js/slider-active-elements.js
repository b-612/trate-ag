'use strict';

(function () {
  var getNavBtns = function () {
    var btnsPrev = Array.from(document.querySelectorAll('.swiper-button-prev'));
    var btnsNext = Array.from(document.querySelectorAll('.swiper-button-next'));

    var allBtns = btnsPrev.concat(btnsNext);

    return allBtns;
  };

  var getSliderLists = function () {
    var lists = Array.from(document.querySelectorAll('.swiper-wrapper'));

    return lists;
  };

  var getCurrentList = function (evt) {
    var lists = [];
    var container = evt.target.closest('.swiper-container');
    var list = container.querySelector('.swiper-wrapper');

    lists.push(list);
    return lists;
  };

  var getLinks = function (lists) {
    var links = [];

    lists.forEach(function (it) {
      var itLinks = Array.from(it.querySelectorAll('a'));

      links.push(itLinks);
    });

    return links;
  };

  var disableElements = function (links) {
    links.forEach(function (currentLink) {
      currentLink.forEach(function (it) {
        if (it.closest('.swiper-slide-active')) {
          it.tabIndex = 0;
        } else {
          it.tabIndex = -1;
        }
      });
    });
  };

  var onNavClick = function (evt) {
    window.setTimeout(function () {
      disableElements(getLinks(getCurrentList(evt)));
    }, 500);
  };

  var setListeners = function (btns) {
    btns.forEach(function (it) {
      it.addEventListener('click', onNavClick);
    });
  };

  window.sliderActiveElements = {
    disableElements: disableElements,
    setListeners: setListeners,
    getSliderLists: getSliderLists,
    getLinks: getLinks,
    getNavBtns: getNavBtns
  };
})();
