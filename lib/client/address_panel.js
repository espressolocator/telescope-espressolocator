initAddressPanel = function (panelNode) {
  panelNode.hide();
  // Create search input.
  var searchNode = $('<input type="text" id="inputGeocomplete"/>').insertBefore(panelNode);
  searchNode.attr('placeholder', _.partial(i18n.t, "specifyLocation"));

  // Create reset link.
  var resetNode = $('<a href="#"></a>');
  resetNode.text(_.partial(i18n.t, "resetLocation"));
  resetNode.prepend('<i class="fa fa-refresh fa-fw"></i>');
  resetNode.addClass('reset-location');
  panelNode.append(resetNode);

  // Bind geocoding result, show populated address panel.
  searchNode.bind("geocode:result", function(event, result) {
    console.log(result);
    panelNode.show();
    searchNode.hide();
  });

  // Process location reset.
  resetNode.bind("click", function(event) {
    searchNode.val('');
    searchNode.show();
    panelNode.hide();
    //Clear address fileds.
    panelNode.find('input').val(function() {
      return '';
    });
    return false;
  });

  return searchNode;
}
