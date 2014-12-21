"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map


$(document).ready(function() {
    var mapOptions = {
        center: {
            lat: 47.6,
            lng: -122.3
        },
        zoom: 13
    };

    var mapElem = document.getElementById('map');
    var map = new google.maps.Map(mapElem, mapOptions);

    var infoWindow = new google.maps.InfoWindow();

    var arr = [];

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            data.forEach(function(camera) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                arr.push({
                    camera: camera,
                    marker: marker
                });

                google.maps.event.addListener(marker, 'click', function() {
                    var imgURL = camera.imageurl.url;
                    var content = '<img src=\"' + imgURL + "\">";
                    infoWindow.setContent(content);
                    infoWindow.open(map, this);
                    map.panTo(marker.getPosition());
                });

            });

        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
        });

    var search;
    var label;

    $("#search").bind('search keyup', function() {
        search = document.getElementById('search').value.toLowerCase();
        for (var i = 0; i < arr.length; i++) {
            var location = arr[i].camera;
            var marker = arr[i].marker;
            label = location.cameralabel.toLowerCase();
            if (label.indexOf(search) == -1) {
                marker.setMap(null);
            } else {
                marker.setMap(map);
            }
        }
    });
});
