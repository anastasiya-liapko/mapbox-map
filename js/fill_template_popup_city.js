'use strict';

$(function () {
    window.templateCity = function (markerElem) {
        var name = markerElem[0];
        var address = markerElem[1];

        var template = document.querySelector('#js-templatePopupCity').content.querySelector('.popup');
        var templateElement = template.cloneNode(true);
        templateElement.querySelector('.popup__name').textContent = name;
        templateElement.querySelector('.popup__address').textContent = address;
        templateElement.querySelector('.popup__descr').textContent = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому!' +
        'Есть даже ссылка чтоб про читать про это место еще больше.';
        templateElement.querySelector('.popup__more').href = 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)';
        templateElement.querySelector('.popup__more').textContent = 'Подробнее';
        
        return templateElement;
    };
});