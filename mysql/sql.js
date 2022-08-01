module.export = {
    userList: 'SELECT * FROM Users',
    searchUser: `SELECT userId, userName FROM Users WHERE userId = ?`,//아이디 검색 쿼리 아이디와 이름 가져옴
    insertScheduleMember: `insert into schedulemember set ?`,

    scheduleCreate: `insert into schedule set ?`,//스케줄 생성 쿼리

    ScheduleMemberInsert: `insert into schedulemember (id, name) values ?`,//오류있음

    insertScheduleData: 'INSERT INTO Schedule(userIdx,scheduleTitle,scheduleCom,scheduleColor,startYMD,endYMD) VALUES (?, ?, ?, ?, ?, ?)',//스케줄정보 입력 쿼리
    insertUserData: `INSERT INTO User(userName,userId,password,userEmail) VALUES (?, ?, ?, ?)`,
}