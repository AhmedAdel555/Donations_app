import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database:process.env.PGDATABASEDEV,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT as string, 10 )
});

// listener to any error in database
pool.on('error', (error:Error) => {
  console.log(error.message);
})

export default pool;