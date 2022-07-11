//IP 주소가 바뀌면 안드로이드 앱 내에 있는 url 주소도 바꿔주어야 정상 동작함

var express = require('express');
var http = require('http');
var bodyParser= require('body-parser');
var app = express();
var port_num = 3000;

app.set('port',process.env.PORT || port_num);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    console.log('일정 제목, 일정 설명, 가능한 날들 받아오기');
    var approve ={'일정 제목':'NO','일정 설명':'NO','선택된 날짜': 'NO'};

    var paramName = req.body.name;
    var paramExplain = req.body.explain;
    var paramDates = new Array();
    paramDates = req.body.dates;
    console.log('일정 제목 : '+paramName+'  일정 설명 : '+paramExplain+' 선택된 날짜 : '+paramDates);
   

    res.send(approve);

});

var server = http.createServer(app).listen(app.get('port'),function(){
   console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
});
