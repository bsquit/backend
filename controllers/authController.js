import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // Create new user
  const user = new User({ name, email, password, role });

  try {
    await user.save();
    res.status(201).json({
      message: "User registered successfully! Please proceed to login.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser)
    return res.status(400).json({ message: "Invalid credentials" });

  // Check password
  const checkPassword = await existingUser.matchPassword(password);
  if (!checkPassword)
    return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign(
    {
      id: existingUser._id,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // console.log({ status: 200, state: "Login", token: token });

  // Send token in response
  res.status(200).json({
    message: "Logged in successfully!",
    token: token,
  });
};

// Logout
export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
