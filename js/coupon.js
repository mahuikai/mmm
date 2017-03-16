$(function () {
    getcouponMenu();
    toTOPBtn();
});
//获取优惠券标题信息 并渲染到页面BEGIN:
function getcouponMenu(){
    $.get("http://139.199.157.195:9090/api/getcoupon",function(res){
        console.log(res);
        var html = template("getcouponTitle", res);
        $("#quanbox>.row").append(html);
    });
}
//获取优惠券标题信息 并渲染到页面END
//设置页面返回顶部按钮点击效果 BEGIN：
function toTOPBtn(){
    returnTop();
}
function returnTop(){
    $("#footer >.row  .col-xs-4:nth-child(3)").on("click",function(){
        $("html,body").animate({scrollTop:0}, 500);
    });
}
//设置首页返回顶部按钮点击效果 END
