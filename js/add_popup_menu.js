$(function () {
    var addMenu = function (map, markers) {

        var addBurger = function () {
            var hamburger = document.createElement('button');
            hamburger.setAttribute('class', 'hamburger hamburger--squeeze');
            hamburger.setAttribute('type', 'button');
            var box = document.createElement('span');
            box.setAttribute('class', 'hamburger-box');
            hamburger.appendChild(box);
            var inner = document.createElement('span');
            inner.setAttribute('class', 'hamburger-inner');
            box.appendChild(inner);

            $('#map').append(hamburger.outerHTML);
        };
        addBurger();

        var addPopup = function (coordinates) {
            var infowincontent = document.createElement('div');
            infowincontent.setAttribute('class', 'popup popup-menu');
            var list = document.createElement('ul');
            list.setAttribute('class', 'popup-menu__list');
            infowincontent.appendChild(list);
            $('#map').append(infowincontent.outerHTML);

            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var address = markerElem.getAttribute('address');
                var type = markerElem.getAttribute('type');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]
                if (parseInt(parentId) == 0) {
                    var listItem = document.createElement('li');
                    listItem.setAttribute('class', 'popup-menu__list-item');
                    var listItemLink = document.createElement('a');
                    listItemLink.setAttribute('class', 'popup-menu__list-link');
                    listItemLink.setAttribute('data-id', id);
                    // listItemLink.setAttribute('coords', point);
                    listItemLink.textContent = name;
                    listItem.appendChild(listItemLink);
                    var dropdownList = document.createElement('ul');
                    dropdownList.setAttribute('class', 'popup-menu__dropdown');
                    dropdownList.setAttribute('data-id', id);
                    listItem.appendChild(dropdownList);
                    $('.popup-menu__list').append(listItem.outerHTML);

                    $('.popup-menu__list-link[data-id="' + id + '"]').on('click', function (e) {
                        var dropdown = $(this).siblings();
                        if (dropdown.children().length !== 0) {
                            dropdown.slideDown();
                            $(this).on('click', function () {
                                window.util.switchPopup(markerElem);
                                window.util.flyTo(map, point);
                            })
                        } else {
                            window.util.switchPopup(markerElem);
                            window.util.flyTo(map, point);
                        }
                    })
                }
            });
    
            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]
                if (parseInt(parentId) !== 0) {
                    var dropdownItem = document.createElement('li');
                    dropdownItem.setAttribute('class', 'popup-menu__dropdown-item');
                    var dropdownLink = document.createElement('a');
                    dropdownLink.setAttribute('class', 'popup-menu__dropdown-link');
                    dropdownLink.textContent = name;
                    dropdownLink.setAttribute('data-id', id);
                    dropdownItem.appendChild(dropdownLink);
                    var dropdown = $('.popup-menu__dropdown[data-id="' + parentId + '"]');
                    dropdown.append(dropdownItem.outerHTML);

                    $('.popup-menu__dropdown-link[data-id="' + id + '"]').on('click', function () {
                        window.util.switchPopup(markerElem);
                        window.util.flyTo(map, point);
                    })
                }
            });
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
                    }, 600);
                } else {
                    addPopup();
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