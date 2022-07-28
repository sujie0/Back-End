//IP 주소가 바뀌면 안드로이드 앱 내에 있는 url 주소도 바꿔주어야 정상 동작함
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var app = express();
var port_num = 3000;

const login = require("./routes/login");
const login_process=require("./routes/login_process");
const signup = require("./routes/signup");
const signup_process=require("./routes/signup_process");
const userId = require("./routes/searchUserId");
const createSchedule=require("./routes/createSchedule");

app.get("", (req, res, next) => {
  res.send("메인 페이지");
});

app.use("/login", login);
app.use("/login_process",login_process);
app.use("/signup", signup);
app.use("/signup_process",signup_process);
app.use("/userId", userId);
app.use("/create",createSchedule);

app.set("port", process.env.PORT || port_num);


app.use(function (req, res, next) {
  console.log("일정 제목, 일정 설명, 가능한 날들 받아오기");
  var approve = { "일정 제목": "NO", "일정 설명": "NO", "선택된 날짜": "NO" };

  var paramName = req.body.name;
  var paramExplain = req.body.explain;
  var paramYear = req.body.year;
  var paramMonth = req.body.month;
  var paramDay = req.body.day;

  if (!paramYear)
    return res.send(response(baseResponse.DATESELECTION_YEAR_EMPTY));

  if (paramYear.length != 4)
    return res.send(response(baseResponse.DATESELECTION_YEAR_LENGTH));

  if (!paramMonth)
    return res.send(response(baseResponse.DATESELECTION_MONTH_EMPTY));

  if (paramMonth.length != 2)
    return res.send(response(baseResponse.DATESELECTION_MONTH_LENGTH));

  if (!paramDay)
    return res.send(response(baseResponse.DATESELECTION_DAY_EMPTY));

  if (paramDay.length != 2)
    return res.send(response(baseResponse.DATESELECTION_DAY_LENGTH));

  console.log(
    "일정 제목 : " +
      paramName +
      "  일정 설명 : " +
      paramExplain +
      " 선택된 날짜 : " +
      paramYear +
      "년 " +
      paramMonth +
      "월 " +
      paramDay +
      "일"
  );

  res.send(approve);
});

/*
var server = http.createServer(app).listen(app.get('port'),function(){
   console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
});
*/

app.listen(3000, () => {
  console.log(app.get("port") + "port server 실행됨");
});
