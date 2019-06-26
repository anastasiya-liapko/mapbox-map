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
        var zoomValue = map.getZoom();

        zoomValue = zoomValue <= 10 ? 10 : zoomValue;

        map.flyTo({
            center: coordinates,
            zoom: zoomValue,
            bearing: 2,
            
            // speed: 0.8,
            speed: 2,
            curve: 1,

            easing: function (t) { return t; }
        });
    };

    var switchLayer = function (map, zoomValue) {
        if (zoomValue >= 10) {
            map.setLayoutProperty('city', 'visibility', 'none');
            map.setLayoutProperty('point', 'visibility', 'visible');
        } else {
            map.setLayoutProperty('point', 'visibility', 'none');
            map.setLayoutProperty('city', 'visibility', 'visible');
        }
    }

    window.util = {
        switchPopup: function (markerElem) {
            switchPopup(markerElem);
        },
        flyTo: function (map, coordinates) {
            flyTo(map, coordinates);
        },
        switchLayer: function (map, zoomValue) {
            switchLayer(map, zoomValue);
        }
    }

});