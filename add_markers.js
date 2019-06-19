$(function () {
    var addMarkers = function (map, markers) {

        Array.prototype.forEach.call(markers, function (markerElem, i) {
            var id = markerElem.getAttribute('id');
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            var type = markerElem.getAttribute('type');
            // var point = new google.maps.LatLng(
            //     parseFloat(markerElem.getAttribute('lat')),
            //     parseFloat(markerElem.getAttribute('lng'))
            // );
            var point = [parseFloat(markerElem.getAttribute('lng')), parseFloat(markerElem.getAttribute('lat'))]
        // map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
        //     if (error) throw error;
        //     map.addImage('cat' + number, image);
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

            map.on('click', 'point' + i, function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                // new mapboxgl.Popup()
                //     .setLngLat(coordinates)
                //     .setHTML(description)
                //     .addTo(map);

                var infowincontent = document.createElement('div');
                infowincontent.setAttribute('class', 'label_place');
                infowincontent.innerHTML = '<img src="images/s1200-3.jpeg" class="notes_img"/> <br/>';
                var strong = document.createElement('strong');
                strong.textContent = name;
                infowincontent.appendChild(strong);
                infowincontent.appendChild(document.createElement('br'));

                var text = document.createElement('text');
                text.textContent = address;
                infowincontent.appendChild(text);
                var pp = document.createElement('p');
                pp.textContent = 'Много много текста про какой то не понятный но очень крутой и известный во всём мире город. Об этом городе нужно узнать всем людям по любому!' +
                    'Есть даже ссылка чтоб про читать про это место еще больше.';
                infowincontent.appendChild(pp);
                var aa = document.createElement('a');
                aa.setAttribute('target', '_blank');
                aa.setAttribute('href', 'https://ru.wikipedia.org/wiki/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B9_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_%D0%97%D0%B5%D0%BC%D0%BB%D0%B8_(%D0%BF%D0%B5%D1%81%D0%BD%D1%8F)');
                aa.textContent = 'ЖМАКАТЬ ТУТ';
                infowincontent.appendChild(aa);
            });

            // map.on('click', 'label' + i, function (e) {
            //     var coordinates = e.features[0].geometry.coordinates.slice();
            //     var description = e.features[0].properties.description;
                 
            //     // Ensure that if the map is zoomed out such that multiple
            //     // copies of the feature are visible, the popup appears
            //     // over the copy being pointed to.
            //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            //     }
                 
            //     new mapboxgl.Popup()
            //         .setLngLat(coordinates)
            //         .setHTML(description)
            //         .addTo(map);
            // });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'point' + i, function () {
                map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'point' + i, function () {
                map.getCanvas().style.cursor = '';
            });

            map.on('mouseenter', 'label' + i, function () {
                map.getCanvas().style.cursor = 'pointer';
            });
             
            map.on('mouseleave', 'label' + i, function () {
                map.getCanvas().style.cursor = '';
            });
        });
    // });
    }

    window.marker = {
        addMarkers: function (map, markers) {
            addMarkers(map, markers);
        }
    }
});