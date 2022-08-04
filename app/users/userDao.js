// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                  SELECT userEmail, userName 
                  FROM User;
                  `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
  }
  
  // 이메일로 회원 조회
  async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                  SELECT email, nickname 
                  FROM User 
                  WHERE email = ?;
                  `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
  }
  
  // userId 회원 조회
  async function selectUserId(connection, userId) {
    const selectUserIdxQuery = `
                   SELECT userEmail, userName, profileImgUrl
                   FROM User 
                   WHERE userId = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdxQuery, userId);
    return userRow;
  }
  
  // 유저 생성
  async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
          INSERT INTO User(userEmail, password, userName, userId)
          VALUES (?, ?, ?, ?);
      `;
    const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
  
    return insertUserInfoRow;
  }
  
  // 패스워드 체크
  async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
          SELECT userEmail, userName, password
          FROM User 
          WHERE userEmail = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
  
    return selectUserPasswordRow;
  }
  
  // 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
  async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, id
          FROM User
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
  }
  
  // 유저 정보 수정
  async function updateUserInfo(connection, id, name) {
    const updateUserQuery = `
    UPDATE User 
    SET userName = ?
    WHERE userId = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [name, id]);
    return updateUserRow[0];
  }
  
  async function deleteUser(connection, id){
    const updateUserQuery = `
    DELETE from User 
    WHERE userId = ?;`;
    const deleteUser = await connection.query(updateUserQuery, [id]);
    return deleteUser[0];
  }
  
  async function selectUserSchedule(connection, id){
    const updateUserQuery = `
    SELECT * FROM ScheduleMember 
    WHERE userId = ?;`;
    const userSchedule = await connection.query(updateUserQuery, [id]);
    return userSchedule[0];
  }
  module.exports = {
    selectUser,
    selectUserEmail,
    selectUserId,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
    deleteUser,
    selectUserSchedule
  };
  