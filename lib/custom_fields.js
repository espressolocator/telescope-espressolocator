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


var addressSchemaObject = {
  address1: {
    type: String,
    max: 100,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder:  _.partial(i18n.t, "addressLine1"),
      }
    }
  },
  address2: {
    type: String,
    max: 100,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "addressLine2"),
      }
    }
  },
  city: {
    type: String,
    max: 100,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "city"),
      }
    }
  },
  county: {
    type: String,
    max: 100,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "county"),
      }
    }
  },
  postcode: {
    type: String,
    max: 50,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "postcode"),
      }
    }
  },
  country: {
    type: String,
    max: 100,
    editableBy: ["member", "admin"],
    autoform: {
      label: false,
      afFieldInput: {
        placeholder: _.partial(i18n.t, "country"),
      }
    }
  }
};
var addressSchema = new SimpleSchema(addressSchemaObject);

// Add address field.
Posts.addField({
  fieldName: 'address',
  fieldSchema: {
    type: addressSchema,
    optional: true,
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
