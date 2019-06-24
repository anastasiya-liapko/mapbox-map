$(function () {
    var addMenu = function (map, markers) {

        // var addBurger = function () {
        //     var fragment = document.createDocumentFragment();
        //     var template = document.querySelector('#js-templateHamburger').content.querySelector('.hamburger');
        //     var templateElement = template.cloneNode(true);
        //     fragment.appendChild(templateElement);
        //     $('#map').append(fragment);
        // };
        // addBurger();
        $('#js-mapHamburger').show();

        var addPopup = function (coordinates) {
            // var infowincontent = document.createElement('div');
            // infowincontent.setAttribute('class', 'popup popup-menu');
            // var list = document.createElement('ul');
            // list.setAttribute('class', 'popup-menu__list');
            // infowincontent.appendChild(list);
            // $('#map').append(infowincontent.outerHTML);
            var fragmentMenu = document.createDocumentFragment();
            var template = document.querySelector('#js-templatePopupMenu').content.querySelector('.popup');
            var templateElement = template.cloneNode(true);
            fragmentMenu.appendChild(templateElement);
            
            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var address = markerElem.getAttribute('address');
                // var type = markerElem.getAttribute('type');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]

                if (parseInt(parentId) == 0) {
                    // var listItem = document.createElement('li');
                    // listItem.setAttribute('class', 'popup-menu__list-item');
                    // var listItemLink = document.createElement('a');
                    // listItemLink.setAttribute('class', 'popup-menu__list-link');
                    // listItemLink.setAttribute('data-id', id);
                    var fragmentMenuItem = document.createDocumentFragment();
                    fragmentMenuItem.appendChild(window.templateMenu([name, address, id, point]));
                    fragmentMenu.querySelector('.popup-menu__list').append(fragmentMenuItem);
                    
                //     listItemLink.textContent = name;
                //     listItem.appendChild(listItemLink);
                //     var dropdownList = document.createElement('ul');
                //     dropdownList.setAttribute('class', 'popup-menu__dropdown');
                //     dropdownList.setAttribute('data-id', id);
                //     listItem.appendChild(dropdownList);
                //     $('.popup-menu__list').append(listItem.outerHTML);

                    // $('.popup-menu__list-link[data-id="' + id + '"]').on('click', function (e) {
                    //     var dropdown = $(this).siblings();
                    //     if (dropdown.children().length !== 0) {
                    //         dropdown.slideDown();
                    //         $(this).on('click', function () {
                    //             window.util.switchPopup([name, address]);
                    //             window.util.flyTo(map, point);
                    //         })
                    //     } else {
                    //         window.util.switchPopup([name, address]);
                    //         window.util.flyTo(map, point);
                    //     }
                    // })

                }
            });

            $('#map').append(fragmentMenu);
    
            Array.prototype.forEach.call(markers, function (markerElem, i) {
                var id = markerElem.getAttribute('id');
                var parentId = markerElem.getAttribute('parentId');
                var name = markerElem.getAttribute('name');
                var address = markerElem.getAttribute('address');
                var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))];

                if (parseInt(parentId) !== 0) {
                    var dropdownItem = document.createElement('li');
                    dropdownItem.setAttribute('class', 'popup-menu__dropdown-item');
                    var dropdownLink = document.createElement('a');
                    dropdownLink.setAttribute('class', 'popup-menu__dropdown-link');
                    dropdownLink.textContent = name;
                    dropdownLink.setAttribute('data-id', id);
                    dropdownLink.setAttribute('data-point', point);
                    dropdownLink.setAttribute('data-address', address);
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

                var dropdown = $(this).siblings();
                if (dropdown.children().length !== 0) {
                    dropdown.slideDown();
                    $(this).on('click', function () {
                        window.util.switchPopup([name, address]);
                        window.util.flyTo(map, point);
                    })
                } else {
                    window.util.switchPopup([name, address]);
                    window.util.flyTo(map, point);
                }
            });

            $('#map .popup-menu__dropdown-link').on('click', function () {
                var name = $(this).text();
                var address = $(this).attr('data-address');
                var point = $(this).attr('data-point').split(',');
                window.util.switchPopup([name, address]);
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