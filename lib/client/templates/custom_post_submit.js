Template.post_submit.onRendered(function() {
  var self = this;
  var panel = self.$("input[name='address.address1']").closest(".panel");
  var searchNode = initAddressPanel(panel);

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

