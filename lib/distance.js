Telescope.menuItems.add("viewsMenu", {
  route: Posts.getRoute,
  name: 'distance',
  label: 'distance',
  description: 'distance_view',
  order: 1,
});

Posts.views.add("distance", function (terms) {
  var point = {
    type: "Point",
    coordinates: [-2.7878306000000066, 54.0302638]
  };
  return {
    find: {
      mapCoordinates: {$near:
        { $geometry: point,
          $maxDistance: 1000
        }
      }
    },
    options: {sort: {createdAt: -1}},
    showFuture: true
  };
});
