Telescope.menuItems.add("viewsMenu", {
  route: Posts.getRoute,
  name: 'nearest',
  label: 'nearest',
  description: 'nearest_view',
  viewTemplate: 'posts_nearest',
  order: 1,
});

Posts.views.add("nearest", function (terms) {
  // In case no current postion is provided.
  if (!terms.currentPosition) {
    return {find: {_id: -1}};
  }

  return {
    find: {
      mapCoordinates: {$near: {$geometry: terms.currentPosition}}
    },
    options: {sort: {}},
    showFuture: true
  };
});
