$(function () {
    var addPopupCity = function (markerElem, coordinates) {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.templateCity(markerElem));
        $('#map').append(fragment);
        
        $('.popup .popup__close').on('click', function () {
            var popup = $(this).closest('.popup');
            popup.addClass('slide-out-left');
            setTimeout(function () { 
                popup.remove();
            }, 500);
        })
    };

    window.addPopupCity = function (markerElem, coordinates) {
        addPopupCity(markerElem, coordinates);
    }
});