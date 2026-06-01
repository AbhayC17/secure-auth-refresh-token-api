const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Access token is required", 401);
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError("User belonging to this token no longer exists", 401);
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};