Template.posts_nearest.helpers({
  arguments: function () {
    // Prepare posts filtering terms.
    FlowRouter.watchPathChange();
    var terms = _.clone(FlowRouter.current().queryParams);

    var coords = getLocation();

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
  }
});

