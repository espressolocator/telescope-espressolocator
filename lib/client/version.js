// Define version.
version = '2024080500';
release = '1.0.6-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
