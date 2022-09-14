module.exports = {

//1. auth


//2. login


 //3. schedule

    //스케줄 조회 쿼리*3.1
    listSchedule: `SELECT * FROM Schedule WHERE userIdx = ?`,

    //스케줄 생성 쿼리*3.2
    insertScheduleData:`INSERT INTO Schedule (scheduleTitle, userIdx, scheduleCom, scheduleColor, startYMD, endYMD) 
	VALUES (?, (SELECT userIdx FROM User WHERE userIdx=?), ?, ?, ?, ?)`,

    //스케줄 멤버에 추가*3.3
    addMember: `INSERT INTO ScheduleMember (scheduleIdx, userIdx)
	            SELECT Schedule.scheduleIdx, User.userIdx
                FROM Schedule, User
                WHERE Schedule.scheduleIdx=? AND User.userIdx=?`,

    //멤버 검색 쿼리*3.3
    searchMember: `SELECT userIdx, userId, userName FROM User WHERE userId = ?`,

    //스케줄 삭제 쿼리*3.4
    scheduleDelete: `DELETE FROM Schedule WHERE scheduleIdx = ?`


}