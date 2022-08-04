const { application } = require('express');
const express = require('express');
const router = express.Router();

const userProvider = require("../app/users/userProvider");
const userService = require("../app/users/userService");
const baseResponse = require("../config/baseResponseStatus");
const {response, errResponse} = require("../config/response");

// 1.1 유저 생성 (회원가입) API
exports.postUsers = async function (req, res) {

    const name = req.body.name;
    const id = req.body.id;
    const pw = req.body.pw;
    const pw_check = req.body.pw_check;
    const email = req.body.email;

    // 빈 값 체크
    if (name&&id&&pw&&pw_check&&email){

        // 비밀번호와 비밀번호 확인이 맞는지 체크
        if(pw!=pw_check)
            return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_NOT_MATCH));
    }
    else
        return res.send(errResponse(baseResponse.SIGNUP_EMPTY));

    const signUpResponse = await userService.createUser(
        email,
        pw,
        id,
        name
    );

    return res.send(signUpResponse);
};

// 1.2 프로필 조회 api (+id로 검색 조회)
exports.getProfile = async function (req, res) {

    const id = req.query.id;

    if (!id) return res.send(errResponse(baseResponse.SEARCH_USERUSER_USERID_NOT_EXIST));

    const userProfileById = await userProvider.retrieveUser(id);
    return res.send(response(baseResponse.SUCCESS, userProfileById));
    
};

// 1.3 프로필 수정 api
exports.patchProfile = async function (req, res) {

    const id = req.params.id;
    const name = req.body.name;

    
    if(id&&name){
        const editUserInfo = await userService.editUser(id, name)
        return res.send(editUserInfo);
    }
    else
        return res.send(errResponse(baseResponse.SEARCH_USERUSER_USERID_NOT_EXIST));
}

// 1.4 유저 삭제 api
exports.patchDelete = async function (req, res) {

    const id = req.params.id;

    if (!id) return res.send(errResponse(baseResponse.SEARCH_USERUSER_USERID_NOT_EXIST));

    const deleteUser = await userService.deleteUser(id);
    return res.send(deleteUser);
};


// 1.5 유저 일정 조회 api
exports.getSchedul = async function (req, res) {

    const id = req.query.id;

    if (!id) return res.send(errResponse(baseResponse.SEARCH_USERUSER_USERID_NOT_EXIST));
    
    const scheduleListbyId = await userService.scheduleListbyId(id);
    return res.send(scheduleListbyId);
};
