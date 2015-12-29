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
      order: 60,
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
      order: 70,
    }
  }
});

// Move URL furhter down the form.
Posts.addField({
  fieldName: 'url',
  fieldSchema: {
    type: String,
    optional: true,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      type: "bootstrap-url",
      order: 80,
      afFieldInput: {
        'data-geo': 'website',
      }
    }
  }
});

// Add phone number field.
Posts.addField({
  fieldName: 'phone',
  fieldSchema: {
    type: String,
    optional: true,
    regEx: /^(\+\d{1,2}\s)?\(?\d{3,5}\)?[\s.-]?\d{5,7}$/,
    editableBy: ["member", "admin"],
    autoform: {
      order: 90,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "specifyPhoneNumber"),
        'data-geo': 'international_phone_number',
      }
    }
  }
});
