import jwt from "jsonwebtoken";
import config from "../../../config.js";

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(500).send({ error: "Acceso denegado" });
  try {
    console.log("token", process.env.JWT_SK);
    const verified = jwt.verify(token, process.env.JWT_SK);
    req.send(verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).send({ error: "Token no es válido" });
  }
};

export default verifyToken;
