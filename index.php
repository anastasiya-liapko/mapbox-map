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
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <h3>Maps Demo</h3>
    <div id='map'>
        <!-- <button class='hamburger' type='button'>
            <span class='hamburger-box'>
                <span class='hamburger-inner'></span>
            </span>
        </button> -->
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
    <script type="text/javascript" src="js/util.js"> </script>
    <script type="text/javascript" src="js/add_popup_card.js"> </script>
    <script type="text/javascript" src="js/add_markers.js"> </script>
    <script type="text/javascript" src="js/add_popup_menu.js"> </script>
    <script type="text/javascript" src="js/maps_logic.js"> </script>
</body>
</html>

