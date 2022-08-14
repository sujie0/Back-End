module.exports ={

    //Success-1000번대
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    SUCCESS_SIGNUP : { "isSuccess": true, "code": 1001, "message": "회원가입 성공"},


    //Request error-2000번대

        //날짜 입력 오류/2000번대
    CREATESCHEDULE_EMPTY: { "isSuccess": false, "code": 2001, "message":"모든 항목을 입력해주세요." },


        //회원가입 입력 오류(아이디, 이름, 이메일, 비밀번호)-2100번대
/*  SIGNUP_USERID_EMPTY : { "isSuccess": false, "code": 2101, "message":"아이디를 입력해주세요" },
    SIGNUP_USERID_LENGTH : { "isSuccess": false, "code": 2102, "message":"아이디는 30자리 미만으로 입력해주세요." },
    SIGNUP_USERNAME_EMPTY : {"isSuccess": false, "code": 2103, "message":"이름을 입력해주세요"},
    SIGMUP_USERNAME_LENGTH : {"isSuccess": false, "code": 2104, "message": "이름은 10자리 미만으로 입력해주세요."},
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2105, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2106, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2107, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2108, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2109, "message":"비밀번호는 6~20자리를 입력해주세요." }, */
    SIGNUP_EMPTY : { "isSuccess": false, "code": 2110, "message": "모든 항목을 입력 해주세요." },
    SIGNUP_PASSWORD_NOT_MATCH : { "isSuccess": false, "code": 2111, "message": "비밀번호가 일치하지 않습니다." },

        //로그인 입력오류-2200번대
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2201, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2202, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2203, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2204, "message": "비밀번호를 입력 해주세요." },

        //회원검색-2300번대
    SEARCH_USER_USERID_EMPTY : { "isSuccess": false, "code": 2301, "message": "Id를 입력해주세요." },
    SEARCH_USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2302, "message": "해당 회원이 존재하지 않습니다." },

    // Response error/3000번대
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"이미 사용중인 이메일입니다." },
    SIGNUP_REDUNDANT_USERID : { "isSuccess": false, "code": 3002, "message":"이미 사용중인 아이디입니다." },//회원가입 중복 오류

    SIGNIN_USERID_WRONG : { "isSuccess": false, "code": 3003, "message": "존재하는 아이디가 없습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "잘못된 비밀번호입니다." },//로그인

    //Connection, Transaction 등의 서버 오류/4000번대
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},

}