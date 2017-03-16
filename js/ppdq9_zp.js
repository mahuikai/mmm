/**
 * Created by acer-pc on 2017/2/14.
 */
$(function () {
    init();
    /***************************************/
    function init() {
        brand();
    }

    function brand() {
        $.ajax({
            type: 'get',
            url: 'http://139.199.157.195:9090/api/getbrandtitle',
            success: function (res) {
                // console.log(res);
                var html = template("getBrand", res);
                $("#hotBrand>.hotBrandContant").html(html);
            }
        })
    }

    // $(".close").on("click", function () {
    //     $(this).parent(".closeBox").parent(".appBar").hide();
    // });
    // function toTop() {
    //     $(".toTop").fadeOut();
    //     $(window).scroll(function () {
    //         var scrollValue = $(window).scrollTop();
    //         scrollValue > 100 ? $(".toTop").fadeIn() : $(".toTop").fadeOut();
    //     })
    //     $(".returnTop").click(function () {
    //         $('body,html').animate({'scrollTop': 0}, 200);
    //     });
    // }


});


