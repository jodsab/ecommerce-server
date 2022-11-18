import { pool } from "../../../db.js";
import { setFormatOnSaveWithLocalhostAnPort } from "../config/functions.js";

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

  req.files.map((e) => e);
  try {
    if (req.files) {
      const desktop_photo = req.files.find((e) => e.fieldname === "url");
      const tablet_photo = req.files.find((e) => e.fieldname === "url_tablet");
      const mobile_photo = req.files.find((e) => e.fieldname === "url_mobile");
      console.log("desktop", desktop_photo);
      const [rows] = await pool.query(
        "INSERT INTO portada (url,url_tablet,url_mobile, description) VALUES (?,?,?,?)",
        [
          desktop_photo
            ? setFormatOnSaveWithLocalhostAnPort(desktop_photo?.filename)
            : null,
          tablet_photo
            ? setFormatOnSaveWithLocalhostAnPort(tablet_photo?.filename)
            : null,
          mobile_photo
            ? setFormatOnSaveWithLocalhostAnPort(mobile_photo?.filename)
            : null,
          description,
        ]
      );
      res.status(201).send({
        status: 201,
        message: "Portada agregada correctamente.",
      });
    } else {
      res.status(500).send({ message: "Error al crear producto" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePortadas = async (req, res) => {
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
