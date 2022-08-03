const { application, response } = require('express');
const express = require('express');
const router = express.Router();

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


router.get('', (req, res, next) => {
    var userIdx=req.query.userIdx;
    var title=req.query.title;
    var com=req.query.com;
    var color=req.query.color;
    var start=req.query.start;
    var end=req.query.end;

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
        'insertScheduleData',
        [userIdx, title, com, color, start, end],function(err,result, field){
        if(err){
            console.log(err);
            con.end();
        }
        else{
            //console.log("일정 생성이 완료되었습니다.");
            res.send("일정 생성이 완료되었습니다.");
            res.send(response(baseResponseStatus.SUCCESS));
            con.end();
        }
    });

});