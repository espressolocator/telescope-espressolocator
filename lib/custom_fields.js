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
  fieldName: 'address',
  fieldSchema: {
    type: String,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      afFieldInput: {
        placeholder: 'Start typing...',
      }
    }
  }
});

Posts.addField({
  fieldName: 'mapCoordinates',
  fieldSchema: {
    type: geoJsonSchemaTelescope,
    index: "2dsphere",
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      type: 'geojson-point',
      template: 'mapCoordinates',
      afFieldInput: {
        reverse: true,
        'data-geo': 'location',
      }
    }
  }
});
