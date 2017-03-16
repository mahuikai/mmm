window.onload = function () {

    p_tpl(function () {

        /*添加评论*/
        $("#ctl00_ContentBody_Button1").on("click", function () {
            console.log(11);
            bb = $("#ctl00_ContentBody_txt_nr").val();
            if (bb == "") {
                return
            }
            var string = '<li class="ui-border-b">' +
                '<div class="userimg">' +
                '<img src="http://bbs.manmanbuy.com/images/face/none.gif" alt=""/>' +
                '</div>' +
                '<div class="con">' +
                '<div class="name clearfix">' +
                '<div class="username">夏天的疯</div>' +
                '<div class="time">2017/02/21 13:18:27</div>' +
                '</div>' +
                '<div class="content">' + bb + '</div>' +
                '</div>' +
                '</li>';
            $(".list>ul").prepend(string);
            $("#ctl00_ContentBody_txt_nr").val("");

        });
    });
    toTop();

}
/*ajax请求*/
function p_tpl(callback) {
    var getMsg = window.location.search.slice(1);
    var reg = /=([a-zA-Z0-9]+)/;
    var match = reg.exec(getMsg)[1];
    console.log(match);
    $.ajax({
        url: "http://139.199.157.195:9090/api/getmoneyctrlproduct?productid=" + match,
        success: function (info) {
            console.log(info);
            var html = template("p_news", info);
            $(".mb_news").html(html);
            var pathHtml = template("path", info);
            $(".breadcrumb").append(pathHtml);
            callback && callback();

        }

    })

}
/*点击滚动到顶部*/
function toTop() {
    $(".toTop").on("click", function () {
        var target = 0;
        var timer = setInterval(function () {
            var leader = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                step = (leader - target) / 10;
            if (leader - target > step) {
                leader = leader - step;
            } else {
                leader = target
                clearInterval(timer);
            }
            window.scrollTo(0, leader)
            //console.log(11);
        }, 30)
    })
}






