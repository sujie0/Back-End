//user id를 통해 특정 유저를 찾는 페이지 구현
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    res.send("라우팅을 이용하여 user id 검색 페이지에 접속");
});

module.exports = router;