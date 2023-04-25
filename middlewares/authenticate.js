const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = await jwt.verify(token, process.env.key);
    if (decoded) {
      const userId = decoded.userId;
      req.body.userId = userId;
      req.body.user = userId;
      next();
    } else {
      res.send("Login First");
    }
  } else {
    res.send("Login First");
  }
};

module.exports = {
  authenticator,
};
