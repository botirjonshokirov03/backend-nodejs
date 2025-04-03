const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    userRole: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
