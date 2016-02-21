Template.posts_nearest.helpers({
  arguments: function () {
    // Prepare posts filtering terms.
    FlowRouter.watchPathChange();
    var terms = _.clone(FlowRouter.current().queryParams);

    var point = {
      type: "Point",
      coordinates: [-2.7878306000000066, 54.0302638]
    };
    terms = _.extend(terms, {
      currentPosition: point
    });

    console.log(terms);
    var context = {terms: terms}
    return context;
  }
});

