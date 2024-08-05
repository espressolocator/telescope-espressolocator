Meteor.startup(function () {
  // Init Googlemaps.
  var setup = {
    libraries: 'places,geometry',
    language: 'en',
    loading: 'async'
  };
  if (Meteor.settings.public.GoogleMapsKey) {
    setup.key = Meteor.settings.public.GoogleMapsKey;
  }
  GoogleMaps.load(setup);
});

locatorMapStyles = [{
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: 'off' }]
  },
];

addGeocomplete = function (searchNode, initProperties) {
  var defaultProperties = {
    map: ".map-container",
    detailsAttribute: "data-geo",
    mapOptions: {
      zoom: 17,
      scrollwheel: true,
      streetViewControl: false,
    },
    markerOptions: {
      draggable: true,
      icon: assetsPath + 'logo-icon-marker.png',
    },
    types: ['geocode', 'establishment']
  };

  var markerOpts = {
    'clickable': false,
    'cursor': 'pointer',
    'draggable': false,
    'flat': true,
    'icon': {
        'path': google.maps.SymbolPath.CIRCLE,
        'fillColor': '#4285F4',
        'fillOpacity': 1,
        'scale': 6,
        'strokeColor': 'white',
        'strokeWeight': 2,
    },
    'optimized': false,
    'title': 'Current location',
    'zIndex': 3
  };

  // Merge defaults and custom properties, initProperties should provide 'details' parameter at least.
  initProperties = _.extend(defaultProperties, initProperties);

  // Same style for all maps displayed.
  initProperties.mapOptions.styles = locatorMapStyles;

  // Initialise geocomplete.
  searchNode.geocomplete(initProperties);

  // Pick current location from the browser if it has not been specified.
  if (!initProperties.location) {
    Tracker.autorun(function (c) {
      var coords = getLocation();
      if (_.isObject(coords)) {
        // Position map.
        var currentLocation = new google.maps.LatLng(coords.lat, coords.lng);
        var map = searchNode.geocomplete("map");
        map.setCenter(currentLocation);

        // Add current location.
        markerOpts = _.extend(markerOpts, {position: currentLocation, map: map});
        var currentLocationMarker = new google.maps.Marker(markerOpts);

        // Add marker if it is enabled.
        var marker = searchNode.geocomplete("marker");
        if (marker) {
          marker.setPosition(currentLocation);
          searchNode.trigger("geocode:dragged", currentLocation);
        }
        c.stop();
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

getLocation = function () {
  Messages.clearSeen();
  var coords = Geolocation.latLng();
  var error = Geolocation.error();
  if (error) {
    if (error.code === 1) {
      Messages.flash(i18n.t('you_need_to_enable_geolocation'), "info");
    } else {
      console.error(error.message);
    }
    coords = {lat: 51.509865, lng: -0.118092}; //London
  } else {
    if (!Session.get("defaultView")) {
      Session.set("defaultView", 'nearest');
    }
  }
  return coords;
}

Template.registerHelper('isLocationReady', function () {
  var coords = Geolocation.latLng();
  return _.isObject(coords);
});
