// Define geoJson telescope-specific schema.
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

// Add address field.
Posts.addField({
  fieldName: 'formattedAddress',
  fieldSchema: {
    type: String,
    max: 500,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      label: _.partial(i18n.t, "location"),
      afFieldInput: {
        placeholder: _.partial(i18n.t, "specifyFullAddress"),
        'data-geo': 'formatted_address',
      }
    }
  }
});

// Add coordinates field and map contaner, see autoform_map_coordinates.html template for
// details, it overrides afInputHiddenGeoJsonPoint.
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
