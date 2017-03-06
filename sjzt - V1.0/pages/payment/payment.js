var app = getApp();
var util = require('../../utils/util.js')
Page({
    data: {
        addressImg: '../../image/icon_API.png',
        item: [],
        myUserInfo: '',
        orderlist: '',
        attribute: '',
        totalprice: '',
        inputValue: ''
    },
    onLoad: function (options) {
        var myUserInfo = app.my_userInfo;
        var order = 'order_' + wx.getStorageSync('bInformation').usercode;
        var orderlist = wx.getStorageSync(order) || [];
        var orderPrice = 0;
        var totalprice = 0
        if (orderlist.length > 0) {
            for (var i in orderlist) {
                totalprice += orderlist[i].sale * orderlist[i].count;
            }
            this.setData({
                myUserInfo: myUserInfo,
                orderlist: orderlist,
                totalprice: totalprice
            })
        }
        var information = wx.getStorageSync('bInformation');
        console.log(options != '');
        console.log(options.length != 0);
        console.log(options);
        if (options.shopid !=undefined ) {
            for (var i in information.shops) {
                if (options.shopid == information.shops[i].shopid) {
                    this.data.item.push(information.shops[i])
                    this.setData({
                        item: this.data.item
                    })
                }
            }
        } else {
            this.data.item.push(information.shops[0]);
            console.log(information.shops[0]);
            console.log(this.data.item);
            this.setData({
                item: this.data.item
            })
        }


        console.log(this.data.item);
    },
    // 获取留言信息
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    // 跳转到地址页面
    // manage:function(e){
    //     wx.navigateTo({
    //       url: '../address/address',
    //     })
    // },
    manage: function (e) {
        wx.redirectTo({
            url: '../address2/address2',
        })
    },
    cash: function (e) {
        var datatime = util.formatTime(new Date());
        var item = this.data.item[0];
        wx.setStorageSync('address', this.data.item[0])
        wx.redirectTo({
            url: '../cashpayment/cashpayment?iodate=' + datatime + '&outiodate=' + datatime + '&remark=' + this.data.inputValue,
        })
    },
    cardPay: function (e) {
        wx.redirectTo({
            url: '../sucpay/sucpay',
        })
    }
})