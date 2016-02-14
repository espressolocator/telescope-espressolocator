Telescope.menuItems.add("viewsMenu", {
  route: Posts.getRoute,
  name: 'map',
  label: 'map',
  description: 'map_view',
  viewTemplate: 'posts_map'
});

Posts.views.add("map", function (terms) {
  // No boulds are passed, return empty hash.
  if (!terms.bounds) {
      return {};
  }
  // If bounds are passed, create Polygon notation and query Locations.
  var polygon = {
    type: "Polygon",
    coordinates: [terms.bounds]
  };
  return {
    find: {
      mapCoordinates: {$geoWithin: {$geometry: polygon}}
    },
    options: {sort: {postedAt: -1}}
  };
});
