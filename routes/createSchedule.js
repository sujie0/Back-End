const { application, response } = require('express');
const express = require('express');
const router = express.Router();

const {pool} = require("../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const sql=require("../mysql/sql");
var mysql=require('mysql');


router.get('', (req, res, next) => {
    const {userIdx,title,com,color,year,month,day}=req.body;

    con.connect((err) => {
        if (err) {
            console.log(err);
            con.end();
            throw err;
        } else {
            console.log("DB 접속 성공");
        }
    });

    if (!month)
        return res.send(response(baseResponse.DATESELECTION_MONTH_EMPTY));

    con.query(
        'insertScheduleData',
        [userIdx, title, com, color, start, end],function(err,result, field){
        if(err){
            console.log(err);
            connection.end();
        }
        else{
            //console.log("일정 생성이 완료되었습니다.");
            res.send("일정 생성이 완료되었습니다.");
            res.send(response(baseResponseStatus.SUCCESS));
            con.end();
        }
    });

});