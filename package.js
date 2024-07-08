Package.describe({
  summary: 'Telescope EspressoLocator Webapp package',
  version: '1.0.5-beta',
  name: 'espressolocator:telescope-espressolocator',
  git: 'https://github.com/espressolocator/telescope-espressolocator'
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'telescope:core',
    'espressolocator:autoform-geojson-point',
    'jeremy:geocomplete',
    'espressolocator:googlemaps-js-info-bubble',
    'mdg:geolocation',
  ], ['client', 'server']);
  api.imply(['dburles:google-maps']);

  // i18n config (must come first)
  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  // client & server

  api.addFiles([
    'lib/custom_fields.js',
    'lib/modules.js',
    'lib/menu_nearest.js',
    'lib/menu_map.js',
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/post_time.html',
    'lib/client/templates/post_distance.html',
    'lib/client/templates/post_distance.js',
    'lib/client/templates/post_address.html',
    'lib/client/templates/custom_post_title.html',
    'lib/client/templates/custom_post_categories.html',
    'lib/client/templates/custom_post_body.html',
    'lib/client/templates/custom_post_body.js',
    'lib/client/templates/custom_post_edit.js',
    'lib/client/templates/custom_post_submit.js',
    'lib/client/templates/custom_views_menu.html',
    'lib/client/templates/custom_submit_button.html',
    'lib/client/templates/custom_footer_code.html',
    'lib/client/templates/custom_footer_code.js',
    'lib/client/templates/posts_map.html',
    'lib/client/templates/posts_map.js',
    'lib/client/templates/posts_nearest.html',
    'lib/client/templates/posts_nearest.js',
    'lib/client/templates/posts_map_info_bubble.html',
    'lib/client/templates/autoform_map_coordinates.html',
    'lib/client/templates/version.html',
    'lib/client/stylesheets/custom.scss',
    'lib/client/stylesheets/iubenda.scss',
    'lib/client/custom_templates.js',
    'lib/client/google_maps.js',
    'lib/client/address_panel.js',
    'lib/client/assets.js',
    'lib/client/version.js',
    'lib/client/main.js',
  ], ['client']);

  // server

  api.addFiles([
    'lib/server/templates/custom_emailPostItem.handlebars'
  ], ['server']);

  // i18n languages (must come last)

  api.addFiles([
    'i18n/en.i18n.json'
  ], ['client', 'server']);

  // static fles
  api.addAssets([
    'assets/logo-icon-marker.png',
    'assets/logo-full-transparent.png',
    'assets/favicon.ico',
    'assets/touch-icon-180.png',
    'assets/touch-icon-192.png',
    'assets/manifest.json',
    'assets/ipguide/ipguide1.png',
    'assets/ipguide/ipguide2.png',
    'assets/ipguide/ipguide3.png',
    'assets/ipguide/ipguide4.png',
    'assets/ipguide/ipguide5.png',
    'assets/ipguide/shareicon.png',
  ], ['client']);

});
