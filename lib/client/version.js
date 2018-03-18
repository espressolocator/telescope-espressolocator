// Define version.
version = '2018031800';
release = '1.0.3-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
