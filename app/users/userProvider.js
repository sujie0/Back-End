const { pool } = require("../../../config/database");
const userDao = require("./userDao");

exports.retrieveUserList = async function (id) {
    if (!id) {
      return userListResult;
    } else {
      const connection = await pool.getConnection(async (conn) => conn);
      const userListResult = await userDao.selectUserId(connection, id);
      connection.release();
  
      return userListResult;
    }
  };
  
  exports.retrieveUser = async function (id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserIdx(connection, id);
  
    connection.release();
  
    return userResult[0];
  };

  exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
  };