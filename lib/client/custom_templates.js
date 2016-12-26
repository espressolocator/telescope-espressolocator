// Override telescope templates.
Template.custom_post_title.replaces("post_title");
Template.custom_post_body.replaces("post_body");
Template.custom_views_menu.replaces("views_menu");
Template.custom_submit_button.replaces("submit_button");
Template.custom_footer_code.replaces("footer_code");

// Remove menus
Telescope.modules.remove("primaryNav", "pages_menu");
