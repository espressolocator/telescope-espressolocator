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

      // If we have some cooridantes stored from previous page visit, use
      // them.
      var lastposition = Session.get('lastposition');
      if (lastposition) {
        mapProperties.location = lastposition.center;
        mapProperties.mapOptions.zoom = lastposition.zoom;
      }

      addGeocomplete(searchNode, mapProperties);

      // Map idle state listener. It is useful to track the end of any map
      // action such as zoom or repositioning. Once user is finished with
      // map action we update search result and markers.
      var map = searchNode.geocomplete("map");
      google.maps.event.addListener(map, 'idle', function() {
        // Get current map bounds, calculate centerSphere mongo notation and save in reactive
        // variable that will trigger subscription update.
        var bounds = map.getBounds();
        var center = map.getCenter();
        if (bounds && center) {
          var ne = bounds.getNorthEast();
          var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
          var centerSphere = [[center.lng(), center.lat()], radius / 1000 / 6371];
          self.mapCenterSphere.set(centerSphere);
        }
        // Store the last map position and zoom level in the session variable.
        if (center) {
          Session.set('lastposition', { center: [center.lat(), center.lng()], zoom: map.getZoom() });
        }
      });
      c.stop();
    }
  });
});


Template.posts_map.onCreated(function() {
  // Init Googlemaps.
  GoogleMaps.load({
    libraries: 'places,geometry'
  });

  // Declare markers array.
  var markers = {};
 // Init reactive vars.
  var self = this;
  self.mapCenterSphere = new ReactiveVar(null);

  self.autorun(function () {
    if (GoogleMaps.loaded()) {
      // Prepare posts filtering terms.
      FlowRouter.watchPathChange();
      var terms = _.clone(FlowRouter.current().queryParams);
      terms = _.extend(terms, {
        view: "map",
        sphere: self.mapCenterSphere.get()
      });

      // Subscribe to the postsList publication and limit results to
      // what is on the current map view.
      var postsSubscription = self.subscribe('postsList', terms);
      if (postsSubscription.ready()) {
        // If at least one cafe avialable, add marker.
        if (self.posts().count()) {
          var map = self.$('.search-locations-input').geocomplete("map");
          // Iterate through found posts.
          self.posts().forEach(function(post) {
            // See if we already have marker on the map.
            if (!markers[post._id]) {
              var latLng = new google.maps.LatLng(post.mapCoordinates.coordinates[1], post.mapCoordinates.coordinates[0]);
              // Create marker.
              var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: post.title,
                icon: assetsPath + 'logo-icon-marker.png',
                id: post._id
              });
              // Add marker to markers array, so we do not recreate it in future.
              markers[post._id] = marker;
            }
          });
        }
      }
    }
  });

  // Posts cursor.
  self.posts = function() {
    return Posts.find();
  }
});
