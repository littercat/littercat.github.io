var app = getApp();
Page({
    data: {
        salelist: [],
        hiddenstyle: false
    },
    onLoad: function (options) {
        var _this = this;
        wx.request({
            url: app.globalym + '/retail_dailylist',
            data: options,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.body.length != 0) {
                    for (var i in res.data.body) {
                        res.data.body[i].amt = parseFloat(res.data.body[i].amt)
                        res.data.body[i].zk = parseFloat(res.data.body[i].zk);
                        var colorname = res.data.body[i].colorname;
                        res.data.body[i].colorname = colorname.replace(res.data.body[i].colorid, "");
                    }
                    _this.setData({
                        salelist: res.data.body
                    })
                }else{
                    _this.setData({
                        hiddenstyle: true
                    })
                }

            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})