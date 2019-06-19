$(function () {
    $.post('get_base.php', {map_params: 1}, function (msg) {
        var obj = jQuery.parseJSON(msg);
        let params = {lat: -56.857595, lng: 151.171936, zoom: 10};

        if (obj[0].lat !== undefined) {
            params = obj[0];
            console.log(params);

        }

        var uluru = {lat: params.lat, lng: params.lng};

        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXBrbyIsImEiOiJjangyenVmeGMwcTFjM3lvNGhsdmUzejRoIn0.zdJYMN5sxS2SJXZV2Lb3aA';

        var map = new mapboxgl.Map({
            container: 'map',
            // для изменения стилей 
            // https://studio.mapbox.com/styles/aliapko/cjx336vt21apr1cpadxu1ogcg/edit/#3.08/43.35/36.8

            // style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', // the outdoors-v10 style but without Hillshade layers
            // style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg',
            style: 'mapbox://styles/aliapko/cjx336vt21apr1cpadxu1ogcg/draft',
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
            // map.addSource('dem', {
            //     'type': 'raster-dem',
            //     'url': 'mapbox://mapbox.terrain-rgb'
            // });
            // map.addLayer({
            //     'id': 'hillshading',
            //     'source': 'dem',
            //     'type': 'hillshade'
            // }, 'waterway-river-canal-shadow');

            
            // $.each(styles, function (index, element) {
            //     map.setPaintProperty(element.layer, 'fill-color', element.color);
            // });

        downloadUrl('get_base.php', function (data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            // Array.prototype.forEach.call(markers, function (markerElem, i) {
            //     var id = markerElem.getAttribute('id');
            //     var name = markerElem.getAttribute('name');
            //     var address = markerElem.getAttribute('address');
            //     var type = markerElem.getAttribute('type');
            //     // var point = new google.maps.LatLng(
            //     //     parseFloat(markerElem.getAttribute('lat')),
            //     //     parseFloat(markerElem.getAttribute('lng'))
            //     // );
            //     var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]

                // var infowincontent = document.createElement('div');
                // infowincontent.setAttribute('class', 'label_place');
                // infowincontent.innerHTML = '<img src="images/s1200-3.jpeg" class="notes_img"/> <br/>';
                // var strong = document.createElement('strong');
                // strong.textContent = name;
                // infowincontent.appendChild(strong);
                // infowincontent.appendChild(document.createElement('br'));

                // var text = document.createElement('text');
                // text.textContent = address;
                // infowincontent.appendChild(text);
                // var pp = document.createElement('p');
                // pp.textContent = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому!' +
                //     'Есть даже ссылка чтоб про читать про это место еще больше.';
                // infowincontent.appendChild(pp);
                // var aa = document.createElement('a');
                // aa.setAttribute('target', '_blank');
                // aa.setAttribute('href', 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)');
                // aa.textContent = 'ЖМАКАТЬ ТУТ';
                // infowincontent.appendChild(aa);

                
                window.marker.addMarkers(map, markers);
            // });
            
        });



        });

    });

    function doNothing() {}
});