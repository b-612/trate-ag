'use strict';

(function () {
  var listAnimation = 'nesting-list-animation';
  var linkAnimation = 'nesting-link-animation';

  var mainNavList = document.querySelector('.main-nav__list');
  var itemsLists = Array.from(mainNavList.querySelectorAll('.main-nav__item'));
  var nestingLists = Array.from(mainNavList.querySelectorAll('.main-nav__nesting-list'));

  var removeAnimation = function (element) {
    var animatedItems = Array.from(element.children);
    var animatedLinks = Array.from(element.querySelectorAll('.' + linkAnimation));
    var animatedElements = animatedItems.concat(animatedLinks);

    animatedElements.push(element);

    animatedElements.forEach(function (current) {
      switch (true) {
        case current.classList.contains(linkAnimation) :
          current.classList.remove(linkAnimation);
          break;
        case current.classList.contains(listAnimation) :
          current.classList.remove(listAnimation);
          break;
      }
    });
  };

  var blurElement = function () {
    var activeElement = document.activeElement;
    activeElement.blur();
  };

  var hideLists = function (lists) {
    lists.forEach(function (current) {
      if (!current.classList.contains('visually-hidden')) {
        current.classList.add('visually-hidden');
        removeAnimation(current);
      }
    });
  };

  var openList = function (evt) {
    if (evt.currentTarget.classList.contains('main-nav__item')) {
      if (evt.currentTarget.classList.contains('main-nav__item--list')) {
        var nestingList = evt.currentTarget.querySelector('.main-nav__nesting-list');
        var nestingItems = Array.from(nestingList.querySelectorAll('.main-nav__nesting-item'));
        var nestingLinks = Array.from(nestingList.querySelectorAll('.main-nav__nesting-link'));
        var animationArray = nestingItems.concat(nestingLinks);

        animationArray.push(nestingList);
        nestingList.classList.remove('visually-hidden');

        animationArray.forEach(function (current) {
          if (current.classList.contains('main-nav__nesting-link')) {
            current.classList.add(linkAnimation);
          } else {
            current.classList.add(listAnimation);
          }
        });
      }
    }
  };

  var onItemHover = function (evt) {
    hideLists(nestingLists);
    blurElement();
    openList(evt);
  };

  var onItemFocus = function (evt) {
    hideLists(nestingLists);
    openList(evt);
  };

  var onItemMouseout = function () {
    hideLists(nestingLists);
  };

  var addListeners = function () {
    itemsLists.forEach(function (current) {
      current.addEventListener('mouseover', onItemHover);
      current.addEventListener('mouseout', onItemMouseout);
      current.addEventListener('focusin', onItemFocus);
    });
  };

  addListeners();
})();
