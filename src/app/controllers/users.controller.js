import { pool } from "../../../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

          jwt.sign(rows[0], "secret_key", (err, token) => {
            if (err) {
              res.status(500).send({ msg: "Error al generar token" });
            } else {
              res.status(201).send({ msg: "success", token: token });
            }
          });

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
  const { name, email, password, dni } = req.body;
  const hash = await bcryptjs.hash(password, 10);
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (name,email,password, dni) VALUES (?,?,?,?)",
      [name, email, hash, dni]
    );
    res.send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    dni,
    description,
    latitude,
    longitude,
    reference,
  } = req.body;
  try {
    const response = {};

    if (name || email || password || dni) {
      const [rows] = await pool.query(
        "UPDATE users SET name = IFNULL(?,name), email = IFNULL(?, email), password= IFNULL(?,password), dni = IFNULL(?,dni) WHERE id = ?",
        [name, email, password, dni, id]
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

    res.status(201).send(response);
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

    rows.map((u) => {
      const locs = locations[0].filter((l) => u.id == l?.id_user);
      if (locs.length !== 0) {
        u.locations = locs;
      }
    });

    const newArray = [];

    rows.map((e) => {
      const { password, ...restOfObject } = e;
      newArray.push(restOfObject);
    });

    res.status(201).send(newArray);
  } catch (error) {
    res.status(500).send(error);
  }
};
