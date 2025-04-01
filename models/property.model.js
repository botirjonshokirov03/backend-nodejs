const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, default: "" },

    propertyId: { type: String },
    parentProperty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },

    label: { type: String, default: "" },
    material: { type: String, default: "" },
    rooms: { type: Number, default: 0 },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    garages: { type: Number, default: 0 },
    yearBuilt: { type: Number, default: null },
    homeArea: { type: Number, default: 0 },
    lotDimensions: { type: String, default: "" },
    lotArea: { type: Number, default: 0 },

    price: { type: String, default: "0" },
    pricePrefix: { type: String, default: "$" },
    priceSuffix: { type: String, default: "USD" },
    priceCustom: { type: Number, default: 0 },

    region: { type: String, default: "" },
    friendlyAddress: { type: String, default: "" },
    mapLocation: {
      lat: { type: String, default: "" },
      lng: { type: String, default: "" },
    },

    featuredImages: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    attachments: { type: [String], default: [] },

    videoLink: { type: String, default: "" },
    virtualTour: { type: String, default: "" },

    amenities: { type: [String], default: [] },

    energyClass: { type: String, default: "Not specified" },
    energyIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate propertyId if not set
propertySchema.pre("save", async function (next) {
  if (!this.propertyId) {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    this.propertyId = `PROP-${randomId}`;
  }
  next();
});

module.exports = mongoose.model("property", propertySchema);
