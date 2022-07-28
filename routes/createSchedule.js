const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    var userIdx=req.query.userIdx;
    var title=req.query.title;
    var com=req.query.com;
    var color=req.query.color;
    var start=req.query.start;
    var end=req.query.end;

    var mysql=require('mysql');
    var con=mysql.createConnection({
        host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: '12345678',
        database: 'timetuning'
    });

    con.connect((err) => {
        if (err) {
            console.log(err);
            con.end();
            throw err;
        } else {
            console.log("DB 접속 성공");
        }
    });

    module.exports = con;

    con.query('INSERT INTO Schedule(userIdx,scheduleTitle,scheduleCom,scheduleColor,startYMD,endYMD) VALUES (?, ?, ?, ?, ?, ?)',[userIdx, title, com, color, start, end],function(err,result, field){
        if(err){
            console.log(err);
            con.end();
        }
        else{
            //console.log("일정 생성이 완료되었습니다.");
            res.send("일정 생성이 완료되었습니다.");
            con.end();
        }
    });

});