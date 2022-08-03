const express = require("express");
const mysql = require("./mysql");
require('dotenv').config({path: 'mysql/.env'});
const app = express();

//일정 생성 라우터
app.post("/schedule/create", async (req, res) => {
    const result = await mysql.query('scheduleCreate', req.body.param);
    res.send(result);
})
/*일정생성 라우터 postman 입력 형식
[
    {
        "scheduleIdx":   ,
        "userIdx": " ",
        "scheduleTitle": " ",
        "scheduleCom": " ",
        "scheduleColor": " ",
        "startYMD": " ",
        "endYMD": " "
    }
]
*/

//아이디 조회 라우터
app.get("/searchusers", async (req, res) => {
    console.log(req.body);
    const result = await mysql.query('searchUser', req.body.param);
    res.send(result);
    
});



