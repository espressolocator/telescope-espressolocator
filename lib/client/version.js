// Define version.
version = '2018032800';
release = '1.0.4-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
