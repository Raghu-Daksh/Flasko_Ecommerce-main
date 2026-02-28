const userService = require("../services/user.service.js");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge:   2 * 60 * 60 * 1000, // 2 hours in ms
};

// ── Register ──────────────────────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err); // ← hands off to global error handler
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// ── Get All Users ─────────────────────────────────────────────────────────────
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getUsers };