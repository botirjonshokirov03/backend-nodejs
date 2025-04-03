const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ userRole: "client" }).select(
      "-password"
    );
    return res.json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User updated", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Update failed", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Delete failed", error: err.message });
  }
};

const userControllers = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

module.exports = userControllers;
