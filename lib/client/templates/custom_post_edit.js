Template.post_edit.onRendered(function() {
  var self = this;
  this.autorun(function(c) {
    if (GoogleMaps.loaded()) {
      var searchNode = self.$("input[name='address']");
      var latlng = AutoForm.getFieldValue('mapCoordinates', 'editPostForm').coordinates.reverse();
      addGeocomplete(searchNode, {
        details: "#editPostForm",
        location: new google.maps.LatLng(latlng[0], latlng[1])
      });
      c.stop();
    }
  });
});

Template.post_edit.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

