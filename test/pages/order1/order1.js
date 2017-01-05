var app = getApp();
Page({
    data: {
        hidestyle: true,
        hideS: true,
        getDisplay: "none",
        selected2: true,
        selected3: false,
        selected4: false,
        goods: {
            img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80'
        },
        typeattr: [
            {
                size: 's',
                price: '399',
                num: '89'
            }, {
                size: 'L',
                price: '399',
                num: '89'
            }, {
                size: 'M',
                price: '399',
                num: '89'
            }
        ],
        info: [
            {
                time: '2016-11-08 12:54:33',
                totalnum: 5,
                freight: 0,
                totalmany: 5,
                getStyle: true,
                getStyle1: true,
                getStyle2: false,
                goods: [
                    {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: false,
                    }]
            },
            {
                time: '2016-11-08 12:54:33',
                totalnum: 5,
                freight: 0,
                totalmany: 5,
                getStyle: false,
                getStyle1: true,
                getStyle2: true,
                payment: 'payment',
                goods: [
                    {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: true,
                    }, {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: true,
                    }, {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: true,
                    }
                ],
            },
            {
                time: '2016-11-08 12:54:33',
                totalnum: 5,
                freight: 0,
                totalmany: 5,
                getStyle: true,
                getStyle1: false,
                getStyle2: true,
                goods: [
                    {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: false,
                    }, {
                        img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
                        title: '西服',
                        goodsid: '1234567',
                        price: 200,
                        goodsnum: 2,
                        goodsagain: '再次购买',
                        hidestyle: false,
                    }]
            }
        ],

    },
    wuliu: function (e) {
        wx.redirectTo({
            url: '../wuli/wuli'
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
     selected2:function(e){
        this.setData({
            selected3:false,
            selected4:false,
            selected2:true
        })
    },
    selected3:function(e){
        this.setData({
            selected2:false,
            selected4:false,
            selected3:true
        })
    },
    selected4:function(e){
        this.setData({
            selected2:false,
            selected4:true,
            selected3:false
        })
    },
})