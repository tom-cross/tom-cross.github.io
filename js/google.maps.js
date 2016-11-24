/*--------------------------------------------------
Google Map
----------------------------------------------------*/
(function(){
  "use strict";

window.onload = function () {

var styles = [
    {
      stylers: [
        { hue: "#ff0000" },
        { saturation: -100 },
        { gamma: 0.5 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Gray Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var myLatlng = new google.maps.LatLng(53.120671, 18.001732); //coordinates--------------------------------------------------------
  var mapOptions = {
    zoom: 17,
    center: myLatlng,
    scrollwheel: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var contentString = '<div class="pt10">'+
      '<h1 class="title-section"><em>LUPA</em> Design Studio</h1>'+ //title-------------------------------------------
      '<p><b>LUPA Design Studio</b> Aenean fermentum eros nec posuere faucibus. Suspendisse accumsan ipsum magna, nec ullamcorper felis vestibulum id. Quisque suscipit lectus sed nibh ornare rhoncus.</p>'+ //description-------------------------------------
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"LUPA Design Studio"
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

}

})();
// (function() ends