module.exports = function(app) {

        const express = require("express");
        const schedule = require('./scheduleController.js');
        const app = express();

        //3.1 일정 조회 api
        app.get("/app/schedule", schedule.listSchedule);

        //3.2 일정 생성 api
        app.post("/app/schedule/create", schedule.createSchedule);

        //3.3 일정 수정 api
        app.patch("schedule/edit", schedule.editSchedule)

        //3.4 일정 삭제 api
        app.patch("schedule/delete", schedule.deleteSchedule)

}