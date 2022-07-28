//회원가입 페이지 구현
const { application } = require('express');
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
});
module.exports = router;