Template.post_edit.onRendered(function() {
  var self = this;
  this.autorun(function(c) {
    if (GoogleMaps.loaded() && typeof AutoForm.getFieldValue('mapCoordinates', 'editPostForm') !== 'undefined') {
      var searchNode = self.$("#inputGeocomplete");
      var geoJsonPoint = AutoForm.getFieldValue('mapCoordinates', 'editPostForm');
      var geocompleteInit = {
        details: "#editPostForm",
        // Default order of coordinates in geoJsonPoint is Lng,Lat.
        'location': new google.maps.LatLng(geoJsonPoint.coordinates[1], geoJsonPoint.coordinates[0]),
      }
      addGeocomplete(searchNode, geocompleteInit);
      c.stop();
    }
  });
});

Template.post_edit.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

