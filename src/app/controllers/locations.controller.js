import { pool } from "../../../db.js";

//User

export const getLocationsByUser = async (req, res) => {
  const { iduser } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM locations WHERE id_user = ?",
      [iduser]
    );
    res.status(201).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createLocationsByUser = (req, res) => {
  res.send("Post Product");
};

export const updateLocationByUser = (req, res) => {
  res.send("Update Product");
};

export const deleteLocationByUser = (req, res) => {
  res.send("Delete Product");
};

//Administrator
