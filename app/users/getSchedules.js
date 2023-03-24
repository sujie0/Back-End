const { application } = require('express');
const express = require('express');
const router = express.Router();


router.get('', (req, res, next) => {
    var id = req.query.id;
    //console.log("id : ",id);

    var mysql = require('mysql');
    // DB 연결
    var con = mysql.createConnection({
        host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: 'timetuningrdspassword',
        database: 'timetuning'
    });
    var con2 = mysql.createConnection({
        host: 'timetuning.cwrxmkgsy5uc.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: '12345678',
        database: 'timetuning'
    });

    // 데이터 베이스가 연결되었는지 확인
    con.connect((err) => {
        if (err) {
            console.log(err);
            con.end();
            throw err;
        } else {
            console.log("DB 접속 성공->getSchedule");
        }
    });
    module.exports = con;

    var sql2 = 'SELECT * FROM User WHERE userId=?'
    var sql = 'SELECT * FROM Schedule WHERE userIdx=?'
    
    con2.query(sql2, [id], function(error, result){
        try{
            var idx = result[0].userIdx;
            con.query(sql, [idx], function(err, data){
                try{
                    for(var i = 0; i < data.length ; i++){
                    console.log("title : ",data[i].scheduleTitle, "Com : ", data[i].scheduleCom, "Color : ",data[i].scheduleColor, "start : ",data[i].startYMD, "end : ",data[i].endYMD);
                    }
                    res.send("일정 존재");
                }
                catch(err){
                    res.send("일정이 존재하지 않습니다.");
                }
            });
            con.end();
        }
        catch(error){
            res.send("존재하지 않는 회원입니다.");
        }
    });
    
    con2.end();
    
});


module.exports = router;
