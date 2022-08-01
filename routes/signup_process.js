const { application, response } = require('express');
const express = require('express');
const baseResponseStatus = require('../config/baseResponseStatus');
const { errResponse } = require('../config/response');
const router = express.Router();

const mysql = require("./mysql");
require('dotenv').config({path: 'mysql/.env'});


router.post('', (req, res, next) => {
    //웹 화면에서 입력된 data 변수에 각각 저장
    var name=req.body.name;
    var id=req.body.id;
    var pw=req.body.pw;
    var pw_check=req.body.pw_check;
    var mail=req.body.mail;

    var mysql=require('mysql');
    var con=mysql.createConnection({
        host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: '12345678',
        database: 'timetuning'
    });

    con.connect((err)=>{
        if(err){
            console.log(err);
            con.end();
            throw err;
        }
        else{
            console.log("DB 연결 성공");
        }
    });
    module.exports=con;
   
    var sql = 'SELECT * from User where userId=?';
    con.query(sql, id, function(err, data){
        if(data.length){
            res.send( errResponse(baseResponseStatus.SIGNUP_REDUNDANT_USERID));
            res.send("<script>alert('이미 존재하는 아이디입니다.');location.href='../routes/signup\';</script>");
            res.end();
            con.end();
        }
        else{
            if(name&&id&&pw&&mail){
                if(pw==pw_check){
                    con.query('insertUserData',[name, id, pw, mail],function(err,result, field){
                        if(err){
                            //res.send(errResponse(baseResponseStatus. ))
                            console.log(err);
                            con.end();
                        }
                        else{
                            //console.log("db에 데이터 저장 성공");
                            res.send(response(baseResponseStatus.SUCCESS));
                            res.send("<script>alert('회원가입이 완료되었습니다');location.href='../routes/login\';</script>");
                            con.end();
                        }
                    });
                }
                else{
                    //res.send(errResponse(baseResponseStatus.));
                    res.send("<script>alert('비밀번호를 잘못 입력했습니다');location.href='../routes/signup\';</script>");
                    //console.log("비밀번호를 잘못 입력했습니다.");
                    con.end();
                }
            }
            else{
                //res.send(errResponse(baseResponseStatus. ));
                res.send("<script>alert('모든 항목을 작성해주세요');location.href='../routes/signup\';</script>");
                //console.log("빈 항목이 존재합니다");
                con.end();
            }
        }
    });
});

module.exports = router;