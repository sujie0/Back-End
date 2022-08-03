const { application } = require('express');
const express = require('express');
const router = express.Router();

const {pool} = require("../config/database");
const baseResponse = require("../config/baseResponseStatus");
const {errResponse} = require("../config/response");
const {response}=require("../config/response");
const sql=require("../mysql/sql");
var mysql=require('mysql');


router.post('', (req, res, next) => {
    const {id, pw}=req.body;

    // DB 연결
    const connection = await pool.getConnection(async (conn) => conn);
    module.exports = connection;

    //db에서 데이터 가져오기
   // var sql = 'SELECT * from User where userId=?';
    connection.query(sql.searchUerId, [id], function(err, data){
        try{   
            var valid_id = data[0].userId;
            var valid_pw = data[0].password; 
        
            if(id==valid_id){
                if(pw==valid_pw){
                    res.send(response(baseResponse.SUCCESS));
                    //res.send("로그인 성공");
                }
                else{
                res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
                //res.send("<script>alert('비밀번호가 틀렸습니다');location.href='../routes/login\';</script>");
                }
            }
            
        }
        catch (error) {
            res.send(errResponse(baseResponse.SIGNIN_USERID_WRONG));
            //res.send("<script>alert('존재하지 않는 회원입니다!');location.href='../routes/signup\';</script>");
        }
    });

    connection.end(); //db 연결 종료
          
});


module.exports = router;