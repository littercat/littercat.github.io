var app = getApp();
var util = require('../../utils/util.js')
var flag = true
Page({
    data: {
        item: [],
        getDisplay: 'none',
        attribute: '',
        totalprice: '',
        placeOrder: '',
        orderlist: '',
        shopids: '',
        usercode: '',
        ftcompanyid: '',
        gform: '',
        gto: '',
        background:true
    },
    onLoad: function (options) {
        var placeOrder = options;
        console.log(options);
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
                totalprice: totalprice,
                placeOrder:placeOrder
            })
        }
        var information = wx.getStorageSync('bInformation');
        var usercode = information.usercode;
        var ftcompanyid = information.companyid;
        var companyid = information.parentcompany.companyid;
        var gform = information.parentcompany.wareid
        if (information.shops.length == 1) {
            console.log(information.shops);
            for (var i in information.shops) {
                var gto = information.shops[i].shopid
                this.setData({
                    shopids: information.shops[0].shopid,
                    gto: gto
                })
            }
        }
        // 获取缓存的地址
        wx.getStorageSync('address');
        this.data.item.push(wx.getStorageSync('address'));
        console.log(this.data.item);
        this.setData({
            usercode: usercode,
            companyid: companyid,
            ftcompanyid: ftcompanyid,
            gform: gform,
            item: this.data.item
        })
    },
    cancel: function (e) {
        console.log(flag);
        if (flag) {
            console.log(flag);
            wx.redirectTo({
                url: '../payment/payment',
            })
        }

    },
    resave: function (e) {
        var details = this.data.orderlist;
        var deleteID = null
        var receiver = JSON.stringify(this.data.item);
        var dataTime = util.formatTime(new Date());
        var _this = this;
        var attr = [];
        if (flag) {
            // for(var i in attribute){
            //     var attr = attribute[i];
            // }
            flag = false
            for (var i in details) {
                var price = details[i].sale;
                // }
                // for (var i in details) {
                var attrCount = details[i].colors;
                for (var k in attrCount) {
                    //    for(var m in details){
                    //    if(attrCount[k].code == details[m].code){
                    delete attrCount[k].colorname;
                    delete attrCount[k].imgurl;
                    delete attrCount[k].stkqty;
                    delete attrCount[k].code;
                    for (var j in attrCount[k].sizes) {
                        delete attrCount[k].sizes[j].stkqty;
                        delete attrCount[k].sizes[j].sizename;
                        attrCount[k].sizes[j]['price'] = price;
                        attrCount[k].sizes[j]['orgprice'] = price
                    }
                    attr = attrCount;
                }
            }
            var objorder = { orders: null, details: [] };
            var odetails = null;
            deleteID = details.map(function (e) {
                var orders = { code: null, colors: [] };
                for (var i in e) {
                    orders.code = e.code;
                    orders.colors = e.colors
                }
                return orders
            });
            var orders = { receiver: '', receiver_info: null, companyid: '', ftcompanyid: '', gfrom: '', gto: '', iodate: '', outiodate: '',remark:'' };
            orders.receiver = '';
            orders.receiver_info = this.data.item;
            orders.companyid = this.data.companyid;//组织编号
            orders.ftcompanyid = this.data.ftcompanyid;//店铺组织编号
            orders.gfrom = this.data.gform;//仓库编号
            orders.gto = this.data.shopids;//店铺id
            orders.iodate = dataTime;
            orders.outiodate = dataTime;
            orders.remark = this.data.placeOrder.remark;
            console.log(orders.remark);
            objorder.orders = orders;
            objorder.details = deleteID;

            // wx.showToast({
            //     title: '提交中',
            //     icon: 'loading',
            //     duration: 10000
            // })
            this.setData({
                background:false
            })
            console.log(objorder);
            wx.request({
                url: app.globalym + '/order_post',
                method: 'GET',
                data: {
                    custcert: '',//租户
                    usercode: this.data.usercode,//用户编号
                    order: objorder
                },
                success: function (res) {
                    if (res.data.code == 0) {
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            confirmColor: '#118EDE',
                            showCancel: false,
                            success: function (res) {
                            }

                        });
                        flag = true
                    } else {
                        flag = true
                        _this.setData({
                            getDisplay: 'block'
                        })
                    }
                },
                complete: function () {
                    // wx.hideToast();
                    _this.setData({
                        background:true
                    })
                },
                fail: function (res) {
                    console.log(res);
                },

            })
        }
    },
    confirm: function (e) {
        this.setData({
            getDisplay: 'none'
        })
        wx.redirectTo({
            url: '../order1/order1',
            success: function (res) {
                // success
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