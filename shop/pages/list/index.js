Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
        curIndex: 0,
        getDisplay: 'none',
        goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
        cartImg: '../../image/footer-icon-03.png',
    },
    onLoad: function () {
        var that = this
        wx.request({
            url: 'https://wx.upyuan.com/eb3/items?page_size=10&page_no=1', 
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
   
});
