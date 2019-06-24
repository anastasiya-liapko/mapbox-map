$(function () {
    var switchPopup = function (markerElem) {
        $('#map .hamburger').removeClass('is-active');

        if ($('div').is('#map .popup')) {
            $('#map .popup').addClass('slide-out-left');
            setTimeout(function () { 
                $('#map .popup').remove();
            }, 400);
            setTimeout(function () { 
                window.addPopupCity(markerElem);
            }, 600);
        } else {
            window.addPopupCity(markerElem);
        }
    };

    var flyTo = function (map, coordinates) {
        map.flyTo({
            center: coordinates,
            zoom: 10,
            bearing: 0,
            
            speed: 0.8,
            curve: 2,

            easing: function (t) { return t; }
        });
    };

    window.util = {
        switchPopup: function (markerElem) {
            switchPopup(markerElem);
        },
        flyTo: function (map, coordinates) {
            flyTo(map, coordinates);
        }
    }

});