$(function () {
    category();
    toTOPBtn();
});

//解决点击任意的分类跳转到该分类对应的商品列表界面问题 BEGIN :
function category() {
    getCategoryTitle();
}
//获取商品分类标题和商品分类列表的数据：
function getCategoryTitle() {
    $.get("http://139.199.157.195:9090/api/getcategorytitle", function (res) {
        var html = template("categoryTpl", res);
        $("#accordion").html(html);
        //$.each遍历json对象
        $.each($("#accordion a"), function (idx, obj) {
            //data() 方法向被选元素附加数据，或者从被选元素获取数据。
            var _this = obj;
            var titleid = $(_this).data(titleid).titleid;
            console.log(titleid);
            $.get("http://139.199.157.195:9090/api/getcategory?titleid=" + titleid, function (res) {
                var html = template("categorylistTpl", res);
                $(_this).parent().parent().next().find(".panel-body").html(html);
            });
        });
    })
}
//解决点击任意的分类跳转到该分类对应的商品列表界面问题 END
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