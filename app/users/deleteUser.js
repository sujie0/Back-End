const { application } = require('express');
const express = require('express');
const router = express.Router();

var user_id;
var user_pw;

router.delete('', (req, res, next) => {
    var id=req.body.id;    //웹 페이지에서 입력 받은 id
    var pw=req.body.pw;    //웹 페이지에서 입력 받은 pw
    
    var mysql = require('mysql');
    // DB 연결
    var con = mysql.createConnection({
        host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: 'timetuningrdspassword',
        database: 'timetuning'
    });

    // 데이터 베이스가 연결되었는지 확인
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

    var sql = 'SELECT * FROM User WHERE userId=?';
    con.query(sql, [id], function(error, result){
        try{
            var valid_id = result[0].userId;
            var sql = 'DELETE FROM User WHERE userId=?';
            con.query(sql, [id], function(err, data){
            try{
                res.send("회원 탈퇴가 완료되었습니다.");
            }
            catch(err){
                res.send("탈퇴 오류");
            }
            });
        }
        catch(error){
            res.send("존재하지 않는 회원입니다.");
            return;
        }
    });
  
});


module.exports = router;