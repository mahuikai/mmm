window.onload = function () {
    p_list();
    cover();
    toTop($(".toTop"));

}

/*商品列表*/
function p_list() {
    var pageCurrent = 0,
        flag = false,
        pageTotal;

    /*页面加载完 后台获取第一页渲染到页面*/
    pA_page(function (info) {

        //var strin = "";
        //for (var i = 0; i < pageTotal; i++) {
        //    strin += "<option value=" + i + ">" + (i + 1) + "/15</option>";
        //}
        //$("#sel").html(strin);


        var op_html = template("aa", info);
        $("#sel").html(op_html);

    });


    /*右键点击 更换下一页*/
    mhk.tap($("#p_right")[0], function () {
        if (flag) {//节流控制
            /*最大值限定*/
            //console.log(pageCurrent);
            //console.log(pageTotal);
            if (pageCurrent > pageTotal - 2) {
                $(".p_last").show();
                //alert("已经是第一页了，别再点了");
                return
            } else {
                pageCurrent++
            }
            toTop($("#p_right"));
            /*页面做相应改变*/
            pA_page();
            //console.log(pageCurrent);
        }
        flag = false;
    });

    mhk.tap($("#p_left")[0], function () {
        if (flag) {//节流控制
            /*最小值限定*/
            if (pageCurrent <= 0) {
                $(".p_first").show();
                //alert("已经是最后一页了，别再点了");
                return
            } else {
                pageCurrent--;
            }
            //pageCurrent <= 0 ? pageCurrent = 0 : pageCurrent--;
            console.log(pageCurrent);
            toTop($("#p_left"))
            /*页面做相应改变*/
            pA_page();
        }
        flag = false;
    });

    /*select选择页面*/
    /*select选项改变onchange事件*/
    $("#sel").change(function () {

        pageCurrent = $("#sel>option:selected").val() - 0;//转换成数字
        /*select页码做相应改变*/
        pageChange();
        /*页面做相应改变*/
        pA_page();
        console.log(pageCurrent);
        $(".toTop").click();
    });
    /*页面数据ajax请求*/
    function pA_page(callback) {
        $.ajax({
            type: "get",
            url: "http://139.199.157.195:9090/api/getmoneyctrl?pageid=" + (pageCurrent + 1),
            success: function (info) {
                console.log(info);
                pageTotal = Math.ceil(info.totalCount / info.pagesize);
                info.pageTotal = new Array(15);
                var pro_html = template("p_list", info);
                $(".mb_product").html(pro_html);
                callback && callback(info);
                /*select页码做相应改变*/
                pageChange();
                flag = true;

            }
        });
    }

    /*页码做相应改变*/
    function pageChange() {
        $("#sel>option").eq(pageCurrent).attr("selected", true).siblings().attr("selected", false);
        $("#sel>option:selected").html((pageCurrent + 1) + "/" + (pageTotal));
        //跟直接选择不一样  需要设置siblings为false
    }


    /*自定义模板方法*/
    template.helper("match", match)
    /*匹配字符串中的数字*/
    function match(str) {
        return str.replace(/[^0-9]+/g, '');
    }
}
/*点击滚动到顶部*/
function toTop(obj) {
    clearInterval(obj.timer)
     obj.on("click", function () {
        var target = 0;
         obj.timer=  setInterval(function () {
            var leader = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                step = (leader - target) / 10;
            if (leader - target > step) {
                leader = leader - step;
            } else {
                leader = target
                clearInterval(obj.timer);
            }
            window.scrollTo(0, leader)
            console.log(11);
        }, 1)
    })
}
function cover() {
    /*点击确定取消遮罩层*/
    mhk.tap($("#start")[0], function () {
        $(".p_first").css("display", "none");
    })
    mhk.tap($("#end")[0], function () {
        $(".p_last").css("display", "none");

    })
}

var mhk = {};
mhk.tap = function (dom, callback) {
    /*
     * 要求  没有触发 touchmove 事件
     *       并且响应速度要比click快
     */
    if (dom && typeof  dom == 'object') {
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart', function (e) {
            //console.log('touchstart');
            //console.time('tap');/*记录tap这个参数现在的时间*/
            startTime = Date.now();
        });
        dom.addEventListener('touchmove', function (e) {
            //console.log('touchmove');
            isMove = true;
        });
        dom.addEventListener('touchend', function (e) {
            //console.log('touchend');
            //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
            if (!isMove && (Date.now() - startTime) < 150) {
                /*调用 callback*/
                callback && callback(e);
            }
            /*重置 参数*/
            isMove = false;
            startTime = 0;
        });
    }
}


