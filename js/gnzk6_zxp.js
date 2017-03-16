/**
 * Created by acer-pc on 2017/2/14.
 * ������ 2017/02/15
 */

$(function () {

    /*���ú���*/
    getData();


    var newData = {result: []};
    var total = 80;

    /*��ȡ����*/
    function getData() {
        $.ajax({
            type: 'get',
            url: 'http://139.199.157.195:9090/api/getinlanddiscount',
            datatype: 'json',
            success: function (info) {
                //console.log(info);
                newData.result = info.result.concat(info.result);
                newData.result = newData.result.concat(newData.result);
                //console.log(newData.result.length);
                loaded();
            }
        });
    }


    function loaded() {
        //�Ѿ����ص��б����
        /*var loadLength = $('.loadi').length;
        console.log(loadLength);*/
        //������ϣ���ֹ�ظ�����
        if(newData.result.length == 0) {
            return;
        }
        var data = {result:[]};
        var length = 8;
        if(newData.result.length <= length) {
            length = newData.result.length;
        }
        for(var i = 0; i < length; i++) {
            data.result.push(newData.result.shift());
        }

        var html = template('tpl', data);

        $('.row').append(html);
        flag = false;

    }

    /*�������ݵĿ���*/
    var flag = false;
    window.onscroll = function () {
        if(flag == true) {
            return;
        }else {
            var height = $('.row').height() + $('#header').height() + $('.footer').height() - $(document.body).height();
            var b = height - $(document.body).scrollTop();
            if(b < 50) {
                flag = true;
                loaded();
                console.log(1);
            }
        }
    }
});
