'use strict';

$(function () {
    window.templateCity = function (markerElem) {
        var name = markerElem[0];
        var address = markerElem[1];
        var descr = markerElem[2];
        var more = markerElem[3];
        var img = markerElem[4];

        var template = document.querySelector('#js-templatePopupCity').content.querySelector('.popup');
        var templateElement = template.cloneNode(true);
        templateElement.querySelector('.popup__name').textContent = name;
        templateElement.querySelector('.popup__address').textContent = address;
        templateElement.querySelector('.popup__descr').textContent = descr;
        templateElement.querySelector('.popup__more').href = more;
        templateElement.querySelector('.popup__img').src = img;
        
        return templateElement;
    };
});