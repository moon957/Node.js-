
var promise = require("../MySQL/promise");
var bodyParser = require('body-parser')
var url = require("url");
var cookie = require("cookie-parser");
var base64 = require("js-base64").Base64;
var usersetting = require("./usersettings");
var multiparty = require('multiparty');
module.exports = function (app) {
    //配置body-parser
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    //配置cookie
    app.use(cookie("12345"));
    /* 
    首页路由
    首页数据渲染
    */
    app.get("/", function (req, res) {
       // res.send("123");
        async function getdata() {
            var res1 = await promise.title();
            var user = await promise.userinfo();
            var upnow = await promise.updatenow();
            var ranom = await promise.randomblog();
            var clickpai = await promise.clickpai();
            var xuanka = await promise.xuanxiangka();
            var tui = await promise.tui();
            var newsblog = await promise.newsblog();
            var all = {
                title: JSON.parse(JSON.stringify(res1)),
                userinfo: JSON.parse(JSON.stringify(user)),
                titleindex: 0,
                updatenow: JSON.parse(JSON.stringify(upnow)),
                randomblog: ranom,
                clickpai: clickpai,
                xuanka: xuanka,
                tui: tui,
                newsblog: newsblog
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("index", result);
        })
    });
    /* 
   第二个子页面路由
   第二个子页面数据渲染
   */
    app.get("/blog", function (req, res) {
        async function getdata() {
            var title = await promise.title();
            var newsblog = await promise.newsblog();
            var clickpai = await promise.clickpai();
            var tui = await promise.tui();
            var all = {
                title: JSON.parse(JSON.stringify(title)),
                titleindex: 1,
                newsblog: newsblog,
                clickpai: clickpai,
                tui: tui
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("blog", result);
        });
    });
    /* 
    详细博客界面
    */
    app.get("/detail", function (req, res) {
        //获取路径传值
        var blogid = req.query.id;
        if (!blogid) {
            res.send("404");
            return;
        }
        async function getdata() {
            var title = await promise.title();
            var newsblog = await promise.newsblog();
            var clickpai = await promise.clickpai();
            var upnow = await promise.updatenow();
            var tui = await promise.tui();
            var blog = await promise.blogdetail(blogid);
            var all = {
                title: JSON.parse(JSON.stringify(title)),
                titleindex: 1,
                newsblog: newsblog,
                clickpai: clickpai,
                tui: tui,
                updatenow: upnow,
                blog: blog
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("blogdetail", result);
        });
    });
    /* 
       关于我路由
       */
    app.get("/about", function (req, res) {
        async function getdata() {
            var title = await promise.title();
            var newsblog = await promise.newsblog();
            var clickpai = await promise.clickpai();
            var upnow = await promise.updatenow();
            var tui = await promise.tui();
            var user = await promise.userinfo();
            var all = {
                title: JSON.parse(JSON.stringify(title)),
                titleindex: 2,
                newsblog: newsblog,
                clickpai: clickpai,
                tui: tui,
                updatenow: upnow,
                user: JSON.parse(JSON.stringify(user))
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("about", result);
        });
    });
    /* 
    时间轴路由
    */
    app.get("/blogtime", function (req, res) {
        //获取当前页的数据
        var page = req.query.page;
        var num = req.query.num;
        if (!page && !num) {
            page = 0;
            num = 10;
        }
        else {
            page = (parseInt(page) - 1) * 10;
        }
        async function getdata() {
            var title = await promise.title(); 
            var pageData = await promise.getpagedata(page, num);
             //console.log(JSON.parse(JSON.stringify(title)));
            var all = {
                title: JSON.parse(JSON.stringify(title)),
                titleindex: 3,
                pageData: pageData
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("blogtime", result);
        });
    });
    /* 
    留言的路由
    */
    app.get("/blogmsg", function (req, res) {
        async function getdata() {
            var title = await promise.title();
            var msg = await promise.findMsg();
            var back = await promise.backmsg();
            var all = {
                title: JSON.parse(JSON.stringify(title)),
                titleindex: 4,
                findMsg: msg,
                backmsg: back
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("blogmsg", result);
        });
    });
    /* 
    用户留言的post  路由
    */
    app.post("/sendmsg", function (req, res) {
        var msginfo = req.body;
        var str = [msginfo.nick, msginfo.face, msginfo.content, new Date().toLocaleString(), 0];
        async function getdata() {
            var msg = await promise.insertMsg(str);
            var all = {
                msg: msg
            }
            return all;
        }
        getdata().then(function (result) {
            if (result.msg.affectedRows == 1) {
                res.redirect('/blogmsg');
            }
            else {
                res.send("留言失败");
            }

        });
    });
    /* 
    模糊查找路由
    */
    app.get("/likeblog", function (req, res) {
        console.log(req.query.link);
        //var like = url.parse(req.url, true).query.link;
        var like=req.query.link
        async function getdata() {
            var res1 = await promise.title();
            var upnow = await promise.updatenow();
            var clickpai = await promise.clickpai();
            var newsblog = await promise.getlikeblog("%" + like + "%");
            var all = {
                title: JSON.parse(JSON.stringify(res1)),
                titleindex: 0,
                updatenow: JSON.parse(JSON.stringify(upnow)),
                clickpai: clickpai,
                newsblog: newsblog
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("likeblog", result);
        });
    });

    /* 
    后台管理
    
    */
    app.get("/userlogin", function (req, res) {
        //判断有没有缓存  如果有直接读取给值
        if (req.signedCookies.user == undefined) {
            res.render("user/login", {
                isshow: false,
                userid: "",
                userpwd: "",
                rember: "no"
            });
        }
        else {
            var json = JSON.parse(base64.decode(req.signedCookies.user));
            res.render("user/login", {
                isshow: false,
                userid: json.userid,
                userpwd: json.userpwd,
                rember: json.rember
            });
        }
    });
    /* 
    用户登录路由
    */
    app.use("/login", function (req, res, next) {
        //如果用户勾选了记住我写入缓存
        if (req.body.rember) {
            //记录账号密码
            res.cookie("user", base64.encode(JSON.stringify(req.body)), { maxAge: 60 * 60 * 1000, signed: true });
        }
        else {
            //没有勾选移除当前的缓存  
            res.cookie("user",base64.encode(JSON.stringify(req.body)), { maxAge: 0, signed: true });
        }
        promise.userlogin([req.body.userid, req.body.userpwd]).then(function (result) {
            if (result[0].count == 1) {
                next();
                //修改用户的状态
                usersetting.login = true;
            }
            else {
                res.render("user/login", {
                    isshow: true,
                    userid: "",
                    userpwd: "",
                    rember: "no"
                });
            }
        });

    });
    app.post("/login", function (req, res) {
        res.redirect("/userguan");
    });
    /* 
     重定向到管理界面的路由
    */
    app.get("/userguan", function (req, res) {
        if (usersetting.login == false) {
            res.redirect("/userlogin");
            return;
        }
        //读取缓存的账号
        var userid = JSON.parse(base64.decode(req.signedCookies.user)).userid;
        async function getdata() {
            var userinfo = await promise.getuserinfo(userid);
            var all = {
                userinfo: userinfo
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("user/index", result);
        });
    });

    /* 
        修改个人资料
    
    */
    app.post("/updateuser", function (req, res) {
        //涉及文件的上传
        var form = new multiparty.Form();
        //设置文件上传的目录
        form.uploadDir = "static/face";
       
        form.parse(req, function (err, fields, files) {
            console.log(fields,files);
            var path = files.face[0].path.replace("static", "");
            console.log(path)
            var user = [fields.nickname[0], fields.job[0], fields.address[0], fields.email[0], fields.QQ[0], fields.descinfo[0], path, fields.userdesinfo[0], fields.name[0], fields.userid[0], fields.userpwd[0]];
            promise.updateuserinfo(user).then(function (result) {
                if (result.affectedRows == 1) {
                    alert("修改数据成功！");
                    res.redirect("/userguan");
                }
            });

        });
    });

    /* 
    发表博客
    */
    app.get("/sendblog", function (req, res) {
        //读取缓存的账号
        var userid = JSON.parse(base64.decode(req.signedCookies.user)).userid;
        async function getdata() {
            var userinfo = await promise.getuserinfo(userid);
            var type = await promise.selecttype();
            var all = {
                userinfo: userinfo,
                type: type
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("user/sendblog", result);
        });
    });
    /* 
    发表博客的路由
    */
    app.post("/senddata", function (req, res) {
        var form = new multiparty.Form();
        //设置文件上传的目录
        form.uploadDir = "static/bloglogo";
        form.parse(req, function (err, fields, files) {
            var blog = [fields.title[0], fields.bloghtml[0], new Date().toLocaleString(), files.logo[0].path.replace("static", ""), 0, fields.blogtype[0], fields.descinfo[0], 1, 1];
            promise.insertblog(blog).then(function (result) {
                res.redirect("/sendblog");
            });
        });
    });
    /* 
    留言回复路由
    */
    app.get("/liusend", function (req, res) {
        //读取缓存的账号
        var userid = JSON.parse(base64.decode(req.signedCookies.user)).userid;
        async function getdata() {
            var userinfo = await promise.getuserinfo(userid);
            var unread = await promise.unreadmsg();
            var all = {
                userinfo: userinfo,
                unread: unread
            }
            return all;
        }
        getdata().then(function (result) {
            res.render("user/liumsg", result);
        });
    });
    /* 
    回复留言的表单
    */
    app.post("/huifu", function (req, res) {
        var data = [req.body.id, req.body.content, new Date().toLocaleString()];

        promise.inserttomsg(data).then(function (result) {
            promise.updatestatus(parseInt(req.body.id)).then(function (result) {
                res.redirect("/liusend");
            });
        });
    });


    /* 
    退出
    */
    app.get("/close", function (req, res) {
        usersetting.login = false;
        res.redirect("/userlogin");
    });

    /* 
    
    //设置所有的ejs模板都可以获取的数据
                    app.locals['user']=req.session.user;
    */
}