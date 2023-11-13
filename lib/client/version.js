// Define version.
version = '2023111300';
release = '1.0.5-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
