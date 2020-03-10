var mysql = require("mysql");
var setting = require("./settings");
var connection;
var connectionmysql = function () {
    connection = mysql.createConnection({
        host: setting.host,
        port: setting.port,
        user: setting.user,
        password: setting.pwd,
        database: setting.base
    });
}
connectionmysql();//初始化连接数据库
exports.select = function (str, callback) {
    connectionmysql();//重新连接
    connection.query(str, function (err, res) {
        if (err) throw err;
        callback(res)
        connection.end();//关闭服务器
    })
}
exports.findblog = function (str,params,callback) {
    connectionmysql();//重新连接
    connection.query(str,params, function (err, res) {
        if (err) throw err;
        callback(res)
        connection.end();//关闭服务器
    })
}
exports.userlogin=function (str,params,callback){
    connectionmysql();//重新连接
    connection.query(str,params, function (err, res) {
        if (err) throw err;
        callback(res)
        connection.end();//关闭服务器
    })
}
