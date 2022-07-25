//회원가입 페이지 구현
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    var title = '회원가입';
    var description = "환영합니다! : )";
    var html = `
    <!doctype html> 
    <html> 
    <head><title>${title}</title> <meta charset="utf-8"></head> 
    <body>
        <h2>회원 가입</h2>
        <form action = "/signup/done" method = "post">
        <ul>
            <p> 이름  
            <input type = "text" name = "name" placeholder = "name">
            </p>
        </ul>
        <ul>
            <p> 사용하실 ID  
            <input type = "text" name = "id" placeholder = "id">
            </p>
        </ul>
        <ul>
            <p> 비밀번호  
            <input type = "text" name = "pw" placeholder = "pw">
            </p>
        </ul>
        <ul>
            <p> 비밀번호 확인 
            <input type = "text" name = "pw_check" placeholder = "pw_check">
            </p>
        </ul>
        <ul>
            <p> E-mail 주소
            <input type = "text" name = "mail" placeholder = "mail" value = "###@mail.com">
            </p>
        </ul>
        <p>
            <input type="submit" value = "가입하기">
        </p>
        </form>

    </body> 
    </html>
    `;
    res.writeHead(200);
    res.end(html);

    res.send("라우팅을 이용하여 signup 페이지에 접속");
});

/*이미 존재하는 id를 회원가입할 때 입력하는 경우에 대한 예외처리 필요*/

//회원가입을 성공적으로 완료한 경우
router.get('/done', (req, res, next) => {
// 이 부분에서 데이터를 db로 넘기기

    res.send("회원가입이 완료되었습니다!");
    var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post)); 
            var keys = Object.keys(obj);
            
            var mysql = require('mysql');

            // 데이터 베이스 정보 불러오기
            var con = mysql.createConnection({
                host: '', 
                port: '',
                user: '', 
                password: '',
                database: ''
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

            // sql문
            var sql = 'INSERT INTO new_table(user_name, user_id, user_pw, user_email) VALUES(?,?,?,?)';
            var params = [obj[keys[0]],obj[keys[1]],obj[keys[2]],obj[keys[3]]]
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log(err);
                } else{
                    console.log(rows.name);
                }
            });

            con.end();


            // 전송 후 첫화면으로 돌아가기
            response.writeHead(302, {Location : '/'});
            response.end();
        });

});

module.exports = router;