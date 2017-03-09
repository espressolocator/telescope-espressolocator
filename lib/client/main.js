Meteor.startup(function () {
  // Make app mobile-friendly.
  DocHead.addMeta({name: "apple-mobile-web-app-capable", content: "yes"});
  DocHead.addMeta({name: "mobile-web-app-capable", content: "yes"});
  DocHead.addMeta({name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"});
  // Touch icons.
  DocHead.addLink({rel: "apple-touch-icon", href: assetsPath + "touch-icon-180.png"});
  DocHead.addLink({rel: "apple-touch-icon-precomposed", href: assetsPath + "touch-icon-180.png"});
  DocHead.addLink({rel: "apple-touch-startup-image", href: assetsPath + "touch-icon-192.png"});
  DocHead.addLink({rel: "icon", sizes: "192x192", href: assetsPath + "touch-icon-192.png"});
  // Manifest
  DocHead.addLink({rel: "manifest", href: assetsPath + "manifest.json"});
});
