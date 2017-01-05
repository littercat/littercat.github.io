//倒计时
function countdown(that, n) {
    n = 1;
    var second = that.data.second - n;
    console.log(second)
    that.setData({
        second: second
    });
    if (second <= 0) {
        clearInterval(time);
        that.setData({
            text: '请重新发送',
            code: 'inputAgin',
            second: 60
        });
        return false;
    }
    var time = setTimeout(function () {
        that.setData({
            text: second + '秒',
        });
        console.log(second)
        countdown(that, n);
    }, 1000)

}




var app = getApp();
Page({
    data: {
        shop: {
            img: '../../image/icon64_appwx_logo.png',
            name: '连锁2店-服装'
        },
        phone: '',
        text: '发送验证码',
        second: 60,
        code: 'inputcode'
    },
    // onLoad: function(options) {
    //     this.setData({
    //     title: options.title
    //     })
    // }
    onLoad: function () {
        // countdown(this);
    },
    loginbtn: function (e) {
        wx.switchTab({
            url: '../index/index',
        })
    },
    listenerPhoneInput: function (e) {
        this.data.phone = e.detail.value;
        console.log(this.data.phone)
    },
    inputcode: function (e) {
        console.log(typeof this.data.phone);
        var regNum = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
        var rsNum = regNum.test(parseInt(this.data.phone));
        var n = 1;
        if (rsNum) {
            countdown(this, n)
        } else {
            console.log('请输入正确的手机号!')
        }
    },
    inputAgin: function () {
        console.log(11);
        var n = 1;
        countdown(this, n)
    }
})
