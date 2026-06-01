const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/refreshToken.model");
const AppError = require("../utils/appError");

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId,
      tokenId: crypto.randomUUID(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const getRefreshTokenExpiryDate = () => {
  const days = 7;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

const saveRefreshToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  await RefreshToken.create({
    user: userId,
    tokenHash,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  return tokenHash;
};

const generateAuthTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  await saveRefreshToken(userId, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

const rotateRefreshToken = async (oldRefreshToken) => {
  let decoded;

  try {
    decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const oldTokenHash = hashToken(oldRefreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash: oldTokenHash,
    user: decoded.userId,
  });

  if (!storedToken) {
    throw new AppError("Refresh token not found", 401);
  }

  if (storedToken.revoked) {
    throw new AppError("Refresh token already revoked", 401);
  }

  if (storedToken.expiresAt < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  const newAccessToken = generateAccessToken(decoded.userId);
  const newRefreshToken = generateRefreshToken(decoded.userId);
  const newRefreshTokenHash = hashToken(newRefreshToken);

  storedToken.revoked = true;
  storedToken.replacedByTokenHash = newRefreshTokenHash;
  await storedToken.save();

  await RefreshToken.create({
    user: decoded.userId,
    tokenHash: newRefreshTokenHash,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const revokeRefreshToken = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({ tokenHash });

  if (!storedToken) {
    throw new AppError("Refresh token not found", 404);
  }

  if (storedToken.revoked) {
    throw new AppError("Refresh token already revoked", 400);
  }

  storedToken.revoked = true;
  await storedToken.save();
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthTokens,
  hashToken,
  rotateRefreshToken,
  revokeRefreshToken,
};