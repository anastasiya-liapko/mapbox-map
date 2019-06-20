$(function () {
    var addCard = function (markerElem, coordinates) {
        var id = markerElem.getAttribute('id');
        var name = markerElem.getAttribute('name');
        var address = markerElem.getAttribute('address');
        var type = markerElem.getAttribute('type');
        var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]

        var infowincontent = document.createElement('div');
        infowincontent.setAttribute('class', 'popup');
        infowincontent.innerHTML = '<img src="images/s1200-3.jpeg" class="popup__img"/> <br/>';
        var strong = document.createElement('strong');
        strong.setAttribute('class', 'popup__name');
        strong.textContent = name;
        infowincontent.appendChild(strong);
        infowincontent.appendChild(document.createElement('br'));

        var text = document.createElement('text');
        text.setAttribute('class', 'popup__address');
        text.textContent = address;
        infowincontent.appendChild(text);
        var close = document.createElement('span');
        close.setAttribute('class', 'popup__close');
        infowincontent.appendChild(close);
        var pp = document.createElement('p');
        pp.setAttribute('class', 'popup__descr');
        pp.textContent = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому!' +
            'Есть даже ссылка чтоб про читать про это место еще больше.';
        infowincontent.appendChild(pp);
        var aa = document.createElement('a');
        aa.setAttribute('class', 'popup__more');
        aa.setAttribute('target', '_blank');
        aa.setAttribute('href', 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)');
        aa.textContent = 'Подробнее';
        infowincontent.appendChild(aa);

        $('#map').append(infowincontent.outerHTML);
        
        $('.popup .popup__close').on('click', function () {
            var popup = $(this).closest('.popup');
            popup.addClass('slide-out-left');
            setTimeout(function () { 
                popup.remove();
            }, 500);
        })
    };

    window.card = {
        addCard: function (markerElem, coordinates) {
            addCard(markerElem, coordinates);
        }
    }
});