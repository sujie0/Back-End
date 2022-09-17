module.exports = function(app){

const schedule = require('./scheduleController.js');


//3.0 test
app.get("/schedule/test", schedule.test); 


//3.1 일정 조회 api
app.get("/schedule/:userIdx", schedule.listSchedule);


//3.2 일정 생성 api
app.post("/schedule/create", schedule.createSchedule);


 //3.3 일정 멤버 추가 api
 app.post("/schedule/create/members", schedule.addScheduleMembers);


//3.4 일정 삭제 api
app.delete("/schedule/delete/:scheduleIdx", schedule.deleteSchedule);


}