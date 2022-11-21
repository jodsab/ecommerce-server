import { pool } from "../../../db.js";

export const getAllRoles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM rol");
    if (rows) {
      res.status(201).send(rows);
    } else {
      res.status(500).send({ message: "Parece que no hay roles que mostrar" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Hubo un error al traer los roles", error: error });
  }
};
