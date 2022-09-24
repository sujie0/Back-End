const mysql = require("../mysql");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");



//3.0 test
exports.test = async function (req, res) {
    console.log("schedule test success");
    res.send("schedule test success");
};



//3.1 유저 일정 조회 -> 오류 있음
exports.listSchedule = async function (req, res) {

    const{userIdx} = req.params;
    const scheduleList = await mysql.query('listSchedule', userIdx);
    if(!scheduleList){
        res.send("조율중인 일정이 없습니다.");
        console.log("조율중인 일정이 없습니다.");
    }
    else{
        res.send(scheduleList);
        console.log(response(baseResponse.SUCCESS_UNFIXED_SCHEDULE));
    }
};




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
        res.send(response(baseResponse.SUCCESS_SCHEDULE, newSchedule));
        console.log(response(baseResponse.SUCCESS_SCHEDULE, newSchedule));
    }
};





//3.3 일정 멤버 추가 api
exports.addScheduleMembers = async function (req, res) {

    const unfixedSchedule = req.body.scheduleIdx;
    const newMemberId = req.body.userId;

    const [idSearchResult] = await mysql.query('searchMember', newMemberId);

    if(!newMemberId){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_EMPTY));
        console.log(baseResponse.SEARCH_USER_USERID_EMPTY);
    }
    else if(!idSearchResult){
        res.send(errResponse(baseResponse.SEARCH_USER_USERID_NOT_EXIST));
        console.log(baseResponse.SEARCH_USER_USERID_NOT_EXIST);
    }
    else{
        mysql.query('addMember', [unfixedSchedule, idSearchResult.userIdx]);
        res.send(response(baseResponse.SUCCESS_SCHEDULE_MEMBER, idSearchResult));
        console.log(response(baseResponse.SUCCESS_SCHEDULE_MEMBER, idSearchResult));
    }
};




//3.4 일정 삭제
exports.deleteSchedule = async function (req, res) {
    const {scheduleIdx} = req.params;
    const deleteResult = await mysql.query('scheduleDelete', scheduleIdx);
    res.send(response(baseResponse.SUCCESS_DELETE_SCHEDULE, deleteResult));
    console.log(response(baseResponse.SUCCESS_DELETE_SCHEDULE));
};