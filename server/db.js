import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const pool=mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  database:process.env.DB_NAME,
  password:process.env.DB_PASSWORD
})

let sql=' SELECT * from users';

pool.execute(sql,(err,result)=>{
  if (err) throw err;

  console.log(result);
})



export default pool.promise();

