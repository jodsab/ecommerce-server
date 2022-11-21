import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRoutes from "./src/app/routes/users.routes.js";
import productsRoutes from "./src/app/routes/products.routes.js";
import locationsRoutes from "./src/app/routes/locations.routes.js";
import portadasRoutes from "./src/app/routes/portadas.routes.js";
import categoriesRoutes from "./src/app/routes/categories.routes.js";
import rolesRoutes from "./src/app/routes/roles.routes.js";

import { sendMail } from "./src/services/nodemailer/sendMail.js";
import * as url from "url";
import config from "./config.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/public", express.static(__dirname + "/src/public/images"));

app.get("/", (req, res) => {
  sendMail();
});

app.use(usersRoutes);
app.use(locationsRoutes);
app.use(productsRoutes);
app.use(portadasRoutes);
app.use(categoriesRoutes);
app.use(rolesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
