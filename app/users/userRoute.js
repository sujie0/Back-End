module.exports = function(app){
    const signup = require('./signup');
    const login = require('./login');
    const deleteUser = require('./deleteUser');
    const changePassword = require('./changePassword');
    const getSchedules = require('./getSchedules');
    
    //0. test
    app.get("/user/test", async(req,res) => {
        console.log("user test success");
        res.send("user test success");
    }); 

    // 1. 유저 생성 (회원가입) API -> OK
    app.use('/users', signup);

    // 2. 비밀번호 변경 API -> OK
    app.use('/users/password/edit', changePassword);

    // 3. 유저 삭제 API -> OK
    app.use('/users/userinfo/delete', deleteUser);

    // 4. 유저 일정 조회 API -> userId로 하는건 되는데 userIdx로 하는건 안됨
    app.use('/users/listSchedules', getSchedules);
    
    // 5. 로그인 API -> OK
    app.use('/users/login', login);
};
