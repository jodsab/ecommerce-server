import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(500).send({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).send({ error: "Token no es válido" });
  }
};

export default verifyToken;
