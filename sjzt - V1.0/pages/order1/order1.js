var app = getApp();
var util = require('../../utils/util.js')
Page({
    data: {
        hidestyle: true,
        hideS: true,
        getDisplay: "none",
        selected2: true,
        selected3: false,
        selected4: false,
        tipWords: '消费记录空空如也',
        cartnull: true,
        goods: {
            img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80'
        },
        // 消费记录
        records: []

    },
    wuliu: function (e) {
        wx.redirectTo({
            url: '../wuli/wuli'
        })
    },
    onShow: function () {
        var _this = this;
        var information = wx.getStorageSync('bInformation')
        if (information.shops.length == 1) {
            this.setData({
                shopids: information.shops[0].shopid
            })
        } else {
            var information = wx.getStorageSync('bInformation');
            var shop = information.shops;
            var allshopids = '';
            var eachshopid = '';
            for (var i in shop) {
                eachshopid = shop[i].shopid;
                allshopids += eachshopid + ','
                if (i == shop.length - 1) {
                    allshopids += eachshopid
                }
            }
            this.setData({
                shopids: allshopids
            })
        }
        wx.showToast({
            title: '查询中',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: app.globalym + '/order_query',
            data: {
                custcert: '',//租户id
                usercode: information.usercode,//用户编号
                shopid: this.data.shopids,
                beginDate: GetDateStr(new Date()),
                //   outiodate:util.formatTime(new Date('2017-7-1')),
                endDate: util.formatTime(new Date()),
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.body.length > 0) {
                    for (var i in res.data.body) {
                         var aqty = 0;
                        // aqty = res.data.body[i].items.length;
                        for(var j in res.data.body[i].items){
                           aqty += parseInt(res.data.body[i].items[j].qty);
                        }
                        res.data.body[i]['aqty'] = aqty
                    }
                    _this.setData({
                        records: res.data.body,
                        cartnull: true
                    })
                } else {
                    _this.setData({
                        cartnull: false
                    })
                }

            },
            fail: function () {
                // fail
            },
            complete: function () {
                wx.hideToast()
            }
        })
    },
    // 点击跳转到订单详情
    settlement: function (e) {
        wx.navigateTo({
            url: '../order/order',
        })
    },
    clickButton: function (e) {
        this.setData({
            getDisplay: 'block',
        })

    },
    hideButton: function (e) {
        this.setData({
            getDisplay: 'none',
        })
    },
    confirm: function (e) {
        this.setData({
            toastHidden: false,
            getDisplay: 'none',
        })
    },
    quality: function (e) {
        console.log('11');
        this.setData({
            hideS: false
        })
    },
    cancel: function (e) {
        this.setData({
            hideS: true
        })
    },
    combtn: function (e) {
        this.setData({
            hideS: true
        })
    },
    // 订单为空 跳转到全部页面
    nowbuy: function () {
        wx.switchTab({
            url: '../list/index',
        })
    }
})

// 上个月时间的订单
function GetDateStr(date) {
    var dd = date;
    //   dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear().toString();
    var m = (dd.getMonth()).toString();//获取当前月份的日期 
    var d = (dd.getDate()).toString();
    if (m.length == 1) {
        m = '0' + m;
        console.log(m);
    }
    if (d.length == 1) {
        d = '0' + d
    }
    return (y + m + d);
}