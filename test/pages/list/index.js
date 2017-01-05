Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
        curIndex: 0,
        getDisplay: 'none',
        goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
        cartImg: '../../image/footer-icon-03.png',
        selected: true,
        selected1: false,
        selected2: false,
         // 加入购物车的属性
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
    },
    onLoad: function () {
        var that = this
        wx.request({
            url: 'https://wx.upyuan.com/eb3/items?page_size=10&page_no=1', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    navLeftItems: res.data,
                    navRightItems: res.data
                })

            }
        })
    },
    //事件处理函数
    switchRightTab: function (e) {
        let id = e.target.dataset.id,
            index = parseIn(e.target.dataset.index);
        this.setData({
            curNav: id,
            curIndex: index
        })
    },
    // 处理加入购物车的信息
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
    // 购物车属性
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
    selected2: function (e) {
        this.setData({
            selected: false,
            selected2: true,
            selected1: false
        })
    }
});
