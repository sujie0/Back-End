const { application } = require('express');
const express = require('express');
const router = express.Router();

router.patch('', (req, res, next) => {
    const id = req.body.id;
    const pw = req.body.pw; //현재 비밀번호 
    const new_pw = req.body.new_pw; //변경할 새로운 비밀번호
    const new_pw_check = req.body.new_pw_check;

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

    var sql = 'SELECT * FROM user WHERE userId=?';
    con.query(sql, [id], function(err, data){
        if(data.length){
            var valid_pw = data[0].password;
            if(pw!=valid_pw){
                res.send("비밀번호가 틀립니다.");
                return;
            }
        }
    });
    if(new_pw==new_pw_check){
        var sql = 'UPDATE user SET password=? WHERE userId=?';
        con.query(sql, [new_pw, id], function(error, result){
            try{
                res.send("비밀번호 변경 완료");
            }
            catch(error){
                res.send("비밀번호 변경 오류");
            }
        });
    }
    else{
        res.send("비밀번호가 틀립니다.");
    }
    con.end();

});

module.exports = router;