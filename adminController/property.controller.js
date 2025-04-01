const PropertyModel = require("../models/property.model");

const createProperty = async (req, res) => {
  try {
    const newProperty = new PropertyModel(req.body);
    await newProperty.save();
    return res
      .status(201)
      .json({ message: "Property created", property: newProperty });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create property", error: err.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await PropertyModel.find().sort({ createdAt: -1 });
    return res.json(properties);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch properties", error: err.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await PropertyModel.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    return res.json(property);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch property", error: err.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const updated = await PropertyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Property not found" });
    return res.json({ message: "Property updated", property: updated });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Update failed", error: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const deleted = await PropertyModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Property not found" });
    return res.json({ message: "Property deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Delete failed", error: err.message });
  }
};

const propertyControllers = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};

module.exports = propertyControllers;
