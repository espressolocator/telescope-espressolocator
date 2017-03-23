// Define version.
version = '2017032300';
release = '1.0.2-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
