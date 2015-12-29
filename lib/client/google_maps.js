addGeocomplete = function (searchNode, initProperties) {
  var defaultProperties = {
    map: ".map-container",
    detailsAttribute: "data-geo",
    mapOptions: {
      zoom: 17,
      scrollwheel: true,
      streetViewControl: false
    },
    markerOptions: {
      draggable: true,
      icon: assetsPath + 'logo-icon-marker.png',
    },
    types: ['geocode', 'establishment']
  };
  // Merge defaults and custom properties, initProperties should provide 'details' parameter at least.
  initProperties = _.extend(defaultProperties, initProperties);

  // Initialise geocomplete.
  searchNode.geocomplete(initProperties);

  // Pick current location from the browser.
  if (!initProperties.location && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Position map.
      var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var map = searchNode.geocomplete("map");
      map.setCenter(currentLocation);
      // Add marker if it is enabled.
      var marker = searchNode.geocomplete("marker");
      if (marker) {
        marker.setPosition(currentLocation);
        searchNode.trigger("geocode:dragged", currentLocation);
      }
    });
  }

  // Bind marker dragging updates if details form exist.
  if (initProperties.details) {
    searchNode.bind("geocode:dragged", function(event, latLng) {
      $("input[data-geo=lat]").val(latLng.lat());
      $("input[data-geo=lng]").val(latLng.lng());
    });
  }
}
