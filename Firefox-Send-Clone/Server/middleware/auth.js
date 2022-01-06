const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({ msg: "No Token, Sign In" });
      console.log("No Token, Sign In");

      return next();
    }
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
    console.log(error);

    return next();
  }
};
