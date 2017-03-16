$(function () {
    getinlanddiscount();
    toTOPBtn();


    //获取国内折扣列表信息 B
    var Data = {};

    function getinlanddiscount() {

        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
            Data = res;
            render();
            console.log(Data.result.length);
        });
    }

//获取数据：
    function render() {
        if (Data.result.length == 0) {
            return;
        }
        var newData = {result: []};
        var length = 8;
        if (Data.result.length <= 8) {
            length = Data.result.length;
        }
        for (var i = 0; i < length; i++) {
            newData.result.push(Data.result.shift());
        }
        var html = template("getInlandDiscount", newData);
        $("#chinamess .chinamesslist ul").append(html);
        flag = false;

    }

//设置懒加载效果：
    var flag = false;

    window.onscroll = function () {
        if (Data.result.length == 0 || flag) {
            return;
        }
        var height = $("#chinamess .chinamesslist  ul").height() + $("#header").height() + $("#footer").height() - $(document.body).height();
        //console.log($("#chinamess ul").height());
        //console.log($(document.body).height());
        var disBottom = height - $(document.body).scrollTop();
        //console.log($(document.body).scrollTop());
        console.log(disBottom);
        if (disBottom < 50) {
            flag = true;
            render();
        }
    }

//获取国内折扣列表信息 E


//设置首页返回顶部按钮点击效果 BEGIN：
    function toTOPBtn() {
        returnTop();
    }

    function returnTop() {
        $("#footer >.row  .col-xs-4:nth-child(3)").on("click", function () {
            $("html,body").animate({scrollTop: 0}, 500);
        });
    }

//设置首页返回顶部按钮点击效果 END
});

