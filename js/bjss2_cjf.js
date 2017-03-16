/**
 * Created by Administrator on 2017/2/14 0014.
 */

window.onload = function(){
    console.log(window.location.search);
    var getNum = window.location.search.match(/\d+/g)-0;
    console.log(getNum);
    var pageCurrent = 1,totalPage;

    //初始化
    getLocation(getNum);
    getProductList(pageChoose,getNum);
    //点击按钮下一个
    $('.btn-next').on('click',function (){
        if(pageCurrent<totalPage){
            pageCurrent++;
            getProductList();
            $("html,body").animate({scrollTop: 0}, 0);
        }else{
            //pageCurrent = totalPage ;
            //getProductList();
            $("html,body").animate({scrollTop: 0}, 0);
            return false;
        }
        $('.dropdown>.btn').html('第'+pageCurrent+'页');
        //console.log(pageCurrent);
        //$('.dropdown-toggle').val('第'+pageCurrent+'页');
        //$('.dropdown-menu>li').eq(pageCurrent).attr('active').siblings('li').removeAttr('active');

    });
    //点击按钮前一个
    $('.btn-pre').on('click',function (){
        if(pageCurrent>1){
            pageCurrent--;
            getProductList();
            $("html,body").animate({scrollTop: 0}, 0);
        }else{
            //pageCurrent = 1;
            //getProductList();
            $("html,body").animate({scrollTop: 0}, 0);
            return false;
        }
        $('.dropdown>.btn').html('第'+pageCurrent+'页');
        //console.log(pageCurrent);
        //$('.dropdown-toggle').val('第'+pageCurrent+'页');
    });
    //下拉菜单点击选择
    $('.dropdown-menu').on('click','li a',function (){
        var number = $(this).html().match(/\d+/g) - 0;
        //console.log(number);
        $('.dropdown>.btn').html('第'+number+'页');
        pageCurrent = number;
        getProductList();
        $("html,body").animate({scrollTop: 0}, 0);
    });

    //获取路径
    function getLocation(){
        $.get('http://139.199.157.195:9090/api/getcategorybyid?categoryid='+getNum,function (res){
            console.log(res);
            var name = template('tpl',res);
            $('.product-index').html(name);
            });
    }
    //ajax申请对应数据
    function getProductList(callBack){
        $.ajax({
            url:'http://139.199.157.195:9090/api/getproductlist?categoryid='+getNum+'&pageid='+pageCurrent,
            success:function (result){
                var html = template('temp',result);
                $('.product-list').html(html);
                totalPage = Math.ceil(result.totalCount/result.pagesize);
                callBack&&callBack();
            }
        });
    }
    //动态添加页数选项
    function pageChoose(){
        for(var i = 1;i <= totalPage ;i++){
            var str = '';
            str += '<li><a>'+'第'+i+'页'+'</a></li>';
            document.querySelector('.dropdown-menu').innerHTML += str;
        }
    }
    //设置首页返回顶部按钮点击效果 BEGIN：
    returnTop();
    function returnTop(){
        $("#footer >.row  .col-xs-4:nth-child(3)").on("click",function(){
            $("html,body").animate({scrollTop:0}, 500);
        });
    }
//设置首页返回顶部按钮点击效果 END
}