Template.post_body.helpers({
  domain: function(){
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.post_body.onRendered(function() {
  var self = this;
  this.autorun(function() {
    FlowRouter.watchPathChange();
    var data = Template.currentData();
    if (GoogleMaps.loaded()) {
      var canvas = self.$('.map-container').get(0);
      var geoJsonPoint = data.mapCoordinates;
      var markerLatLng = new google.maps.LatLng(geoJsonPoint.coordinates[1], geoJsonPoint.coordinates[0]);
      var mapOptions = {
        zoom: 17,
        center: markerLatLng,
        draggable: false,
        zoomControl: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        disableDefaultUI: true,
      };
      // Create map object.
      var map = new google.maps.Map(canvas, mapOptions);
      // Create marker.
      var marker = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: data.title,
        icon: assetsPath + 'logo-icon-marker.png',
        id: data._id,
      });
    }
  });
});
