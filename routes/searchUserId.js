//user id를 통해 특정 유저를 찾는 페이지 구현
const express = require("express");
const router = express.Router();

const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponseStatus = require("../config/baseResponseStatus");


router.get("/search", async function (req, res, next) {
  res.send("라우팅을 이용하여 user id 검색 페이지에 접속");

  const search = req.query.userId;
  const input_user_id = req.query.user_id;

  let result = await models.user.findOne({
    where: {
      user_id: input_user_id,
    },
  });

  let search_result = await models.users.findAll({
    where: {
      user_id: {
        [Op.like]: "%${search}$%",
      },
    },
  });

  if (search_result.length != 0) {
    try {
      res.send({
        message: "Search results",
        status: "success",
        data: {
          search,
          search_result,
        },
      });
    } catch (err) {
      res.send({
        message: "ERROR",
        status: "fail",
      });
    }
  } else {
    res.send({
      message: "검색 결과가 없습니다.",
      status: "null",
    });
  }
});

module.exports = router;
