Template.post_submit.onRendered(function() {
  var self = this;
  var field = self.$("input[name='formattedAddress']");
  var searchNode = initAddressField(field);
  self.map = null;

  self.autorun(function() {
    if (GoogleMaps.loaded() && !self.map) {
      addGeocomplete(searchNode, {
        details: "#submitPostForm",
      });
      self.map = searchNode.geocomplete("map");
    }
  });
});
