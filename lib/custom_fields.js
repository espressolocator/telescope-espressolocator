// Custom Post Field

var geoJsonSchemaObjectTelescope = {
  type: {
    type: String,
    editableBy: ["member", "admin"],
  },
  coordinates: {
    type: [Number],
    decimal: true,
    editableBy: ["member", "admin"],
  }
};

var geoJsonSchemaTelescope = new SimpleSchema(geoJsonSchemaObjectTelescope);

Posts.addField({
  fieldName: 'mapCoordinates',
  fieldSchema: {
    type: geoJsonSchemaTelescope,
    index: "2dsphere",
    optional: true,
    editableBy: ["member", "admin"],
    blackbox: true,
    autoform: {
      type: 'geojson-point',
      afFieldInput: {
        reverse: true,
        'data-geo': 'location',
      }
    }
  }
});
