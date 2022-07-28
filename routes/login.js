//로그인 페이지 구현
const { application } = require('express');
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
});
module.exports = router;