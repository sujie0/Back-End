const { application, response } = require('express');
const express = require('express');
const router = express.Router();

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const sql=require("../mysql/sql");
var mysql=require('mysql');


router.get('', (req, res, next) => {
    const {userIdx,title,com,color,year,month,day}=req.body;

    if (!year)
        return res.send(response(baseResponse.DATESELECTION_YEAR_EMPTY));

    if (year.length != 4)
        return res.send(response(baseResponse.DATESELECTION_YEAR_LENGTH));

    if (!month)
        return res.send(response(baseResponse.DATESELECTION_MONTH_EMPTY));

    if (month.length != 2)
        return res.send(response(baseResponse.DATESELECTION_MONTH_LENGTH));

    if (!day)
        return res.send(response(baseResponse.DATESELECTION_DAY_EMPTY));

    if (day.length != 2)
        return res.send(response(baseResponse.DATESELECTION_DAY_LENGTH));
    

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

    con.query(
        sql.insertScheduleData,
        [userIdx, title, com, color, start, end],function(err,result, field){
        if(err){
            console.log(err);
            con.end();
        }
        else{
            //res.send("일정 생성이 완료되었습니다.");
            return response(baseResponseStatus.SUCCESS);
            con.end();
        }
    });

});