module.export = {
    scheduleList: `SELECT * FROM schudule `,//스케줄 정보 조회
    scheduleCreate: `INSERT INTO schedule SET ?`,//스케줄 생성

    addMember: `INSERT INTO schedulemembers (userIdx, userId, userName, scheduleIdx)
                SELECT userIdx, userId, userName FROM users 
                SELECT scheduleIdx FROM schedule
                WHERE id = ?`,//아이디 검색으로 스케줄 멤버에 추가(쿼리 오류 확인 안해봄)
};