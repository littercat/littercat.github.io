Page({
    data: {
        information: ''
    },
    onLoad: function () {
        var information = wx.getStorageSync('bInformation');
        this.setData({
            information: information.shops
        })
    },
    radioChange: function (e) {
        wx.showModal({
            title: '提示',
            content: '确定收货地址吗',
            confirmColor: '#118EDE',
            showCancel: true,
            success: function (res) {
                console.log(res.confirm);
                if (res.confirm == true) {
                    wx.redirectTo({
                        url: '../payment/payment?shopid=' + e.detail.value,
                    })
                } else {
                    wx.redirectTo({
                        url: '../payment/payment',
                    })
                }
            }
        });
    }
})