import { pool } from "../../../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config.js";

//User
export const getLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length < 1) {
      res
        .status(201)
        .send({ message: "Email no existe en nuestra base de datos" });
    } else {
      if (rows) {
        const validateUser = await bcryptjs.compare(
          password,
          rows[0]?.password
        );
        if (validateUser) {
          /* const token = jwt.sign({id}) */

          jwt.sign(
            rows[0],
            process.env.JWT_SK,
            { algorithm: "HS256" },
            (err, token) => {
              if (err) {
                res.status(500).send({ msg: "Error al generar token" });
              } else {
                res.status(201).send({ msg: "success", token: token });
              }
            }
          );

          /*           const { id, name, email, dni } = rows[0];
          res
            .status(201)
            .send({ id, name, email, dni, message: "Acceso exitoso." }); */
        } else {
          res.status(500).send({ status: 500, message: "Contraseña inválida" });
        }
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcryptjs.hash(password, 10);
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, hash]
    );

    if (rows) {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      jwt.sign(
        rows[0],
        process.env.JWT_SK,
        { algorithm: "HS256" },
        (err, token) => {
          if (err) {
            res.status(500).send({ msg: "Error al generar token" });
          } else {
            res.status(201).send({ msg: "success", token: token });
          }
        }
      );
    } else {
      res.status(500).send({ error: "Error al registrar usuario" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    celNumber,
    password,
    dni,
    description,
    latitude,
    longitude,
    reference,
  } = req.body;
  try {
    const response = {};

    if (name || email || celNumber || password || dni) {
      const [rows] = await pool.query(
        "UPDATE users SET name = IFNULL(?,name), email = IFNULL(?, email), celNumber = IFNULL(?, celNumber), password= IFNULL(?,password), dni = IFNULL(?,dni) WHERE id = ?",
        [name, email, celNumber, password, dni, id]
      );
      response.users = rows;
    }

    if (description || latitude || longitude || reference) {
      const [rows] = await pool.query(
        "INSERT INTO locations (description, latitude, longitude, reference, id_user) VALUES (?,?,?,?,?)",
        [description, latitude, longitude, reference, id]
      );
      response.location = rows;
    }

    const [newUser] = await pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    jwt.sign(
      newUser[0],
      process.env.JWT_SK,
      { algorithm: "HS256" },
      (err, token) => {
        if (err) {
          res.status(500).send({ msg: "Error al generar token" });
        } else {
          res
            .status(201)
            .send({ msg: "success", token: token, response: response });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUserLocation = async (req, res) => {
  const { idlocation } = req.params;
  try {
    const [rows] = await pool.query("DELETE FROM locations WHERE id = ?", [
      idlocation,
    ]);

    res.status(201).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Administrator
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    const locations = await pool.query("SELECT * FROM locations");
    const permissions = await pool.query(
      "SELECT r.description, p.id_user FROM permissions p LEFT JOIN rol r ON r.id = p.id_rol"
    );
    rows.map((u) => {
      const location = locations[0].filter((l) => u.id == l?.id_user);
      const permission = permissions[0].filter((l) => u.id == l?.id_user);
      if (location.length !== 0) {
        u.locations = location;
      }
      if (permission.length !== 0) {
        u.permissions = permission.map((p) => p.description);
      }
    });

    const newArray = [];

    rows.map((e) => {
      const { password, id_permissions, ...restOfObject } = e;
      newArray.push(restOfObject);
    });
    console.log("new arr", newArray);
    res.status(201).send(newArray);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePermission = async (req, res) => {
  try {
  } catch (error) {}
};
