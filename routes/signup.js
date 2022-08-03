const { application, response } = require('express');
const express = require('express');
const baseResponse = require('../config/baseResponseStatus');
const { errResponse } = require('../config/response');
const router = express.Router();

const {pool} = require("../config/database");
const sql=require('../mysql/sql');
var mysql=require('mysql');
require('dotenv').config({path: 'mysql/.env'});


router.post('', (req, res, next) => {
    //웹 화면에서 입력된 data 변수에 각각 저장
    const {name, id, pw, pw_check, mail}=req.body;

    // DB 연결
    const connection = await pool.getConnection(async (conn) => conn);
    module.exports = connection;
   
    //var sql = 'SELECT * from User where userId=?';
    connection.query(sql.searchUerId, id, function(err, data){
        if(data.length){
            res.send( errResponse(baseResponseStatus.SIGNUP_REDUNDANT_USERID));
            //res.send("<script>alert('이미 존재하는 아이디입니다.');location.href='../routes/signup\';</script>");
            res.end();
            connection.end();
        }
        else{
            if(name&&id&&pw&&mail){
                if(pw==pw_check){
                    connection.query(sql.insertUserData,[name, id, pw, mail],function(err,result, field){
                        if(err){
                            console.log(err);
                            connection.end();
                        }
                        else{
                            //console.log("db에 데이터 저장 성공");
                            res.send(response(baseResponseStatus.SUCCESS));
                            //res.send("<script>alert('회원가입이 완료되었습니다');location.href='../routes/login\';</script>");
                            connection.end();
                        }
                    });
                }
                else{
                    res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
                    //res.send("<script>alert('비밀번호를 잘못 입력했습니다');location.href='../routes/signup\';</script>");
                    connection.end();
                }
            }
            else{
                res.send(errResponse(baseResponse.SIGNUP_EMPTY ));
                //res.send("<script>alert('모든 항목을 작성해주세요');location.href='../routes/signup\';</script>");
                connection.end();
            }
        }
    });
});

module.exports = router;