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
    <div id="map">
        <button id="js-mapHamburger" class="hamburger hamburger--squeeze" type="button" style="display: none">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
    </div>

    <!-- <template id="js-templateHamburger" style="display: none">
        <button class="hamburger hamburger--squeeze" type="button">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
    </template> -->

    <template id="js-templatePopupMenu" style="display: none">
        <div class="popup popup-menu">
            <ul class="popup-menu__list"></ul>
        </div>
    </template>

    <template id="js-templatePopupMenuItem" style="display: none">
        <li class="popup-menu__list-item">
            <a class="popup-menu__list-link" data-id="" data-point="" data-address=""></a>
            <ul class="popup-menu__dropdown" data-id=""></ul>
        </li>
    </template>

    <template id="js-templatePopupMenuDropdownItem" style="display: none">
        <li class="popup-menu__dropdown-item">
            <a class="popup-menu__dropdown-link" data-id="" data-point="" data-address=""></a>
        </li>
    </template>

    <template id="js-templatePopupCity" style="display: none">
        <div class="popup popup-city">
            <span class="popup__close"></span>
            <img src="images/s1200-3.jpeg" class="popup__img"/> <br/>
            <strong class="popup__name"></strong> <br/>
            <span class="popup__address"></span>
            <p class="popup__descr"></p>
            <a href="" class="popup__more" target="_blank"></a>
        </div>
    </template>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>
    <script type="text/javascript" src="js/fill_template_popup_city.js"> </script>
    <script type="text/javascript" src="js/fill_template_popup_menu.js"> </script>
    <script type="text/javascript" src="js/add_popup_city.js"> </script>
    <script type="text/javascript" src="js/add_popup_menu.js"> </script>
    <script type="text/javascript" src="js/util.js"> </script>
    <script type="text/javascript" src="js/add_markers.js"> </script>
    <script type="text/javascript" src="js/maps_logic.js"> </script>
</body>
</html>

