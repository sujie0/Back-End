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


//3.1 유저 일정 조회 *
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

   const {scheduleTitle, scheduleCom, scheduleColor, startYMD, endYMD} = req.body.param;

    try{
        newSchedule = await mysql.query('insertScheduleData', req.body.param);
        console.log(newSchedule);
        res.send(newSchedule);
    }
    catch(error){
        console.log(baseResponse.CREATESCHEDULE_EMPTY)
        res.send(errResponse(baseResponse.CREATESCHEDULE_EMPTY));
    }
};
//scheduleTitle, startYMD, endYMD를 입력하지 않을 경우 오류가 나야하는데 scheduleTitle에서 나지 않음
//로그인된 userIdx를 가져와야함




//3.3 일정 멤버 추가 api
exports.addScheduleMembers = async function (req, res) {

    const [idSearchResult] = await mysql.query('searchMember', req.body.param);//검색한 회원의 정보 조회

    if(!req.body.param){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_EMPTY));
        console.log(baseResponse.SEARCH_USER_USERID_EMPTY);
    }
    else if(!idSearchResult){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_NOT_EXIST));
        console.log(baseResponse.SEARCH_USER_USERID_NOT_EXIST);
    }
    else{
        //res.send(idSearchResult);
        console.log(idSearchResult);//userIdx, userId, userName 받아옴 -> schedulemember에 추가해야함
        const SchedulememberResult = await mysql.query('addMember', req.body.param);
        res.send(SchedulememberResult);
        console.log(SchedulememberResult);
    }
};




//3.4 일정 삭제 -> 라우트