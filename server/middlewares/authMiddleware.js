const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
   return res.status(401).json({result:"bad credentails"})
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Authentication")
  }
};

module.exports = authMiddleware;
