import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRoutes from "./src/app/routes/users.routes.js";
import productsRoutes from "./src/app/routes/products.routes.js";
import locationsRoutes from "./src/app/routes/locations.routes.js";
import { sendMail } from "./src/services/nodemailer/sendMail.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  sendMail();
});

app.use(usersRoutes);
app.use(locationsRoutes);
app.use(productsRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
