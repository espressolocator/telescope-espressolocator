Template.posts_nearest.helpers({
  arguments: function () {
    // Prepare posts filtering terms.
    FlowRouter.watchPathChange();
    var terms = _.clone(FlowRouter.current().queryParams);

    var point = {
      type: "Point",
      coordinates: [-2.7879231, 54.030293699999994]
    };
    terms = _.extend(terms, {
      view: 'nearest',
      currentPosition: point,
    });

    console.log(terms);
    var context = {
      terms: terms,
      options: {
        loadMoreBehavior: Settings.get("loadMoreBehavior", "button")
      }
    }
    return context;
  }
});

