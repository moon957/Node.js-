var mysql = require("../MySQL/Connection");
var sql = require("../MySQL/sql");
module.exports = {
    title: function () {
        return new Promise(function (resolve) {
            mysql.select(sql.findtitle, function (result) {
                resolve(result);
            });
        })
    },
    userinfo: function () {
        return new Promise(function (resolve) {
            mysql.select(sql.userinfo, function (result) {
                resolve(result);
            });
        })
    },
    updatenow: function () {
        return new Promise(function (resolve) {
            mysql.select(sql.updatenow, function (result) {
                resolve(result);
            });
        });
    },
    randomblog: function () {
        return new Promise(function (resolve) {
            mysql.select(sql.random, function (result) {
                //随机两个
                result = JSON.parse(JSON.stringify(result));
                var index;
                var res = [];
                for (var i=0;i<2;i++) {
                    var s=Math.floor(Math.random()*result.length);
                    if(s==index)
                    {
                        i--;
                        continue;
                    }
                    index=s;
                    res.push(result[index]);
                }
                resolve(res);
            });
        });
    },
    clickpai:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.clickpai, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    xuanxiangka:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.xuanxiangka, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    tui:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.tuijian, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    newsblog:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.newsblog, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    blogdetail:function (id){
        return new Promise(function (resolve) {
            mysql.findblog(sql.blogdetail,id,function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    getpagedata:function (page,num){
        return new Promise(function (resolve) {
            var params=[parseInt(page),parseInt(num)];
            console.log(params);
            mysql.findblog(sql.pagenum,params,function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    insertMsg:function (arr){
        return new Promise(function (resolve) {
            mysql.findblog(sql.insertmsg,arr,function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    findMsg:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.findmsg, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    backmsg:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.backmsg, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    getlikeblog:function (msg){
        return new Promise(function (resolve) {
            mysql.findblog(sql.likeblog,msg,function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    userlogin:function (arr){
        return new Promise(function (resolve){
            mysql.userlogin(sql.login,arr,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    getuserinfo:function (id){
        return new Promise(function (resolve){
            mysql.userlogin(sql.getuserinfo,id,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    updateuserinfo:function (arr){
        return new Promise(function (resolve){
            mysql.userlogin(sql.updateuser,arr,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    selecttype:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.selectTYpe, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    insertblog:function (arr){
        return new Promise(function (resolve){
            mysql.userlogin(sql.insertblog,arr,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    unreadmsg:function (){
        return new Promise(function (resolve) {
            mysql.select(sql.selectliuyanweidu, function (result) {
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    inserttomsg:function (arr){
        return new Promise(function (resolve){
            mysql.userlogin(sql.inserttomsg,arr,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    },
    updatestatus:function (id){
        return new Promise(function (resolve){
            mysql.userlogin(sql.updatestatus,id,function (result){
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    }
}