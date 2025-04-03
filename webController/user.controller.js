const UserModel = require("../models/user.model");
const cryptoJS = require("../utils/crypto");

const registerUser = async (req, res) => {
  const { login, firstName, lastName, email, password, userRole } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const encryptedPassword = cryptoJS.encrypt(password);

    const newUser = new UserModel({
      login,
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      userRole,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getMyProfile = async (req, res) => {
  if (req.params.id !== req.user.id)
    return res.status(403).json({ message: "Access denied" });

  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
};

const updateMyProfile = async (req, res) => {
  if (req.params.id !== req.user.id)
    return res.status(403).json({ message: "Access denied" });

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Update failed", error: err.message });
  }
};

const deleteMyProfile = async (req, res) => {
  if (req.params.id !== req.user.id)
    return res.status(403).json({ message: "Access denied" });

  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Your account has been deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Delete failed", error: err.message });
  }
};

const clientControllers = {
  registerUser,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
};

module.exports = clientControllers;
