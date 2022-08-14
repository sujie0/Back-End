module.exports = {

    //1. auth


    //2. login


    //3. schedule

    listSchedule: `SELECT * FROM schedule WHERE userIdx = ?`,
    //스케줄 조회 쿼리*3.1
    insertScheduleData:`INSERT INTO schedule (scheduleTitle, scheduleCom, scheduleColor, startYMD, endYMD) 
                        VALUES (?, ?, ?, ?, ?);`,
    //스케줄정보 입력 쿼리*3.2
    addMember: `INSERT INTO scheduleMember (scheduleIdx, userId, userName, userIdx)
	            SELECT schedule.scheduleIdx, user.userId, user.userName, user.userIdx
                FROM schedule, User
                WHERE schedule.scheduleIdx=(SELECT MAX(scheduleIdx) FROM schedule) AND user.userId=?`,
    //스케줄 멤버에 추가*3.3
    searchMemberLike: `SELECT * FROM user WHERE userId LIKE '%?%'`,
    //멤버 검색 쿼리, (?의 값을 포함하는 유저 모두 조회->오류있음)
    searchMember: `SELECT userIdx, userId, userName FROM user WHERE userId = ?`,
    //멤버 검색 쿼리*3.3
    scheduleDelete: `DELETE FROM schedule WHERE scheduleIdx = ?`
    //스케줄 삭제 쿼리*3.4



}