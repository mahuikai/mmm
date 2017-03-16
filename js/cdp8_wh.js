window.onload=function(){
    init();
    function init() {
        getShopName();
        getRegion();
        getIndexmenu(0,0);
        shop();
        HideSelect3()

    }

    //传入电商名称的数据
    function getShopName() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsshop",
            success: function (res) {
                var html = template("ShopName", res);
                $("#store>ul").html(html)
                HideSelect()
            }
        });
    };

//  传入地区的参数
    function getRegion() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsshoparea",
            success: function (res) {
                var html = template("region", res);
                $('#area>ul').html(html);
                HideSelect2()
            }
        });
    };
    //传入商品的数据
    function getIndexmenu(shopid,areaid) {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsproduct?shopid="+shopid+"&areaid="+areaid,
            success: function (res) {
                var html = template("menu", res);
                console.log(res);
                $("#shopp>ul").html(html);
            }
        });
    };
    //点击一个下拉菜单另一个隐藏
    function shop() {

        $("#btn1").click(function(){
            $(".hide_2").css("display","none");
            $(".hide_3").css("display","none");
            $(".hide_4").css("display","none");
            $(".hide_1").toggle();
        })
        $("#btn2").click(function(){
            $(".hide_1").css("display","none");
            $(".hide_3").css("display","none");
            $(".hide_4").css("display","none");
            $(".hide_2").toggle();
        });
        $("#btn3").click(function(){
            $(".hide_1").css("display","none");
            $(".hide_2").css("display","none");
            $(".hide_4").css("display","none");
            $(".hide_3").toggle();
        });
        $("#SearchBtn").click(function(){
            $(".hide_1").css("display","none");
            $(".hide_2").css("display","none");
            $(".hide_3").css("display","none");
            $(".hide_4").toggle();
        });
    };
    //点击第一个下拉菜单中的每一项渲染新的数据 隐藏下拉菜单
    var  aaa =0;
    var  bbb =0;
    function HideSelect(){
        var f = document.querySelectorAll(".hide_1>ul>li")
        for( var i = 0;i < f.length;i++){
            f[i].index = i;
            f[i].onclick = function(){
                $(".hide_1").css("display","none");
                var a = $(this).find("a").html();
                $("#btn1").find("a").html(a);
                aaa=this.index;
                getIndexmenu(aaa,bbb);
            }
        }
    };


    //点击第二个下拉菜单中的每一项渲染新的数据 隐藏下拉菜单

    function HideSelect2(){
        var m = document.querySelectorAll(".hide_2>ul>li")
        for( var i = 0;i < m.length;i++){
            m[i].index = i;
            m[i].onclick = function(){
                $(".hide_2").css("display","none");
                var a = $(this).find("a").html();
                var b = $("#btn2").find("a").html(a).html();
                $("#btn2").find("a").html(b.slice(0,2) );
                bbb=this.index;
                getIndexmenu(aaa,bbb);
            }
        }
    }

    //点击第三个下拉菜单中的每一项隐藏下拉菜单
    function HideSelect3(){
        var f = document.querySelectorAll(".hide_3>ul>li")
        for( var i = 0;i < f.length;i++){
            f[i].onclick = function(){
                $(".hide_3").css("display","none");
                var a = $(this).find("a").html();
                $("#btn3").find("a").html(a);
            }

        }

    };
}
