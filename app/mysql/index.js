const mysql = require("mysql");
const sql = require("./sql.js");


const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '1234',
  database: 'test'
});

const query = async (alias, values) => {
  return new Promise((resolve, reject) =>
    pool.query(sql[alias], values, (error, results) => {
      if (error) {
        console.log(error);
        reject({
          error
        });
      } else resolve(results);
    })
  );
}

module.exports = {
  query
};