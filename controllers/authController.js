const asyncHandler = require("express-async-handler");
// const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

// @desc Login
// @route POST
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const foundUser = await user.findOne({ email }).exec();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status({ message: "Unathorized" });

  // Access Token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        userId: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );
  // Refresh Token
  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accesibile only by web server
    secure: true, // https
    sameSite: "None", // cross-site- cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match Token
  });

  res.json({ accessToken });
});
// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;
  //   JWT verify
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await User.findOne({ email: decoded.email });
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            userId: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.status({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
