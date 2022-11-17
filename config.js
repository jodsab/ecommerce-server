import dotenv from "dotenv";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({
  path: path.resolve(`${__dirname}.env.${process.env.NODE_ENV}`),
});

export default { NODE_ENV: process.env.NODE_ENV || "dev" };
