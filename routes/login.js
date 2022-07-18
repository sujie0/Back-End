//로그인 페이지 구현
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    res.send("라우팅을 이용하여 login 페이지에 접속");
});

router.get('/done', (req, res, next) => {
    res.send("로그인이 완료되었습니다!");
});

module.exports = router;