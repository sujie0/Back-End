const express = require("express");
const mysql = require("../mysql");
const app = express();
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");



//test
exports.test = async function (req, res) {
    console.log("test success");
    res.send("test success");
};



//3.1 유저 일정 조회 
exports.listSchedule = async function (req, res) {

    const scheduleList = await mysql.query('listSchedule', req.body.param);

    if(!scheduleList) {
        console.log('empty schedule');
        res.send("empty schedule");
    }
    else{
        console.log(scheduleList);
        res.send(scheduleList);
    }
};
//L12. const [scheduleList] -> 모든 일정이 출력되지 않음. 하나만 출력됨
//L12. const scheduleList -> 스케줄이 없을 경우 empty scheule 안됨




//3.2 일정 생성
exports.createSchedule = async function (req, res) {
    
    const title = req.body.scheduleTitle;
    const user = req.body.userIdx
    const comment = req.body.scheduleCom;
    const color = req.body.scheduleColor;
    const start = req.body.startYMD;
    const end = req.body.endYMD;

    if(!title){
        console.log(errResponse(baseResponse.SCHEDULE_TITLE_EMPTY));
        res.send(errResponse(baseResponse.SCHEDULE_TITLE_EMPTY));
    }
    else if(!start){
        console.log(errResponse(baseResponse.SCHEDULE_STARTYMD_EMPTY));
        res.send(errResponse(baseResponse.SCHEDULE_STARTYMD_EMPTY));
    }
    else if(!end){
        console.log(errResponse(baseResponse.SCHEDULE_ENDYMD_EMPTY));
        res.send(errResponse(baseResponse.SCHEDULE_ENDYMD_EMPTY));
    }
    else{
        newSchedule = await mysql.query('insertScheduleData', [title, user, comment, color, start, end]);
        console.log(newSchedule);
        res.send(newSchedule);
        console.log(response(baseResponse.SUCCESS_SCHEDULE));
    }
};





//3.3 일정 멤버 추가 api
exports.addScheduleMembers = async function (req, res) {

    const unfixedSchedule = req.body.scheduleIdx;
    const newMemberId = req.body.userId;

    const [idSearchResult] = await mysql.query('searchMember', newMemberId);//검색한 회원의 정보 조회

    if(!newMemberId){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_EMPTY));
        console.log(baseResponse.SEARCH_USER_USERID_EMPTY);
    }
    else if(!idSearchResult){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_NOT_EXIST));
        console.log(baseResponse.SEARCH_USER_USERID_NOT_EXIST);
    }
    else{
        console.log(idSearchResult);
        res.send(idSearchResult);
        mysql.query('addMember', [unfixedSchedule, idSearchResult.userIdx]);
        console.log(response(baseResponse.SUCCESS))
    }
};




//3.4 일정 삭제 -> 라우트