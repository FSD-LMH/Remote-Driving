const { WebSocketServer } = require('ws');
const dbConfig = require('./config/db_config.js');
const conn = dbConfig.init();

dbConfig.connect(conn);

module.exports = (server) => {

    const wss = new WebSocketServer({ port: server });

    wss.on('connection', (ws, req) => {

        ws.on('message', (message) => {
            console.log(`Received from client ${message}`);
        });

        ws.on('error', (err) => {
            console.error(err);
        });

        ws.on('close', () => {
            console.log('접속 해제');
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                var sql = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
                conn.query(sql, function (err, rows, fields) {
                    if (err) {
                        console.log('Query is not excuted. Select fail ...\n' + err);
                    } else {
                        ws.send(JSON.stringify(rows));
                    }
                });
            }
        }, 500);
    });
};

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     console.log('새로운 사용자가 연결되었습니다.');

//     socket.on('chat message', (msg) => {
//         console.log('수신자 메시지:', msg);
//         io.emit('chat message', msg);
//     });
// });

// const port = 3000;
// server.listen(port, () => {
//     console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
// });