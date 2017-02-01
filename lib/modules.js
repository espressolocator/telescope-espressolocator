// Remove modules that are not needed.
Telescope.modules.remove("postHeading", 'post_domain');
Telescope.modules.remove("postMeta", 'post_author');
Telescope.modules.remove("postMeta", 'post_info');
Telescope.modules.remove("postThumbnail", 'post_thumbnail');
Telescope.modules.remove("postComponents", 'post_rank');

// Add modules.
Telescope.modules.add("postMeta", [
  {
    template: 'post_distance',
    order: 10
  },
]);

Telescope.modules.add("mobileNav", {
  template: 'version',
  order: 100
});
