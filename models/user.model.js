const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userRole: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
