const PropertyModel = require("../models/property.model");

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

const propertyControllers = {
  getAllProperties,
  getPropertyById,
};

module.exports = propertyControllers;
