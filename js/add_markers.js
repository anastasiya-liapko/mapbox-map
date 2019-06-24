$(function () {
    var addMarkers = function (map, markers) {

        var geo = [];

        Array.prototype.forEach.call(markers, function (markerElem) {
            // var id = markerElem.getAttribute('id');
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            // var type = markerElem.getAttribute('type');
            var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))];
            
            var myGeoJSON = {};
            myGeoJSON.type = "Feature";

            myGeoJSON.geometry = {};
            myGeoJSON.geometry.type = "Point";
            myGeoJSON.geometry.coordinates = point;

            myGeoJSON.properties = {};
            myGeoJSON.properties.name = name;   
            myGeoJSON.properties.address = address;              

            geo.push(myGeoJSON);
        });

        map.addLayer({
            "id": 'point',
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geo
                }
            },
            "paint": {
                "circle-stroke-width": 10,
                "circle-stroke-opacity": 0,
                "circle-stroke-color": "#1a3646",
                "circle-color": "#54ecea",
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 3, 4, 6], 22, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 999, 23]]
            }
        });

        map.addLayer({
            "id": 'label',
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geo
                }
            },
            paint: {
                "text-color": "#54ecea",
                "text-translate": ["interpolate", ["exponential", 1.7], ["zoom"], 10, ["literal", [5, 4]], 15, ["literal", [14, 14]]]
            },
            layout: {
                "icon-image": "radar",
                "icon-size": {
                    base: 1,
                    stops: [[13, .4], [16, 1]]
                },
                "text-field": "{name}",
                "text-font": ["Roboto Black", "Arial Unicode MS Regular"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 6, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 11, 5, 28], 12, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 40, 5, 40]],
                "text-anchor": "top-left"
            }
        });

        map.on('click', 'point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            var name = e.features[0].properties.name;
            var address = e.features[0].properties.address;
            window.util.switchPopup([name, address]);
            window.util.flyTo(map, coordinates);
        });

        map.on('click', 'label', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            var name = e.features[0].properties.name;
            var address = e.features[0].properties.address;
            window.util.switchPopup([name, address]);
            window.util.flyTo(map, coordinates);
        });

        map.on('mouseenter', 'point', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'point', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'label', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'label', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    window.marker = {
        addMarkers: function (map, markers) {
            addMarkers(map, markers);
        }
    }
});