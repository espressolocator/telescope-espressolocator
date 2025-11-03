// Define version.
version = '2025110300';
release = '1.0.7-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
