$(function () {
    var switchPopup = function (markerElem) {
        $('#map .hamburger').removeClass('is-active');

        if ($('div').is('#map .popup')) {
            $('#map .popup').addClass('slide-out-left');
            setTimeout(function () { 
                $('#map .popup').remove();
            }, 400);
            setTimeout(function () { 
                window.card.addCard(markerElem);
            }, 600);
        } else {
            window.card.addCard(markerElem);
        }
    };

    var flyTo = function (map, coordinates) {
        map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: coordinates,
            zoom: 12,
            bearing: 0,
            
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.8, // make the flying slow
            curve: 2, // change the speed at which it zooms out
            
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
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