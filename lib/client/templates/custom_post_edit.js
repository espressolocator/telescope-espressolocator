Template.post_edit.onRendered(function() {
  var self = this;
  this.autorun(function(c) {
    if (GoogleMaps.loaded() && typeof AutoForm.getFieldValue('mapCoordinates', 'editPostForm') !== 'undefined') {
      var geoJsonPoint = AutoForm.getFieldValue('mapCoordinates', 'editPostForm');
      var geocompleteInit = {
        details: "#editPostForm",
        // Default order of coordinates in geoJsonPoint is Lng,Lat.
        'location': new google.maps.LatLng(geoJsonPoint.coordinates[1], geoJsonPoint.coordinates[0]),
      }
      var field = self.$("input[name='formattedAddress']");
      var searchNode = initAddressField(field);
      addGeocomplete(searchNode, geocompleteInit);
      c.stop();
    }
  });
});
