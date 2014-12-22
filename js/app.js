"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map

// json: https://data.seattle.gov/resource/82su-5fxf.json - My Neighborhoods
// json: https://data.seattle.gov/resource/raim-ay5x.json - Electrical Permits: Current
// json: https://data.seattle.gov/resource/vncn-umqp.json - Seattle Bike Racks

$(document).ready(function() {

    // sets the default map configurations
    var mapOptions = {
        center: {
            lat: 47.6,
            lng: -122.3
        },
        zoom: 13,

        // custom stylization and color for Google Maps
        styles: [
            {
                "featureType": "administrative.locality",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "color": "#cfcfcf"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    };

    var mapElem = document.getElementById('map');

    // Google Map initialization
    var map = new google.maps.Map(mapElem, mapOptions);

    // displays information window on marker click
    var infoWindow = new google.maps.InfoWindow();

    var arr = [];
    var heatMapData = [];

    // parses JSON data to retrieve geographical information and display on the map
    $.getJSON('https://data.seattle.gov/resource/vncn-umqp.json')
        .done(function(data) {
            data.forEach(function(place) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(place.latitude),
                        lng: Number(place.longitude)
                    },
                    map: map,
                    icon: 'img/flag_marker.png',
                    animation: google.maps.Animation.DROP
                });

                arr.push({
                    place: place,
                    marker: marker
                });
                heatMapData.push({
                    location: new google.maps.LatLng(Number(place.latitude), Number(place.longitude))
                });

                // event listener to display HTML content on click
                google.maps.event.addListener(marker, 'click', function() {
                    var website_url = place.website.url;
                    var address = place.address;
                    var city_feature = place.city_feature;
                    var common_name = place.common_name;
                    //var content = '<img src=\"' + imgURL + "\">";

                    //infoWindow.setContent(content);
                    infoWindow.open(map, this);
                    map.panTo(marker.getPosition());
                });
            });
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatMapData
            });
            heatmap.setMap(map);
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
        });

    var search;
    var label;

    // binds search to model to update map and content
    $("#search").bind('search keyup', function() {
        search = document.getElementById('search').value.toLowerCase();
        for (var i = 0; i < arr.length; i++) {
            var location = arr[i].place;
            var marker = arr[i].marker;
            label = location.unitdesc.toLowerCase();
            if (label.indexOf(search) == -1) {
                marker.setMap(null);
            } else {
                marker.setMap(map);
            }
        }
    });

    $("#fair").click(function() {
        alert('now filtering by fair conditioned racks');
    });

    $("#good").click(function() {
        alert('now filtering by good conditioned racks');
    });

    $("#poor").click(function() {
        alert('now filtering by poorly conditioned racks');
    });

});




















//
//
//"use strict";
//
////put your code here to create the map, fetch the list of traffic cameras
////and add them as markers on the map
//
//// json: https://data.seattle.gov/resource/82su-5fxf.json - My Neighborhoods
//
//$(document).ready(function() {
//    var mapOptions = {
//        center: {
//            lat: 47.6,
//            lng: -122.3
//        },
//        zoom: 13
//    };
//
//    var mapElem = document.getElementById('map');
//    var map = new google.maps.Map(mapElem, mapOptions);
//
//    var infoWindow = new google.maps.InfoWindow();
//
//    var arr = [];
//
//    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
//        .done(function(data) {
//            data.forEach(function(camera) {
//                var marker = new google.maps.Marker({
//                    position: {
//                        lat: Number(camera.location.latitude),
//                        lng: Number(camera.location.longitude)
//                    },
//                    map: map,
//                    animation: google.maps.Animation.DROP
//                });
//
//                arr.push({
//                    camera: camera,
//                    marker: marker
//                });
//
//                google.maps.event.addListener(marker, 'click', function() {
//                    var imgURL = camera.imageurl.url;
//                    var content = '<img src=\"' + imgURL + "\">";
//                    infoWindow.setContent(content);
//                    infoWindow.open(map, this);
//                    map.panTo(marker.getPosition());
//                });
//
//            });
//
//        })
//        .fail(function(error) {
//            console.log(error);
//        })
//        .always(function() {
//        });
//
//    var search;
//    var label;
//
//    $("#search").bind('search keyup', function() {
//        search = document.getElementById('search').value.toLowerCase();
//        for (var i = 0; i < arr.length; i++) {
//            var location = arr[i].camera;
//            var marker = arr[i].marker;
//            label = location.cameralabel.toLowerCase();
//            if (label.indexOf(search) == -1) {
//                marker.setMap(null);
//            } else {
//                marker.setMap(map);
//            }
//        }
//    });
//});
