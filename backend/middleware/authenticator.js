const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      message: "Token not found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({
        message: "invalid token",
      });
    }
    req.user = user;
    next();
  });
}

function authenticateResetToken(req, res, next) {
  const token = req.body.token
    ? req.body.token
    : req.headers["Authorization"].split(" ")[1];

  if (!token) {
    return res.json({ message: "Token not found" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.json({ message: "Invalid or expired token" });
    }
    req.user = user;
    console.log("Reset token is valid:", user);
    next();
  });
}

module.exports = {
  authenticateToken,
  authenticateResetToken,
};
