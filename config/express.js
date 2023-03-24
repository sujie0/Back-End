const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
var bodyParser= require('body-parser');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());

    app.use(bodyParser.urlencoded({extended:false}));
    
    app.use(bodyParser.json());
    // app.use(express.static(process.cwd() + '/public'));

    /* App (Android, iOS) */
    // 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../app/users/userRoute')(app);
    require('../app/schedule/scheduleRoute')(app);

    return app;
};