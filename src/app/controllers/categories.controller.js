import { pool } from "../../../db.js";

export const createNewCategorie = async (req, res) => {
  const { categoryName } = req.body;

  try {
    if (categoryName) {
      const [rows] = await pool.query(
        "INSERT INTO productcategory (categoryName) VALUES (?)",
        [categoryName]
      );

      if (rows) {
        res.status(201).send(rows);
      } else {
        res.status(500).send({
          message: "Parece que no tienes los permisos suficientes",
          error: error,
        });
      }
    } else {
      res
        .status(500)
        .send({ message: "Debes agregar un nombre válido a la categoria" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al crear categoría", error: error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productcategory");
    if (rows) {
      res.status(201).send(rows);
    } else {
      res
        .status(500)
        .send({ message: "Parece que aún no hay categorias creadas" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al traer todas las categorias", error: error });
  }
};

export const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    if (categoryName) {
      const [rows] = await pool.query(
        "UPDATE productcategory SET categoryName = ? WHERE id = ?",
        [categoryName, id]
      );

      if (rows.affectedRows === 1) {
        res
          .status(201)
          .send({ message: "Categoría actualizada correctamente" });
      } else {
        res.status(500).send({
          message: "Parece que no tienes los permisos suficientes",
          error: error,
        });
      }
    } else {
      res
        .status(500)
        .send({ message: "CategoryName no puede estar vacío", error: error });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al actualizar categoría", error: error });
  }
};

export const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "DELETE FROM productcategory WHERE id = ?",
      [id]
    );
    if (rows.affectedRows === 1) {
      res.status(201).send({ message: "Categoria eliminada correctamente" });
    } else {
      res.status(500).send({
        message:
          "Parece que no puedes eliminar la categoria, puede que no exista",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al actualizar categoría", error: error });
  }
};
