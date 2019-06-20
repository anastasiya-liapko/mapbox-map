$(function () {
    var addMarkers = function (map, markers) {

        Array.prototype.forEach.call(markers, function (markerElem, i) {
            var id = markerElem.getAttribute('id');
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            var type = markerElem.getAttribute('type');
            var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]
            map.addLayer({
                "id": 'point' + i,
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": point
                            }
                        }]
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
                id: "label" + i,
                type: "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": point
                            }
                        }]
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
                    "text-field": name,
                    "text-font": ["Roboto Black", "Arial Unicode MS Regular"],
                    "text-size": ["interpolate", ["linear"], ["zoom"], 6, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 11, 5, 28], 12, ["interpolate", ["exponential", 1], ["number", ["get", "children"]], 1, 40, 5, 40]],
                    "text-anchor": "top-left"
                }
            });

            map.on('click', 'label' + i, function () {
                window.util.switchPopup(markerElem);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'label' + i, function () {
                map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'label' + i, function () {
                map.getCanvas().style.cursor = '';
            });
        });
    }

    window.marker = {
        addMarkers: function (map, markers) {
            addMarkers(map, markers);
        }
    }
});