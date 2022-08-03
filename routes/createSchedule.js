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
    
     // DB 연결
     const connection = await pool.getConnection(async (conn) => conn);
     module.exports = connection;
    
    connection.query(
        sql.insertScheduleData,
        [userIdx, title, com, color, start, end],function(err,result, field){
        if(err){
            console.log(err);
            connection.end();
        }
        else{
            //res.send("일정 생성이 완료되었습니다.");
            connection.end();
            return response(baseResponseStatus.SUCCESS);
        }
    });

});