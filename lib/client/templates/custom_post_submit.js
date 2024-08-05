Template.post_submit.onRendered(function() {
  var self = this;
  var field = self.$("input[name='title']");
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

  var user = Meteor.user();
  var postCount =  Users.getSetting(user, 'postCount', 0);
  if (postCount == 0) {
    Messages.flash(i18n.t('please_check_guidelines'), 'info');
  }
});
