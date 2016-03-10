Telescope.menuItems.add("viewsMenu", {
  route: Posts.getRoute,
  name: 'map',
  label: 'map',
  description: 'map_view',
  viewTemplate: 'posts_map',
  order: 2,
});

Posts.views.add("map", function (terms) {
  // No sphere data is passed, return empty hash.
  if (!terms.sphere) {
      return {find: {_id: -1}};
  }
  // If sphere is passed, use it in querying Locations.
  return {
    find: {
      mapCoordinates: {$geoWithin: {$centerSphere: terms.sphere}}
    },
    options: {limit: 100, sort: {postedAt: -1}}
  };
});
