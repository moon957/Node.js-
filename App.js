var express=require("express");
var router=require("./router/router");
var app=new express();
app.set("view engine","ejs");
app.use(express.static("static"));


app.use("unload",express.static("static"));
router(app);
app.listen(8100);