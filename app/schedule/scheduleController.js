const express = require("express");
const mysql = require("./mysql");
require('dotenv').config({path: 'mysql/.env'});
const app = express();
const baseResponse = require("../../../config/baseResponseStatus");/*baseResponseStatus를 baseresponse라는 변수로 받아오고 있음*/
const {response, errResponse} = require("../../../config/response");


//3.1 일정 조회 api
exports.listSchedule = async function (req, res) {
    const schedule = await scheduleDao(req.body.param)
}