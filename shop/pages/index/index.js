//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // 轮播
    images: [
      'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/20180/934270f1be264c63bfaf85b37e545928.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/20171/77f7a3c93fd641bf95150501ef9a7cad.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
      'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    curIndex: 0,
    // 进入店铺
    shop: {
      img: '../../image/icon64_appwx_logo.png',
      shopName: '连锁2店-服装',
      img1: '../../image/icon_API_HL.png'
    },
    notice: '公告：新店开业，全场五折！！！',
    // 优惠券
    coupon: {
      price: 10,
      sort: '新店礼品券10元',
      range: '全场通用',
      time: '2017-02-10'
    },
    // 联系店家
    displaystyle:true

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swiperchange: function (e) {

  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: 'https://wx.upyuan.com/eb3/items?page_size=10&page_no=1',
      // wx5577dc540fc1050a/0/
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          navLeftItems: res.data,
          navRightItems: res.data
        });
      },
      fail: function (r) {
        console.log(r)
      },
      complete: function (v) {
        console.log(v);
      }
    })
  },
  // 点击领取购物券
  obtainC:function(){
    wx.navigateTo({
      url: '../coupon1/coupon1',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // 点击进去店铺
  contect:function(){
    this.setData({
      displaystyle:false
    })
  },
  closeBtn:function(){
    this.setData({
      displaystyle:true
    })
  }

})
