/**
 * Created by Administrator on 2017/2/17.
 */


$(function () {


    getData();


    function getData() {
        var getMsg = window.location.search.slice(1);
        var reg = /=([a-zA-Z0-9]+)/;
        var match = reg.exec(getMsg)[1];
        console.log(match);

        $.ajax({
            type: 'get',
            url: 'http://139.199.157.195:9090/api/getdiscountproduct?productid='+match,
            datatype: 'json',
            success: function (info) {
                console.log(info);
                var html = template('template', info);
                $('.container').append(html);
            }
        });
    }
} );
