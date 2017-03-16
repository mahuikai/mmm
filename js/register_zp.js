$(function () {
    // $('input').on("blur", function () {
    //     check();
    // });
    $('.verify').on('click', function () {
        var _this = $(this);
        //不能重复点击
        if (_this.hasClass('disabled')) {
            return false;
        }
        var ses = 60;
        var t = setInterval(function () {

            _this.val(ses-- + '秒后重新获取').addClass('disabled');
            if (ses < 0) {
                clearInterval(t);
                _this.val('获取验证码')
                    .removeClass('disabled');
            }
        }, 1000);

    });

    $.idcode.setCode();   //加载生成验证码方法
    $("#loginSub").on("click", function () {
        var _this = $(this);
        if (_this.hasClass('disabled')) {
            return false;
        }
        checkuse();
        checkpwd();
        checkpass();
        checktel();
        checkmail();
        CAPTCHA();
        ImgCAPTCHA();
        var IsBy = $.idcode.validateCode();  //调用返回值，返回值结果为true或者false
        if (IsBy) {

        } else {
            $("#imageReminder").show().children("span").html("验证码输入有误");
            return false;
        }

        if (check()) {
            _this.addClass('disabled').val("正在提交...");
        } else {
            return false;
        }
    });


    // 判断用户名
    function checkuse() {
        //在每个函数中定义check变量是为了在表单提交后，能够逐个验证每个函数是否通（以下同理）
        var check;
        var username = $("input[name=username]").val();
        var Expression = /^[\w]{3,10}$/;
        var objExp = new RegExp(Expression); //创建正则表达式对象
        if ($("input[name=username]").val() == 'null' || $("input[name=username]").val() == "") {
            $("#nameReminder").show().children("span").html("用户名不能为空");
            // $("input[name=username]").focus();
            check = false;
        } else if (objExp.test(username) == false) {
            $("#nameReminder").show().children("span").html("您输入的用户名格式错误");
            //在此处输入错误，当然要在此处继续输入了;
            // $("input[name=username]").focus();
            check = false;
        } else {
            $("#nameReminder").hide();
            check = true;
        }
        return check;
    }

    // 判断密码符合要求
    function checkpwd() {
        var check;
        var password = $("#pass1").val();
        var Expression = /^[\w.]{6,20}$/;
        var objExp = new RegExp(Expression);
        if ($("#pass1").val() == 'null' || $("#pass1").val() == "") {
            $("#wordReminder").show().children("span").html("密码不能为空");
            check = false;
        } else if (objExp.test(password) == false) {
            $("#wordReminder").show().children("span").html("您输入的密码格式错误");
            check = false;
        } else {
            $("#wordReminder").hide();
            check = true;
        }
        return check;
    }

    // 验证密码是否不一致！
    function checkpass() {
        var check;
        var password = $("#pass1").val();
        var passtext = $("#pass2").val();
        if ($("#pass2").val() == 'null' || $("#pass2").val() == "") {
            $("#passReminder").show().children("span").html("密码不能为空");
            check = false;
        } else if (password != passtext) {
            $("#passReminder").show().children("span").html("两次输入密码不一致，请重新输入！");
            check = false;
        } else {
            $("#passReminder").hide();
            check = true;
        }
        return check;
    }

    // 验证手机号
    function checktel() {
        //在每个函数中定义check变量是为了在表单提交后，能够逐个验证每个函数是否通（以下同理）
        var check;
        var tel = $("input[name=tel]").val();
        var Expression = /^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/;
        var objExp = new RegExp(Expression); //创建正则表达式对象
        if ($("input[name=tel]").val() == 'null' || $("input[name=tel]").val() == "") {
            $("#telReminder").show().children("span").html("手机号不能为空");
            check = false;
        } else if (objExp.test(tel) == false) {
            $("#telReminder").show().children("span").html("您输入的手机号格式错误");
            check = false;
        } else {
            $("#telReminder").hide();
            check = true;
        }
        return check;
    }

    // 验证邮箱
    function checkmail() {
        //在每个函数中定义check变量是为了在表单提交后，能够逐个验证每个函数是否通（以下同理）
        var check;
        var mail = $("input[name=mail]").val();
        var Expression = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
        var objExp = new RegExp(Expression); //创建正则表达式对象
        if ($("input[name=mail]").val() == 'null' || $("input[name=mail]").val() == "") {
            $("#mailReminder").show().children("span").html("邮箱不能为空");
            check = false;
        } else if (objExp.test(mail) == false) {
            $("#mailReminder").show().children("span").html("您输入的邮箱格式错误");
            check = false;
        } else {
            $("#mailReminder").hide();
            check = true;
        }
        return check;
    }

    // 手机验证码和图片验证码不为空的判断
    function CAPTCHA() {
        //在每个函数中定义check变量是为了在表单提交后，能够逐个验证每个函数是否通（以下同理）
        var check;
        if ($("input[name=code]").val() == 'null' || $("input[name=code]").val() == "") {
            $("#capReminder").show().children("span").html("验证码不能为空");
            check = false;
        } else {
            $("#capReminder").hide();
            check = true;
        }
        return check;
    }

    function ImgCAPTCHA() {
        //在每个函数中定义check变量是为了在表单提交后，能够逐个验证每个函数是否通（以下同理）
        var check;
        if ($("input[name=imageRes]").val() == 'null' || $("input[name=imageRes]").val() == "") {
            $("#imageReminder").show().children("span").html("验证码不能为空");
            check = false;
        } else {
            $("#imageReminder").hide();
            check = true;
        }
        return check;
    }


    function check() {
        var check = checkuse() && checkpwd() && checkpass() && checktel() && checkmail() && CAPTCHA() && ImgCAPTCHA();
        return check;
    }

});





