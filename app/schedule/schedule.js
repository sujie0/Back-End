const express = require("express");
const mysql = require("./mysql");
const sequelize = require('./models').sequelize;
const app = express();

sequelize.sync();

const{Schedule} = require('./models');
const { scheduleList } = require("../../mysql/sql");


app.use(express.json({
    limit: '50mb'
}));

app.listen(3306, () => {
    console.log('Server started. port 3306.');
});


//3.1 일정 조회 api(확정된 일정)
/*sequelize
app.get("/app/schedule", async(req, res) => {
    console.log("일정 생성 api")
    const fixedScheduleData = await Schedule.findAll();
    console.log(fixedScheduleData);
    res.send(fixedScheduleData); 
});*/
app.get("/api/schedule", async (req,res) => {
    const fixedSchedule = await mysql.query(scheduleList);
    console.log(fixedSchedule);
    res.send(fixedSchedule);
})


//3.2 일정 생성 api
app.post("/app/schedule/create", async(req, res) => {
    const newScheduleInfo = await mysql.query(scheduleList)
})

//3.4 일정 삭제 api
app.delete("/app/schedule/delete")

