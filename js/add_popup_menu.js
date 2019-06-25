$(function () {
    var addMenu = function (map, markers) {

        $('#js-mapHamburger').show();

        var addPopup = function (coordinates) {
            var fragmentMenu = document.createDocumentFragment();
            var template = document.querySelector('#js-templatePopupMenu').content.querySelector('.popup');
            var templateElement = template.cloneNode(true);
            fragmentMenu.appendChild(templateElement);
            
            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var address = markerElem.getAttribute('address');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))];
                var descr = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому! Есть даже ссылка чтоб про читать про это место еще больше.';
                var more = 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)';
                var img = 'images/s1200-3.jpeg';

                if (parseInt(parentId) == 0) {
                    var fragmentMenuItem = document.createDocumentFragment();
                    fragmentMenuItem.appendChild(window.templateMenu([name, address, id, point, descr, more, img]));
                    fragmentMenu.querySelector('.popup-menu__list').append(fragmentMenuItem);
                }
            });

            $('#map').append(fragmentMenu);
    
            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var address = markerElem.getAttribute('address');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))];
                var descr = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому! Есть даже ссылка чтоб про читать про это место еще больше.';
                var more = 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)';
                var img = 'images/s1200-3.jpeg';

                if (parseInt(parentId) !== 0) {
                    var dropdownItem = document.createElement('li');
                    dropdownItem.setAttribute('class', 'popup-menu__dropdown-item');
                    var dropdownLink = document.createElement('a');
                    dropdownLink.setAttribute('class', 'popup-menu__dropdown-link');
                    dropdownLink.textContent = name;
                    dropdownLink.setAttribute('data-id', id);
                    dropdownLink.setAttribute('data-point', point);
                    dropdownLink.setAttribute('data-address', address);
                    dropdownLink.setAttribute('data-descr', descr);
                    dropdownLink.setAttribute('data-more', more);
                    dropdownLink.setAttribute('data-img', img);
                    dropdownItem.appendChild(dropdownLink);
                    var dropdown = $('.popup-menu__dropdown[data-id="' + parentId + '"]');
                    dropdown.append(dropdownItem.outerHTML);
                }
            });
        }

        var addClickFunc = function () {
            $('#map .popup-menu__list-link').on('click', function (e) {
                var name = $(this).text();
                var address = $(this).attr('data-address');
                var point = $(this).attr('data-point').split(',');
                var descr = $(this).attr('data-descr');
                var more = $(this).attr('data-more');
                var img = $(this).attr('data-img');

                var dropdown = $(this).siblings();
                if (dropdown.children().length !== 0) {
                    dropdown.slideDown();
                    $(this).on('click', function () {
                        window.util.switchPopup([name, address, descr, more, img]);
                        window.util.flyTo(map, point, 'city');
                    })
                } else {
                    window.util.switchPopup([name, address, descr, more, img]);
                    window.util.flyTo(map, point, 'city');
                }
            });

            $('#map .popup-menu__dropdown-link').on('click', function () {
                var name = $(this).text();
                var address = $(this).attr('data-address');
                var point = $(this).attr('data-point').split(',');
                var descr = $(this).attr('data-descr');
                var more = $(this).attr('data-more');
                var img = $(this).attr('data-img');

                window.util.switchPopup([name, address, descr, more, img]);
                window.util.flyTo(map, point, 'point');
            })
        }
        
        $('#map .hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            if (!$(this).hasClass('is-active')) {
                $('#map .popup').addClass('slide-out-left');
                setTimeout(function () { 
                    $('#map .popup').remove();
                }, 400);
            } else {
                if ($('div').is('#map .popup')) {
                    $('#map .popup').addClass('slide-out-left');
                    setTimeout(function () { 
                        $('#map .popup').remove();
                    }, 400);
                    setTimeout(function () { 
                        addPopup();
                        addClickFunc();
                    }, 600);
                } else {
                    addPopup();
                    addClickFunc();
                }
            }
        });
    }

window.menu = {
    addMenu: function (map, markers) {
        addMenu(map, markers);
    }
}
});