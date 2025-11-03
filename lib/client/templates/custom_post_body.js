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
        zoomControl: false,
        disableDefaultUI: true,
        clickableIcons: false,
        styles: locatorMapStyles,
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

      // Places.
      if (data.mapPlaceId) {
        var request = {
            placeId: data.mapPlaceId,
            fields: ['name', 'opening_hours', 'url', 'business_status']
        };

        var service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
            // Set open in Google Maps.
            self.$('.map-link a').attr('href', place.url);
            self.$('.map-link').show();
            // Set opening hours.
            var weekdayList = place.opening_hours.weekday_text.map((item) => '<li>'+item+'</li>');
            self.$('.hours-list').html(weekdayList);
            self.$('.opening-hours').show();
            //console.log(place);
            }
        }
      }
    }
  });
});
