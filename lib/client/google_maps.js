Meteor.startup(function () {
  // Init Googlemaps.
  GoogleMaps.load({
    libraries: 'places,geometry'
  });

  // Init Geolocation.
  Geolocation.latLng();
});

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

  // Pick current location from the browser or default to London.
  var coords = Geolocation.latLng() || { lat: 0, lng: 0 };
  if (!initProperties.location) {
    // Position map.
    var currentLocation = new google.maps.LatLng(coords.lat, coords.lng);
    var map = searchNode.geocomplete("map");
    map.setCenter(currentLocation);
    // Add marker if it is enabled.
    var marker = searchNode.geocomplete("marker");
    if (marker) {
      marker.setPosition(currentLocation);
      searchNode.trigger("geocode:dragged", currentLocation);
    }
  }

  // Bind marker dragging updates if details form exist.
  if (initProperties.details) {
    searchNode.bind("geocode:dragged", function(event, latLng) {
      $("input[data-geo=lat]").val(latLng.lat());
      $("input[data-geo=lng]").val(latLng.lng());
    });
  }
}

locationReady = function (disabledErrorMessage) {
  var coords = Geolocation.latLng();
  var error = Geolocation.error();
  if (error) {
    if (error.code === 1) {
      Messages.flash(disabledErrorMessage, "error");
    } else {
      Messages.flash(error.message, "error");
    }
  }
  return _.isObject(coords);
}
