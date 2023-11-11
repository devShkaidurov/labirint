const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'gll2@vnhK',
    database : 'DBMaze'
});

function init () {
    return new Promise ((res, rej) => {
        connection.connect(err => {
            if (err)
                rej(err);
            res()
        })
    })
}

function authUser (payload) {
    const login = payload.login;
    const pass  = payload.pass;
    return new Promise ((res, rej) => {
        connection.query(`select * from Users where login = '${login}' and pass = '${pass}'`, (err, results, fields) => {
            if (err)
                rej({
                    auth    : false,
                    isAdmin : false
                });

            if (results && results.length > 0) {
                res({
                    auth    : true,
                    isAdmin : results[0].isAdmin === 0 ? false : true
                });
            } else {
                rej({
                    auth    : false,
                    isAdmin : false
                })
            }
        })
    })
}

function registerUser (payload) {
    const login = payload.login;
    const pass  = payload.pass;
    return new Promise ((res, rej) => {
        connection.query(`insert Users(login, pass, isAdmin) values ('${login}', '${pass}', 0)`, (err, results, fields) => {
            if (err && err.errno === 1062) {
                rej ({
                    register : false,
                    msg      : "Пользователь под таким логином уже существует"
                });
            }
            if (err) {
                rej ({
                    register : false,
                    msg      : "Неизвестная ошибка при регистрации"
                });
            }
            res ({
                register: true
            })
        })
    })
}

module.exports = {
    init,
    authUser,
    registerUser,
}