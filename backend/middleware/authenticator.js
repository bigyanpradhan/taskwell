const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "User isn't authenticated.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "User isn't authorized.",
      });
    }
    req.user = user;
    next();
  });
}

function authenticateResetToken(req, res, next) {
  const token = req.body.token
    ? req.body.token
    : req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "User isn't authenticated." });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "User isn't authorized." });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  authenticateResetToken,
};
