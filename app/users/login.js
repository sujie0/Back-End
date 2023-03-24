const { application } = require('express');
const express = require('express');
const router = express.Router();

router.post('', (req, res, next) => {
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

    //db에서 데이터 가져오기
    var sql = 'SELECT * from User where userId=?';
    con.query(sql, [id], function(err, data){
        try{   
            var valid_id = data[0].userId;
            var valid_pw = data[0].password;

            if(id==valid_id){
                if(pw==valid_pw){
                    res.send("로그인 성공");
                }
                else{
                //res.send("<script>alert('비밀번호가 틀렸습니다');location.href='../routes/login\';</script>");
                    res.send("비밀번호가 틀렸습니다.");
                }
            }
            
        }
        catch (error) {
            res.send("존재하지 않는 회원입니다.");
            //res.send("<script>alert('존재하지 않는 회원입니다!');location.href='../routes/signup\';</script>");
        }
    });

    con.end(); //db 연결 종료
          
});


module.exports = router;