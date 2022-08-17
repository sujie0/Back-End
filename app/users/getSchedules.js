const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    var id = req.query.id;
    console.log("id : ",id);

    var mysql = require('mysql');
    // DB 연결
    var con = mysql.createConnection({
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

    // userIdx로 하는건 안됨..
    // userId로 하는건 됨
    var sql = 'SELECT * FROM schedule WHERE userId=?'
    con.query(sql, [id], function(err, data){
        try{
            for(var i = 0; i < data.length ; i++){
            //var title = data[i].scheduleTitle;
            //var com = data[i].scheduleCom;
            //var color = data[i].scheduleColor;
            //var start = data[i].startYMD;
            //var end = data[i].endYMD;
            console.log("title : ",data[i].scheduleTitle, "Com : ", data[i].scheduleCom, "Color : ",data[i].scheduleColor, "start : ",data[i].startYMD, "end : ",data[i].endYMD);
            }
            res.send("일정 존재");
        }
        catch(err){
            res.send("일정이 존재하지 않습니다.");
        }
    });
    con.end();
    
});


module.exports = router;
