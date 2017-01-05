Page({
    data: {
        imgUrls: [
            'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
            'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
            'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
            'https://hamlet.b0.upaiyun.com/1609/20180/934270f1be264c63bfaf85b37e545928.jpg!/fwfh/640x352/quality/80',
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        count: 1,
        toastHidden: true,
        conceal: '',
        goods: {
            id: '',
            name: '',
            price: '',
            img: ''
        },
        selected: true,
        selected1: false,
        selected2: true,
        selected3: false,
        selected4: false,
        item: {
            ueser: '张三',
            comment: '很好',
            img: '../../image/icon64_appwx_logo.png',
            time: '12-30 10:29'
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
        getDisplay: 'none',
        hidestyle: true
    },
    onLoad: function (options) {
        this.data.imgUrls[0] = options.img;
        console.log(options);
        this.setData({
            goods: {
                id: options.id,
                name: options.name,
                price: options.price,
                img: options.img,
            }
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    // 进入店铺
    enterShop: function () {
        wx.switchTab({
            url: '../index/index',
        })
    },
    cart: function () {
        wx.switchTab({
            url: '../cart/index',
        })
    },
    delCount: function () {
        if (this.data.count == 1) {
            return;
        }
        this.setData({
            count: --this.data.count
        })
    },
    addCount: function () {
        this.setData({
            count: ++this.data.count
        })
    },
    toastChange: function () {
        this.setData({
            toastHidden: true
        })
    },
    addcart: function () {
        this.setData({
            getDisplay: 'block',
            conceal: false
        });
        this.data.goods.count = this.data.count;
        var arr = wx.getStorageSync('cart') || [];
        if (arr.length > 0) {
            for (var i in arr) {
                if (arr[i].id == this.data.goods.id) {
                    arr[i].count = arr[i].count + this.data.goods.count;
                    try {
                        wx.setStorageSync('cart', arr)
                    } catch (e) {
                        console.log(e)
                    }
                    return;
                }
            }
            arr.push(this.data.goods);
        } else {
            arr.push(this.data.goods);
        }
        try {
            wx.setStorageSync('cart', arr)
        } catch (e) {
            console.log(e)
        }
    },
    //    立即购买
    buy: function () {
        this.setData({
            getDisplay: 'block',
            conceal: true
        });
    },
    // 点击数字出现输入数字的边框
    quality: function (e) {
        this.setdata({
            hidestyle: false
        })
    },
    cancel: function (e) {
        this.setdata({
            hidestyle: true
        })
    },
    combtn: function (e) {
        this.setdata({
            hidestyle: true
        })
    },
    confirm: function (e) {
        this.setData({
            getDisplay: 'none',
        })
    },
    selected: function (e) {
        this.setData({
            selected1: false,
            selected2: false,
            selected: true
        })
    },
    selected1: function (e) {
        this.setData({
            selected: false,
            selected2: false,
            selected1: true
        })
    },

    // 购物车属性
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
    selected2: function (e) {
        this.setData({
            selected1: false,
            selected2: false,
            selected: true
        })
    },
    selected3: function (e) {
        this.setData({
            selected: false,
            selected2: false,
            selected1: true
        })
    },
    selected4: function (e) {
        this.setData({
            selected: false,
            selected2: true,
            selected1: false
        })
    },

})
