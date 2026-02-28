const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const User    = require("../db/user");
const { ConflictError, NotFoundError } = require("../middleware/customErrorHandler");

const SALT_ROUNDS = 10;

// ── Register ──────────────────────────────────────────────────────────────────
const registerUser = async (userData) => {
  const { email, password, ...rest } = userData;

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) throw new ConflictError("Email already registered", 409);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ ...rest, email, password: hashedPassword });

  // Never return password — strip it out
  const { password: _, ...safeUser } = user.toObject();
  return safeUser;
};

// ── Login ─────────────────────────────────────────────────────────────────────
const loginUser = async ({ email, password }) => {
  // .select("+password") only if password is set to select:false in schema (recommended)
  const user = await User.findOne({ email }).select("+password").lean();
  if (!user) throw new ("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new NotFoundError("Invalid email or password", 401);

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

// ── Get All Users ─────────────────────────────────────────────────────────────
const getAllUsers = async () => {
  // .lean() returns plain JS objects — much faster than full Mongoose documents
  return User.find().select("-password").lean();
};

module.exports = { registerUser, loginUser, getAllUsers };