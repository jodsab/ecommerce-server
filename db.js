import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "ttt_ecommerce",
  password: "ttt_pswrd",
  database: "mydb",
  port: "3307",
});
