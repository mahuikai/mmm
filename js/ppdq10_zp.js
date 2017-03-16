/**
 * Created by acer-pc on 2017/2/14.
 */
$(function () {
    init();
    /***************************************/
    function init() {
        FPTVBrandReq();
    }

    function FPTVBrandReq() {
        // console.log(getQueryString("id"));
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

        $.ajax({
            type: 'get',
            url: "http://139.199.157.195:9090/api/getbrand?brandtitleid=" + getQueryString("id"),
            success: function (res) {
                // console.log(res);
                var html = template("FPTVBrand", res);
                $("#FPTV> .FPTVBrand>.content").html(html);
            }
        });
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=" + getQueryString("id") + "&&pagesize=4",
            success: function (res) {
                console.log(res);
                var html = template("FPTVSales", res);
                $("#FPTV>.FPTVSales>.content").html(html);
            }
        });
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getproductcom?productid=" + getQueryString("id"),
            success: function (res) {
                console.log(res);
                var html = template("FPTVComment", res);
                $("#FPTV>.FPTVComment>.content").html(html);
            }
        });
    }
});
