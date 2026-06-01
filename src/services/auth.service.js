const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const tokenService = require("./token.service");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const tokens = await tokenService.generateAuthTokens(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    tokens,
  };
};

const refreshAuthTokens = async (refreshToken) => {
  const tokens = await tokenService.rotateRefreshToken(refreshToken);
  return tokens;
};

const logoutUser = async (refreshToken) => {
  await tokenService.revokeRefreshToken(refreshToken);
};

module.exports = {
  registerUser,
  loginUser,
  refreshAuthTokens,
  logoutUser,
};