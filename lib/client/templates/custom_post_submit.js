Template.post_submit.onRendered(function() {
  var self = this;
  var field = self.$("input[name='formattedAddress']");
  var searchNode = initAddressField(field);

  this.autorun(function(c) {
    if (GoogleMaps.loaded()) {
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

