import { pool } from "../../../db.js";

//User
export const getAllProducts = async (req, res) => {
  try {
    const response = [];
    const [rows] = await pool.query("SELECT * FROM products");

    rows.map(async (r) => {
      const arrImages = [];
      const [rows] = await pool.query(
        "SELECT id, url FROM productImages WHERE id_product = ?",
        [r?.id]
      );
      rows.map((i) => {
        arrImages.push(i);
      });
      console.log(arrImages);
      rows.length >= 1 && response.push(arrImages);
    });

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Admin
//product - new product
export const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    subQuantity,
    id_productCategory,
  } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO products (name, description, id_productCategory) VALUES (?,?,?)",
      [name, description, id_productCategory]
    );

    if (quantity || price || subQuantity) {
      const idProduct = rows?.insertId;

      if (idProduct) {
        const [rows] = await pool.query(
          "INSERT INTO pricesforquantity (price,quantity,subQuantity,id_product) VALUES (?,?,?,?)",
          [price, quantity, subQuantity, idProduct]
        );

        if (req.files) {
          req.files.map(async (f) => {
            const [rows] = await pool.query(
              "INSERT INTO productImages (url, id_product) VALUES (?,?)",
              [f?.filename, idProduct]
            );
            res.status(201).send({
              status: 201,
              message: "Producto agregado correctamente.",
            });
          });
        }
      } else {
        res.status(500).send({ message: "Error al crear producto" });
      }
    } else {
      res
        .status(500)
        .send({ message: "Error al crear producto llena todos los datos" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createNewPriceForProduct = async (req, res) => {
  const { id } = req.params;
  const { price, quantity } = req.body;
  try {
    if (price && quantity) {
      const [rows] = await pool.query(
        "INSERT INTO pricesForQuantity (price, quantity,id_product) VALUES (?,?,?)",
        [price, quantity, id]
      );
      if (rows) {
        res
          .status(201)
          .send({ message: "Agregaste un nuevo precio al producto", rows });
      } else {
        res
          .status(500)
          .send({ message: "Es posible que el producto no exista" });
      }
    } else {
      res.status(500).send({
        message: "Es posible que no estés mandando los datos completos",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error al crear nuevo precio al producto",
      error: error,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { idproduct } = req.params;
  const { name, description, category, price, quantity, subQuantity } =
    req.body;
  try {
    const message = {};
    if (name || description || category) {
      const [rows] = await pool.query(
        "UPDATE products SET name = IFNULL(?,name), description = IFNULL(?,description), id_productCategory = IFNULL(?,id_productCategory) WHERE id = ?",
        [name, description, category, idproduct]
      );
      message.product = rows;
    }

    if (price || quantity || quantity) {
      const [rows] = await pool.query(
        "UPDATE pricesforquantity SET prices = IFNULL(?,price), quantity = IFNULL(?,quantity, subQuantity = IFNULL(?,subQuantity)) WHERE id_product = ?",
        [price, quantity, subQuantity, idproduct]
      );
      message.price = rows;
    }

    if (req.files) {
      req.files.map(async (f) => {
        const [rows] = await pool.query(
          "INSERT INTO productimages (url, id_product) VALUES (?,?)",
          [f?.filename, idproduct]
        );
        message.images = rows;
      });
    }
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePriceOfProduct = async (req, res) => {
  const { id, idprod } = req.params;
  try {
    const [rows] = await pool.query(
      "DELETE FROM pricesforquantity WHERE id = ? AND id_product = ?",
      [id, idprod]
    );
    if (rows) {
      res.status(201).send({ message: "Precio eliminado del producto", rows });
    } else {
      res
        .status(500)
        .send({ message: "Error al eliminar el precio del producto" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteImageOfProduct = async (req, res) => {
  const { idproduct, idimg } = req.params;
  try {
    const [rows] = await pool.query(
      "DELETE FROM productimages WHERE id = ? AND id_product = ?",
      [idproduct, idimg]
    );
    res.status(201).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(201).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};
