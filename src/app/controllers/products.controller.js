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
  const { name, description, price, quantity } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO products (name, description) VALUES (?,?)",
      [name, description]
    );

    const idProduct = rows?.insertId;

    if (idProduct) {
      const [rows] = await pool.query(
        "INSERT INTO pricesforquantity (price,quantity,id_product) VALUES (?,?,?)",
        [price, quantity, idProduct]
      );

      if (req.files) {
        req.files.map(async (f) => {
          const [rows] = await pool.query(
            "INSERT INTO productImages (url, id_product) VALUES (?,?)",
            [f?.filename, idProduct]
          );

          res.send(rows);
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req, res) => {
  const { idproduct } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const message = {};
    if (name || description) {
      const [rows] = await pool.query(
        "UPDATE products SET name = IFNULL(?,name), description = IFNULL(?,description) WHERE id = ?",
        [name, description, idproduct]
      );
      message.product = rows;
    }

    if (price || quantity) {
      const [rows] = await pool.query(
        "UPDATE pricesforquantity SET prices = IFNULL(?,price), quantity = IFNULL(?,quantity) WHERE id_product = ?",
        [price, quantity, idproduct]
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
