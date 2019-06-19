<?php
require_once 'config.php';
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test maps</title>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { 
            margin: 0; 
            padding: 0;
        }
        #map { 
            position: relative;
            width: 100%; 
            height: 400px;
        }
        .label_place {
            text-align: center;
            padding: 3px;
            background: #b2eead;
            border: darkslategrey 5px solid;
            border-radius: 5px;
            width: 350px;
        }
        .notes_img {
            border: darkslategrey 2px solid;
            margin: 5px;
            border-radius: 5px;
            width: 90%;
            height: 100px;
            overflow: hidden;
        }
        /*.mapboxgl-popup {
            position: absolute;
            top: 0;
            left: 0;
            max-width: 400px;
            font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }*/
    </style>
</head>
<body>
    <h3>Maps Demo</h3>
    <div id='map'></div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
    <script type="text/javascript" src="add_markers.js"> </script>
    <script type="text/javascript" src="maps_logic.js"> </script>
</body>
</html>

