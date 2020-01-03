'use strict';

(function () {
  var DESK_SLIDER_RATE = 6;
  var TABLET_SLIDER_RATE = 4;
  var MOBILE_SLIDER_RATE = 2;
  var DETAIL_IMG_MAX_WIDTH = 180;
  var IMG_MAX_WIDTH = 405;

  var containerClass = 'new-products__slider';
  var itemListClass = 'new-products__list';
  var listClass = 'new-products-slider__list';
  var rate = 0;
  var rateCounter = 0;
  var maxRate = 0;

  var newProductTemplate = document.querySelector('#new-product');
  var productExample = newProductTemplate.content.querySelector('.product');
  var newProductsSection = document.querySelector('.new-products');
  var slideListTemp = document.querySelector('#slide-list');
  var slideListItem = slideListTemp.content.querySelector('.swiper-slide');
  var slideItem;
  var slideList;

  var setImgWidthHeight = function (img, maxWidth) {
    var denominator = img.naturalWidth / img.naturalHeight;

    img.width = img.naturalWidth > maxWidth ?
      maxWidth : img.naturalWidth;

    img.height = img.naturalWidth > maxWidth ?
      Math.round(maxWidth / denominator) : img.naturalHeight;
  };

  var setImgAttributes = function (elementData, img) {
    img.addEventListener('load', function () {
      if (elementData.detail) {
        // eslint-disable-next-line no-invalid-this
        setImgWidthHeight(this, DETAIL_IMG_MAX_WIDTH);
      } else {
        // eslint-disable-next-line no-invalid-this
        setImgWidthHeight(this, IMG_MAX_WIDTH);
      }
    });
  };

  var makeProduct = function (elementData) {
    var product = productExample.cloneNode(true);
    var productTitle = product.querySelector('.product__title');
    var productDesc = product.querySelector('.product__description');
    var productCategory = product.querySelector('.product__category-link');
    var productBtn = product.querySelector('.product__order');
    var productPicture = product.querySelector('.product__picture');
    var productSource = product.querySelector('source');
    var productImage = document.createElement('img');

    window.offersSlider.makeElemOrAttr(productTitle, [elementData.title], ['textContent']);
    window.offersSlider.makeElemOrAttr(productDesc, [elementData.description], ['textContent']);
    window.offersSlider.makeElemOrAttr(productCategory, [elementData.category, elementData.catLink], ['textContent', 'href']);
    window.offersSlider.makeElemOrAttr(productBtn, [elementData.buttonText, elementData.buttonLink], ['textContent', 'href']);

    if (elementData.slideUrl) {
      productImage.classList.add('product__image');

      if (elementData.detail) {
        productImage.classList.add('product__image--detail');
      }

      setImgAttributes(elementData, productImage);

      productImage.src = elementData.slideUrl;
      productSource.srcset = elementData.slideUrl.slice(0, -4) + '.webp';
      productImage.alt = 'Изображение ' + elementData.title;
      productPicture.insertAdjacentElement('beforeend', productImage);
    } else {
      productImage.remove();
    }

    if (elementData.size === 'big') {
      product.classList.add('product--big');
    } else {
      product.classList.add('product--small');
    }

    return product;
  };

  var makeAllProducts = function (productsData) {
    var allProducts = [];

    productsData.forEach(function (it) {
      var product = makeProduct(it);

      allProducts.push(product);
    });

    return allProducts;
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

      rate = element.classList.contains('product--big') ?
        2 : 1;

      rateCounter = rateCounter + rate;
    }
  };

  var makeSlides = function (productsData, isResize) {
    if (isResize) {
      rateCounter = 0;
    }

    var allProducts = makeAllProducts(productsData);
    var allSlides = [];

    switch (true) {
      case screen.width >= window.util.DESKTOP_MIN_WIDTH :
        maxRate = DESK_SLIDER_RATE;
        break;

      case screen.width >= window.util.TABLET_MIN_WIDTH :
        maxRate = TABLET_SLIDER_RATE;
        break;

      default :
        maxRate = MOBILE_SLIDER_RATE;
    }

    if (maxRate === MOBILE_SLIDER_RATE) {
      allProducts.forEach(function (it) {
        it.classList.add('swiper-slide');
        allSlides.push(it);
      });
    } else {
      allProducts.forEach(function (it, i) {
        pushItemsInSlide(maxRate, it, i, allSlides, isResize);
      });
    }

    return allSlides;
  };

  window.backend.getSendData(window.data.NEW_PRODUCTS_DATA, window.backend.backendData.METHOD_FOR_GET, window.sliders.makeSlider, newProductsSection, containerClass, listClass, makeSlides, false, window.sliders.removeSlidesSection, false, 'newProducts', true);

  window.newProducts = {
    newProductsSection: newProductsSection,
    containerClass: containerClass,
    listClass: listClass,
    makeSlides: makeSlides
  };
})();
