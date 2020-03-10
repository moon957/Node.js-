$(function () {
    $(".searchbtn").click(function () {
        $(".search").show();
    });
    $(".closebtn").click(function () {
        $(".search").hide();
    });
    $(".selectka-title>span").each(function (index) {
        $(this).click(function () {
            $(this).addClass("linebalck").siblings().removeClass("linebalck");
            $(".ka-par>div").eq(index).show().siblings().hide();
        });
    });
    $(".ka-menu>li").each(function () {
        $(this).mouseenter(function () {
            $(this).addClass("addlicolor").siblings().removeClass("addlicolor");
            $(this).find("a").children().eq(0).addClass("spanBg");
            $(this).find("a").children().eq(1).addClass("fontweight");
            $(this).find("a").children().eq(2).show();
            $(this).siblings().find("span").removeClass();
            $(this).siblings().find("div").hide();
        });
    });
    $(".faceitems>input").each(function (){
        $(this).click(function (){
            $(this).addClass("addface").siblings().removeClass("addface");
        });
    });
});