$(function () {
    getcouponMenu();
    toTOPBtn();
});
//��ȡ�Ż�ȯ������Ϣ ����Ⱦ��ҳ��BEGIN:
function getcouponMenu(){
    $.get("http://139.199.157.195:9090/api/getcoupon",function(res){
        console.log(res);
        var html = template("getcouponTitle", res);
        $("#quanbox>.row").append(html);
    });
}
//��ȡ�Ż�ȯ������Ϣ ����Ⱦ��ҳ��END
//����ҳ�淵�ض�����ť���Ч�� BEGIN��
function toTOPBtn(){
    returnTop();
}
function returnTop(){
    $("#footer >.row  .col-xs-4:nth-child(3)").on("click",function(){
        $("html,body").animate({scrollTop:0}, 500);
    });
}
//������ҳ���ض�����ť���Ч�� END
