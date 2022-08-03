const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: '12345678', 
    database: 'timetuning'
});

module.exports = {
    pool: pool
};