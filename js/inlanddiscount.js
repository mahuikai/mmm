$(function () {
    getinlanddiscount();
    toTOPBtn();


    //��ȡ�����ۿ��б���Ϣ B
    var Data = {};

    function getinlanddiscount() {

        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
            Data = res;
            render();
            console.log(Data.result.length);
        });
    }

//��ȡ���ݣ�
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

//����������Ч����
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

//��ȡ�����ۿ��б���Ϣ E


//������ҳ���ض�����ť���Ч�� BEGIN��
    function toTOPBtn() {
        returnTop();
    }

    function returnTop() {
        $("#footer >.row  .col-xs-4:nth-child(3)").on("click", function () {
            $("html,body").animate({scrollTop: 0}, 500);
        });
    }

//������ҳ���ض�����ť���Ч�� END
});

