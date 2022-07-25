//로그인 페이지 구현
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    var title = '로그인';
    var description = "ID와 PW를 입력해주세요.";
    var html = `
    <!doctype html> 
    <html> 
    <head><title>${title}</title> <meta charset="utf-8"></head> 
    <body>
        <h2>로그인</h2>
        <form action = "/login/done" method = "post">
        <ul>
            <p> ID
            <input type = "text" name = "id" placeholder = "id">
            </p>
        </ul>
        <ul>
            <p> PW
            <input type = "text" name = "pw" placeholder = "pw">
            </p>
        </ul>
        <p>
            <input type="submit" value = "로그인">
        </p>
        </form>

    </body> 
    </html>
    `;

    res.writeHead(200);
    res.end(html);

    //res.send("라우팅을 이용하여 login 페이지에 접속");
});

// 로그인 성공적으로 완료되었는지 판단
router.get('/done', (req, res, next) => {
    var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post));
            var keys = Object.keys(obj);

            var mysql = require('mysql');
           
            // DB 연결
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

            var sql = 'SELECT user_id, user_pw FROM tb_user WHERE user_id = ?';
            var params = [obj[keys[0]]];
            con.query(sql, params, function(err, result){
                try {
                    var input_id = obj[keys[0]];
                    var input_pw = obj[keys[1]];

                    var valid_id = result[0].user_id;
                    var valid_pw = result[0].user_pw;

                    if(input_id === valid_id){
                        if(input_pw === valid_pw){
                            console.log('로그인이 완료되었습니다.');
                            con.end();
                            response.writeHead(302, {Location : '/'});
                            response.end();
                            
                        } else {
                            console.log('비밀번호가 틀렸습니다.');
                            con.end();
                            response.writeHead(302, {Location : '/routes/login'});
                            response.end();

                        };
                    }                    
                } catch (error) {
                    console.log('존재하지 않는 회원입니다');
                    con.end();
                    response.writeHead(302, {Location : '/routes/signup'});
                    response.end();
                }
            });
            
        });
});

module.exports = router;