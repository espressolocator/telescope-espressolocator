Template.post_submit.onRendered(function() {
  var self = this;
  this.autorun(function(c) {
    if (GoogleMaps.loaded()) {
      var searchNode = self.$("input[name='address']");
      addGeocomplete(searchNode, {
        details: "#submitPostForm",
      });
      c.stop();
    }
  });
});

Template.post_submit.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places'
  });
});

