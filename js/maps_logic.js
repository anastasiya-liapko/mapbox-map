$(function () {
    $.post('get_base.php', {map_params: 1}, function (msg) {
        var obj = jQuery.parseJSON(msg);
        let params = {lat: -56.857595, lng: 151.171936, zoom: 10};

        if (obj[0].lat !== undefined) {
            params = obj[0];
        }

        var uluru = {lat: params.lat, lng: params.lng};

        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

        var map = new mapboxgl.Map({
            container: 'map',
            // для изменения стилей 
            // https://studio.mapbox.com/styles/aliapko/cjx336vt21apr1cpadxu1ogcg/edit/#3.08/43.35/36.8

            // style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', // the outdoors-v10 style but without Hillshade layers
            style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg',
            // style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg/draft',
            center: uluru,
            zoom: params.zoom
        });


        function downloadUrl(url, callback) {
            var request = window.ActiveXObject ?
                new ActiveXObject('Microsoft.XMLHTTP') :
                new XMLHttpRequest;

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    request.onreadystatechange = doNothing;
                    callback(request, request.status);
                }
            };

            request.open('GET', url, true);
            request.send(null);
        }
        

        map.on('load', function () {
            downloadUrl('get_base.php', function (data) {
                var xml = data.responseXML;
                var markers = xml.documentElement.getElementsByTagName('marker');
                window.menu.addMenu(map, markers);
                window.marker.addMarkers(map, markers);
            });
        });

    });

    function doNothing() {}
});