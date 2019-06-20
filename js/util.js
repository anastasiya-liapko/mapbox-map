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
    }

    window.util = {
        switchPopup: function (markerElem) {
            switchPopup(markerElem);
        }
    }

});