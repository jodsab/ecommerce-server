import { pool } from "../../../db.js";

//User
export const getPortadasList = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM portada");
    res.status(201).send(rows);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, message: "No hay portadas para mostrar" });
  }
};

//Administrator
export const createNewPortada = async (req, res) => {
  const { description } = req.body;

  try {
    if (req.files.length >= 1) {
      console.log("asd");
      req.files.map(async (f) => {
        const [rows] = await pool.query(
          "INSERT INTO portada (url, description) VALUES (?,?)",
          [f?.filename, description]
        );

        res.status(201).send({
          status: 201,
          message: "Portada agregada correctamente.",
        });
      });
    } else {
      res.status(500).send({ message: "Error al crear producto" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteImageOfProduct = async (req, res) => {
  const { idimg } = req.params;
  try {
    const [rows] = await pool.query("DELETE FROM portada WHERE id = ?", [
      idimg,
    ]);
    res.status(201).send({
      affectedRows: rows.affectedRows,
      message: "Imagen de portada eliminada",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
