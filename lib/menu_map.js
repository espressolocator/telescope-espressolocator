Telescope.menuItems.add("viewsMenu", {
  route: Posts.getRoute,
  name: 'map',
  label: 'map',
  description: 'map_view',
  viewTemplate: 'posts_map'
});

Posts.views.add("map", function (terms) {
  // No sphere data is passed, return empty hash.
  if (!terms.sphere) {
      return {};
  }
  // If sphere is passed, use it in querying Locations.
  return {
    find: {
      mapCoordinates: {$geoWithin: {$centerSphere: terms.sphere}}
    },
    options: {sort: {postedAt: -1}}
  };
});
