const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const tokens = await authService.refreshAuthTokens(req.body.refreshToken);

  res.status(200).json({
    success: true,
    message: "Tokens refreshed successfully",
    data: {
      tokens,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.body.refreshToken);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
};