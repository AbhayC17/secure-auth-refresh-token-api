const express = require("express");

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { protect } = require("../middlewares/auth.middleware");
const authLimiter = require("../middlewares/rateLimit.middleware");

const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);

router.post(
  "/refresh-token",
  authLimiter,
  validate(refreshTokenSchema),
  authController.refreshToken
);

router.post(
  "/logout",
  validate(refreshTokenSchema),
  authController.logout
);

router.get("/profile", protect, authController.getProfile);

module.exports = router;