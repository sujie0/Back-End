module.exports = function(app){
    const user = require('./userController');

    // 1.1 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 1.2 유저 프로필 조회 API
    app.get('/app/users/profile',user.getUsers); 

    // 1.3 프로필 수정 API
    app.patch('/app/users/profile/edit', user.getUserById);

    // 1.4 유저 삭제 API
    app.patch('/app/users/userinfo/delete', user.getUserById);

    // 1.5 유저 일정 조회 API
    app.get('/app/users/listSchedules',user.getUsers); 
};
