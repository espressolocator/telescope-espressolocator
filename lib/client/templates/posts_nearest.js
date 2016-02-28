Template.posts_nearest.helpers({
  arguments: function () {
    // Prepare posts filtering terms.
    FlowRouter.watchPathChange();
    var terms = _.clone(FlowRouter.current().queryParams);

    var coords = Geolocation.latLng() || { lat: 0, lng: 0 };

    var point = {
      type: "Point",
      coordinates: [coords.lng, coords.lat]
    };
    terms = _.extend(terms, {
      view: 'nearest',
      currentPosition: point,
    });

    var context = {
      terms: terms,
      options: {
        loadMoreBehavior: Settings.get("loadMoreBehavior", "button")
      }
    }
    return context;
  },
  locationReady: function () {
    var coords = Geolocation.latLng();
    var error = Geolocation.error();
    if (error) {
        if (error.code === 1) {
            Messages.flash(i18n.t('you_need_to_enable_geolocation'), "error");
        } else {
            Messages.flash(error.message, "error");
        }
    }
    return _.isObject(coords);
  }
});

