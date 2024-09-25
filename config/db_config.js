const mysql = require('mysql');
const dbInfo = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "p#quopin",
    database: "my_db"
};

module.exports = {
    init: function () {
        return mysql.createConnection(dbInfo);
    },
    connect: function (conn) {
        conn.connect(function (err) {
            if (err) console.error('DB 연결 에러 : ' + err);
            else console.log('DB 연결 성공');
        });
    }
};