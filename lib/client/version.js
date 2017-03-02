// Define version.
version = '2017030200';
release = '1.0.1-beta';

Template.registerHelper('getVersion', function () {
    return version;
});

Template.registerHelper('getRelease', function () {
    return release;
});
