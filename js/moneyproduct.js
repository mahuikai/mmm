
$(function () {
    getProductMess();
    toTOPBtn();
});

//��ȡ��Ʒ��Ϣ���� BEGIN��
function getProductMess(){
        var id = getQueryString("productid");

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    getMonwyProduct(id);
}
function getMonwyProduct(productid){
    $.get("http://139.199.157.195:9090/api/getmoneyctrlproduct?productid=" + productid, function(res) {
        var html = template("moneyProductTpl", res);
        $("#recommen-product").html(html);
    });
}
//��ȡ��Ʒ��Ϣ���� END

//����ҳ�淵�ض�����ť���Ч�� BEGIN��
function toTOPBtn() {
    returnTop();
}
function returnTop() {
    $("#footer >.row  .col-xs-4:nth-child(3)").on("click", function () {
        $("html,body").animate({scrollTop: 0}, 500);
    });
}
//������ҳ���ض�����ť���Ч�� END