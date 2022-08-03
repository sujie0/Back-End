//IP 주소가 바뀌면 안드로이드 앱 내에 있는 url 주소도 바꿔주어야 정상 동작함
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var app = express();
var port_num = 3000;

const login = require("./routes/login");
const signup = require("./routes/signup");
const userId = require("./routes/searchUserId");
const createSchedule=require("./routes/createSchedule");

app.get("", (req, res, next) => {
  res.send("메인 페이지");
});

app.use("/login", login);
app.use("/signup", signup);
app.use("/userId", userId);
app.use("/create",createSchedule);

app.set("port", process.env.PORT || port_num);



/*
var server = http.createServer(app).listen(app.get('port'),function(){
   console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
});
*/

app.listen(3000, () => {
  console.log(app.get("port") + "port server 실행됨");
});
