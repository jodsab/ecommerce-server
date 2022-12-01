import jwt from "jsonwebtoken";
import config from "../../../config.js";

const verifyToken = (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(500).send({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SK, (err, user) => {
      if (err) return res.sendStatus(403);
      if (user?.id == id) {
        req.user = user;

        next();
      } else {
        res
          .status(201)
          .send({ error: "No tienes permisos para actualizar estos datos" });
      }
    });

    /*     console.log("verified", verified);
    req.send(verified);
    req.user = verified;
    next(); */
  } catch (error) {
    res.status(500).send({ error: "Token no es válido" });
  }
};

export default verifyToken;
