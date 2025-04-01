const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const cryptoJS = require("../utils/crypto");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const decryptedPassword = cryptoJS.decrypt(user.password);
    if (decryptedPassword !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        login: user.login,
        name: user.firstName,
        role: user.userRole,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const authController = { loginUser };
module.exports = authController;
