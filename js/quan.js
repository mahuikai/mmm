$(function () {
    getQuanMess();
    toTOPBtn();
});


//获取优惠券数据 B
function getQuanMess() {
    var id = getQueryString("id");

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $.get("http://139.199.157.195:9090/api/getcouponproduct?couponid=" + id, function (res) {
        var html = template("getMoreMess", res);
        $("#quanBox").append(html);
        //点击优惠券出现图片 B：
        $(".mess").on("click", "a", function () {
            var placeholder = $(this).context.nextElementSibling;
            placeholder.style.display = "block";
        })
        $(".placeholder").on("click", function () {
            this.style.display = "none";
        });
        //点击优惠券出现图片 E
        //获取优惠券标题信息 并渲染到页面BEGIN:
        $.get("http://139.199.157.195:9090/api/getcoupon", function (res) {
            console.log(res.result[id].couponTitle + "优惠券");
            var html = res.result[id].couponTitle + "优惠券";
            $("#header p").append(html);
            $("#nav a:last-child").append(html);
        });

        //获取优惠券标题信息 并渲染到页面END
    });
}

//设置页面返回顶部按钮点击效果 BEGIN：
function toTOPBtn() {
    returnTop();
}
function returnTop() {
    $("#footer >.row  .col-xs-4:nth-child(3)").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    });
}
//设置首页返回顶部按钮点击效果 END
