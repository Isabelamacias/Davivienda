const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ msg: "Token requerido" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Token inválido" });
    req.user = decoded;
    next();
  });
};
