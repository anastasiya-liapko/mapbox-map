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
                var descr = markerElem.getAttribute('descr');
                var more = markerElem.getAttribute('descrLink');
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
                var descr = markerElem.getAttribute('descr');
                var more = markerElem.getAttribute('descrLink');
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
                        window.util.flyTo(map, point);
                    })
                } else {
                    window.util.switchPopup([name, address, descr, more, img]);
                    window.util.flyTo(map, point);
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
                window.util.flyTo(map, point);
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