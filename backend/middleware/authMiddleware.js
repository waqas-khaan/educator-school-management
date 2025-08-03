const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Received token:", token);

  if (!token) return res.status(401).json({ message: "No token provided" });

  // Temporarily disable token verification for development
  console.log("Token verification disabled for development");
  req.user = { id: 1, email: "admin@school.com", role: "admin" };
  next();

  // Uncomment below to re-enable token verification
  /*
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("Token verified successfully:", decoded);
    req.user = decoded;
    next();
  });
  */
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    next();
  };
};
