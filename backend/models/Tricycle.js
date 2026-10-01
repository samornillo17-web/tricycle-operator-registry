const mongoose = require("mongoose");

const tricycleSchema = new mongoose.Schema(
  {
    body_number: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    driver_name: {
      type: String,
      required: true,
      trim: true
    },

    plate_number: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    route: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      required: true,
      enum: [
        "Active",
        "Inactive",
        "Suspended"
      ],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Tricycle",
  tricycleSchema
);