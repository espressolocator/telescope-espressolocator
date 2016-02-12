Template.posts_map.onRendered(function() {
  var self = this;

  this.autorun(function(c) {
    if (GoogleMaps.loaded()) {
      var searchNode = self.$(".search-locations-input");
      var mapProperties = {
        map: self.$('.map-container'),
        mapOptions: {
          zoom: 12,
          minZoom: 9,
          scrollwheel: true,
          streetViewControl: false
        },
        markerOptions: {
          disabled: true
        },
        types: ['(regions)']
      };
      addGeocomplete(searchNode, mapProperties);
      c.stop();
    }
  });
});


Template.posts_map.onCreated(function() {
  // Init Googlemaps.
  GoogleMaps.load({
    libraries: 'places'
  });
});
