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

const clientControllers = {
  registerUser,
};
module.exports = clientControllers;
