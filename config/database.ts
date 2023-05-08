import { createConnection } from "mysql2";

export const conn = createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("mysql connection succeeded");
});
