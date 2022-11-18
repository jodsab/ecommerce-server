import { pool } from "../../../db.js";

//User
export const getPortadasList = (req, res) => {
  rows.map(async (r) => {
    const arrImages = [];
    const [rows] = await pool.query(
      "SELECT id, url FROM portada",
      [r?.id]
    );
    rows.map((i) => {
      arrImages.push(i);
    });
    console.log(arrImages);
    rows.length >= 1 && response.push(arrImages);
  });
  res.send("solicitud exitosa");
};



//Administrator
export const createNewPortada = async (req, res) => {
  try {
    
    if (req.files) {
      console.log("asd");
    req.files.map(async (f) => {
      const [rows] = await pool.query(
        "INSERT INTO portada (url, description) VALUES (?,?)",
        [f?.filename, f?.description]
      );
  

      res.status(201).send({
        status: 201,
        message: "Portada agregada correctamente.",
      });
    });
  }else{
    res.status(500).send({ message: "Error al crear producto" });
  }
}catch(error){
    res.status(500).send(error);
  }
};

export const deleteImageOfProduct = async (req, res) => {
  const { idimg } = req.params;
  try {
    const [rows] = await pool.query(
      "DELETE FROM portada WHERE id = ?",
      [idimg]
    );
    res.status(201).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};