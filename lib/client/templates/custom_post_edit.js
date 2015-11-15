Template.post_edit.onRendered(function() {
  var self = this;
  this.autorun(function(c) {
    if (GoogleMaps.loaded()) {
      //var searchNode = self.$("#mapsearch");
      //var latlng = AutoForm.getFieldValue('location', 'editLocationForm').coordinates.reverse();
      //addGeocomplete(searchNode, {
      //  details: "#editLocationForm",
      //  location: new google.maps.LatLng(latlng[0], latlng[1])
      //});
      //c.stop();
    }
  });
});

Template.post_edit.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

