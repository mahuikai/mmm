$(function () {
    init();
    recommen();
    tomoneyctrl();
    toTOPBtn();

});
//解决 “首页菜单栏默认只显示2行菜单，点击更多加载第三行菜单，再次点击隐藏” 问题 BEGIN：
    function init() {
        getIndexMenu();
        addEvent();
    }
    //获取菜单栏数据
    function getIndexMenu() {
        $.get("http://139.199.157.195:9090/api/getindexmenu", function (res) {
            var html = template("menuTpl", res);
            $("#menu>.row").html(html);
        });
    }
    //给更多加载绑定点击事件：
    function addEvent() {
        $('#menu').on('click', '.row>div:nth-child(8)', function () {
            $("#menu>.row>div:nth-last-child(-n+4)").slideToggle();
        });
    }
//解决 “首页菜单栏默认只显示2行菜单，点击更多加载第三行菜单，再次点击隐藏” 问题 END
//超值折扣推荐栏的动态获取 BEGIN：
    function recommen() {
        getRecommenMenu();
    }
    //获取菜单栏数据
    function getRecommenMenu() {
        $.get("http://139.199.157.195:9090/api/getmoneyctrl", function (res) {
            template.helper("getNum", getNum);
            var html = template("recommenTpl", res);
            $(".recommen-list").html(html);
        });
    }
    //获取json数据中的数字
    function getNum(str) {
        return str.replace(/[^0-9]+/g, '');
    }
//超值折扣推荐栏的动态获取 END
//设置首页返回顶部按钮点击效果 BEGIN：
    function toTOPBtn(){
        returnTop();
    }
    function returnTop(){
        $("#footer >.row  .col-xs-4:nth-child(3)").on("click",function(){
            $("html,body").animate({scrollTop:0}, 500);
        });
    }
//设置首页返回顶部按钮点击效果 END

function tomoneyctrl(){
    $("#recommenTitle").on("click",function(){
        location.href="moneyctrl.html";

    });
    $("#recommenTitle2").on("click",function(){
        location.href="brandTitle.html";

    });

}