const express = require("express");
const schedule = require('./scheduleController.js');
const app = express();


app.use(express.json({
        limit: '50mb'
}));
    
 app.listen(5000, () => { 
        console.log("Server started. port 5000. Schedule");
});


//test
app.get("/app/test", schedule.test); 


//3.1 일정 조회 api
app.get("/app/schedule", schedule.listSchedule);


//3.2 일정 생성 api
app.post("/app/schedule/create", schedule.createSchedule);


 //3.3 일정 멤버 추가 api
 app.post("/app/schedule/create/members", schedule.addScheduleMembers);


//3.4 일정 삭제 api
app.delete("/app/schedule/delete/:scheduleIdx", schedule.deleteSchedule);


