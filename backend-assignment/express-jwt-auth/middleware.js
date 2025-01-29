const jwt = require("jsonwebtoken");
const BlacklistedToken = require("./models/BlacklistedToken");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  // Check if token is blacklisted
  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) return res.status(401).json({ message: "Token is revoked" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
