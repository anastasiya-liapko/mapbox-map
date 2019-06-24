'use strict';

$(function () {
    window.templateMenu = function (markerElem) {
        var name = markerElem[0];
        var address = markerElem[1];
        var id = markerElem[2];
        var point = markerElem[3];
        var descr = markerElem[4];
        var more = markerElem[5];
        var img = markerElem[6];

        var template = document.querySelector('#js-templatePopupMenuItem').content.querySelector('.popup-menu__list-item');
        var templateElement = template.cloneNode(true);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-id', id);
        templateElement.querySelector('.popup-menu__list-link').textContent = name;
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-address', address);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-descr', descr);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-more', more);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-point', point);
        templateElement.querySelector('.popup-menu__list-link').setAttribute('data-img', img);
        templateElement.querySelector('.popup-menu__dropdown').setAttribute('data-id', id);
        
        return templateElement;
    };
});