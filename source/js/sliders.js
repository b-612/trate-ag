'use strict';

(function () {
  var sliderTemplate = document.querySelector('#swiper-slider');
  var sliderMaked = new Event('sliderMaked');

  var makeSlidesContainer = function () {
    var sliderContainer = sliderTemplate.content.querySelector('.swiper-container').cloneNode(true);

    return sliderContainer;
  };

  var removeSlidesSection = function (section) {
    section.remove();
  };

  var makeSlider = function (slides, section, containerClassList, listClassList) {
    var container = makeSlidesContainer();
    var slidesList = container.querySelector('.swiper-wrapper');

    container.classList.add(containerClassList);
    slidesList.classList.add(listClassList);

    slides.forEach(function (it) {
      slidesList.appendChild(it);
    });

    window.util.fragment.appendChild(container);
    section.appendChild(window.util.fragment);

    document.addEventListener('sliderMaked', window.sliderActiveElements.onSliderMaked(container));
    document.dispatchEvent(sliderMaked);
  };

  window.sliders = {
    makeSlider: makeSlider,
    removeSlidesSection: removeSlidesSection
  };
})();