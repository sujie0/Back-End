const { pool } = require("../../config/database");
const { errResponse } = require("../../config/response");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../config/baseResponseStatus");
const { response } = require("../../config/response");

exports.createUser = async function (email, password, id, name) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, id, name];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (id, name) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, name)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteUser = async function (id) {
    try{
        const connection = await pool.getConnection(async (coon) => conn);
        const deleteUserResult = await userDao.deleteUser(connection, id)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.scheduleListbyId = async function (id) {
    try{
        const connection = await pool.getConnection(async (coon) => conn);
        const scheduleListResult = await userDao.deleteUser(connection, id)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - scheduleListbyId Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}