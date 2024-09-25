const express = require('express');
const app = express();
const socket = require('./socket.js');
// const dbConfig = require('./config/db_config.js');
// const conn = dbConfig.init();

const port = 3000;

socket(3001);
// dbConfig.connect(conn);

app.set('port', process.env.PORT || port);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});