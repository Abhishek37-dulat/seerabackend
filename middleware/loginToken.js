const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "token not found" });
  }
  if (!token && !token.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "Unauthorized - Missing or invalid Bearer token" });
  }
  const actualToken = token.slice(7);

  try {
    const decoded = jwt.verify(actualToken, process.env.JWTSECUREKEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { authenticateUser };
