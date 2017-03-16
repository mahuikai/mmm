/**
 * Created by Administrator on 2017/2/15 0015.
 */



window.onload = function () {
    console.log(window.location.search);
    //window.location 接受传来的参数，是一个对象，search接受的是?productid=0
    var getId = window.location.search.match(/\d+/g).join("");
    console.log(getId);
    init();
    function init() {
        getProduct(getId);
        getProductEvaluate(0);
    }

    //点击查看更多
    $('.see-more').on('click', 'a', function () {
        //alert(1);
        $(this).html('正在加载...').stop().html('没有更多评论');
    });
    //渲染产品信息
    function getProduct() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getproduct?productid=' + getId,
            success: function (result) {
                var html = template('temp1', result);
                $('.product-top').html(html);
                var name = template('tpl', result);
                $('.title-left').html(name);
            }
        });
    }

    //渲染评论数据
    function getProductEvaluate() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getproductcom?productid=' + getId,
            success: function (result) {
                var eva = template('temp2', result);
                $('.product-bottom').html(eva);
            }
        });
    }

    //设置首页返回顶部按钮点击效果 BEGIN：
    returnTop();
    function returnTop() {
        $("#footer >.row  .col-xs-4:nth-child(3)").on("click", function () {
            $("html,body").animate({scrollTop: 0}, 500);
        });
    }

//设置首页返回顶部按钮点击效果 END

};