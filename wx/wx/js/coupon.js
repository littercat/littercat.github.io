$(document).ready(function () {
    if ($("#btnGetCoupon").attr("rel") == "user") {
        $(".content").css("height", "25.117em");
        $(".ticket-c").css("height", "7.65em");
        $(".ticket-c .disaccout-code").show();
    }

    if (parseInt($("#CouponGroupId").val()) == 0) {
        $("#btnGetCoupon").attr("rel", "close");
        $(".loadTips").html("该店铺没有设置默认优惠券信息哦！").show();
        $("#successCover").show();
    }
});

function GetInputInfo(item) {
    var oItem = $(item).attr("rel");
    var oExpire = $("#CouponExpire").val();
    if (oExpire == "-1") {
        alert("已过期，去店里享最新优惠！");
        return false;
    }

    //UserMode
    if (oItem == "close") {
        alert("该店铺没有设置默认优惠券信息哦！");
        return false;
    }

    //UserMode
    if (oItem == "user") {
        var cValue = $("#couponValueZone").html();
        var cCode = $(".disaccout-code strong").html();
        $("#couponValue").html(cValue);
        $("#couponCode").html(cCode);
        $(".formInput").hide();
        $("#btnGetCoupon").hide();
        $("#successTips").show();
        $("#successCover").show();
        return false;
    }

    if (oItem == "") {
        $(".formInput").show();
        $("#usrPhone").focus();
        $("#btnGetCoupon").html("确认并领取优惠券").attr("rel", "input");
    }
    if (oItem == "input") {
        var sPhone = $("#usrPhone");
        var sName = $("#usrName");
        var groupId = $("#CouponGroupId").val();
        if (sPhone.val() == "") {
            alert("请输入您的手机号码哦~");
            sPhone.focus();
            return false;
        }
        if (sName.val() == "") {
            alert("请输入您的姓名哦~");
            sName.focus();
            return false;
        }
        if (sPhone.val() != "" && sName.val() != "") {

            //var testPhone = /^(13[0-9]|15[0-9]|18[0-9]|14[5|7])\d{8}$/;
            var testPhone = /^1((3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$)/;
            if (testPhone.test(sPhone.val()) == false) {
                alert("请正确填写手机号码!");
                return false;
            }

            $("#btnGetCoupon").attr("rel", "loading");
            $(".loadTips").show();
            $("#successCover").show();
            $.ajax({
                type: 'POST',
                url: '/Ashx/Function.ashx?type=getcoupon',
                data: { "phone": sPhone.val(), "name": sName.val(), "group": groupId },
                success: function (data) {
                    $("#btnGetCoupon").attr("rel", "input");
                    $(".loadTips").hide();
                    if (data != "error") {
                        var jsonObj = $.parseJSON(data);
                        if (jsonObj.ErrStatus == 0) {
                            $("#couponValue").html(jsonObj.CouponValue);
                            $("#couponCode").html(jsonObj.CouponId);
                            $(".ticket-c .disaccout-code strong").html(jsonObj.CouponId);
                            $(".formInput").hide();
                            $("#btnGetCoupon").hide();
                            $("#successTips").show();
                            $("#successCover").show();
                        } else if (jsonObj.ErrStatus == -1) {
                            $("#successCover").hide();
                            alert("您已经领过本次优惠券了哦~");

                        } else if (jsonObj.ErrStatus == -4) {
                            $("#successCover").hide();
                            alert("优惠券已经被领完啦~");
                        } else {
                            $("#successCover").hide();
                            alert("获取优惠券失败，请联系商家处理！");
                        }
                    } else{
                        $("#successCover").hide();
                        alert("出现错误了哦~");
                    }
                }
            });
        }
    }
}

function closeTips() {
    $(".content").css("height", "25.117em");
    $(".ticket-c").css("height", "7.65em");
    $(".formInput").hide();
    $("#btnGetCoupon").hide();
    $("#successTips").hide();
    $("#successCover").hide();
    $(".ticket-c .disaccout-code").show();
}