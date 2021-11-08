const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //read the token from the header
  const token = req.header("x-auth-token");
  console.log(token);

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "Token Expired, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token Expired Or Invalid" });
  }
};
