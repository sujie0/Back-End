const mysql = require("mysql");
const sql = require("./sql.js");


const pool = mysql.createPool({
  connectionLimit: 10,
  host: '',
  port: 3307,
  user: 'admin',
  password: '12345678',
  database: 'dev'
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