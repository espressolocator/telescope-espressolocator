initAddressField = function (fieldNode) {
  // Create search input.
  var searchNode = $('<input type="text" id="inputGeocomplete"/>').insertBefore(fieldNode);
  searchNode.attr('placeholder', _.partial(i18n.t, "specifyLocation"));

  // Create reset link.
  var resetNode = $('<a href="#"></a>').insertAfter(fieldNode);
  resetNode.text(_.partial(i18n.t, "resetLocation"));
  resetNode.prepend('<i class="fa fa-refresh fa-fw"></i>');
  resetNode.addClass('reset-location');

  // If we have value,
  if (fieldNode.val()) {
    searchNode.hide();
  } else {
    fieldNode.hide();
    resetNode.hide();
  }

  // Bind geocoding result, show populated address field.
  searchNode.bind("geocode:result", function(event, result) {
    fieldNode.show();
    resetNode.show();
    searchNode.hide();
  });

  // Process location reset.
  resetNode.bind("click", function(event) {
    searchNode.val('');
    searchNode.show();
    fieldNode.hide();
    resetNode.hide();
    fieldNode.val('');
    return false;
  });

  return searchNode;
}
