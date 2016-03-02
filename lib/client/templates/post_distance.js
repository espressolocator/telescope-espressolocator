Template.post_distance.helpers({
  getDistance: function() {
    if (_.isObject(getLocation()) && GoogleMaps.loaded()) {
        var coords = getLocation();
        var currentLocation = new google.maps.LatLng(coords.lat, coords.lng);
        var postLocation = new google.maps.LatLng(this.mapCoordinates.coordinates[1], this.mapCoordinates.coordinates[0]);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, postLocation);
        var distanceInMiles = (distance / 1000 * 0.621371).toFixed(2);
        return distanceInMiles;
    }
    return null;
  }
});
