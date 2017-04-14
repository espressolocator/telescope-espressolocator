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

// Title
Posts.addField({
  fieldName: 'title',
  fieldSchema: {
    type: String,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      order: 20,
      label: _.partial(i18n.t, "nameOfCafe"),
      afFieldInput: {
        placeholder: _.partial(i18n.t, "specifyNameOfCafe"),
      }
    }
  }
});

// Body
Posts.addField({
  fieldName: 'body',
  fieldSchema: {
    type: String,
    max: 3000,
    editableBy: ["member", "admin"],
    optional: true,
    autoform: {
      order: 20,
      rows: 5,
      label: _.partial(i18n.t, "description"),
      afFieldInput: {
        placeholder: _.partial(i18n.t, "specifyDescription"),
      }
    }
  }
});

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

// Store Google place_id.
Posts.addField({
  fieldName: 'mapPlaceId',
  fieldSchema: {
    type: String,
    optional: true,
    max: 500,
    editableBy: ["member", "admin"],
    autoform: {
      type: "hidden",
      order: 71,
      afFieldInput: {
        'data-geo': 'place_id',
      }
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
      label: _.partial(i18n.t, "website"),
      type: "bootstrap-url",
      order: 80,
      afFieldInput: {
        'data-geo': 'website',
      }
    }
  }
});

// Store twitter account
Posts.addField({
  fieldName: 'twitter',
  fieldSchema: {
    type: String,
    optional: true,
    max: 15,
    regEx: /^@?(\w){1,15}$/,
    editableBy: ["member", "admin"],
    autoform: {
      label: _.partial(i18n.t, "twitter"),
      order: 81,
      afFieldInput: {
          placeholder: _.partial(i18n.t, "specifyTwitter"),
      }
    }
  }
});

// Store facebook account
Posts.addField({
  fieldName: 'facebook',
  fieldSchema: {
    type: String,
    optional: true,
    max: 128,
    regEx: /^https?:\/\/([a-zA-Z\d-]+\.){0,}facebook\.com\/?([\w\-]*)/,
    editableBy: ["member", "admin"],
    autoform: {
      label: _.partial(i18n.t, "facebook"),
      order: 82,
      afFieldInput: {
          placeholder: _.partial(i18n.t, "specifyFacebook"),
      }
    }
  }
});

// Store instagram account
Posts.addField({
  fieldName: 'instagram',
  fieldSchema: {
    type: String,
    optional: true,
    max: 30,
    regEx: /^([\w\.]*){1,30}$/,
    editableBy: ["member", "admin"],
    autoform: {
      label: _.partial(i18n.t, "instagram"),
      order: 83,
      afFieldInput: {
          placeholder: _.partial(i18n.t, "specifyInstagram"),
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
    regEx: /^\s*\+?\s*([0-9][\s-]*){9,20}$/,
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

// Add reviews field.
Posts.addField({
  fieldName: 'reviews',
  fieldSchema: {
    type: [Object],
    optional: true,
    editableBy: ["member", "admin"],
    label: _.partial(i18n.t, "reviews"),
    autoform: {
      order: 91,
    }
  }
});
Posts.addField({
  fieldName: 'reviews.$.sitename',
  fieldSchema: {
    type: String,
    label: _.partial(i18n.t, "sitename"),
  }
});
Posts.addField({
  fieldName: 'reviews.$.url',
  fieldSchema: {
    type: String,
    label: _.partial(i18n.t, "url"),
  }
});

// Override standard filed validation messages.
// TODO: Language strings need to be in i18n file, but calling i18n.t function
// does not work in this context. Needs to be investigated and fixed.
SimpleSchema.messages({
  "regEx twitter": [{msg: "Specify a Twitter account name, with preceeding @ or without, e.g. @espressolocator"}],
  "regEx facebook": [{msg: "Make sure you specified a Facebook full URL pointing to account name"}],
  "regEx instagram": [{msg: "Specify just an Instagram account name without preceeding @"}],
  "regEx phone": [{msg: "Phone number field may contain only digits, spaces, brakets and plus sign in the country code"}]
});

