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
    getDisplay: 'none',
    hidestyle: true,
    toastHidden: true,
    id: '',
    goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
    // https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80
    // nav
    navs: [
      {
        image: '../../image/new.png',
        text: '新款商品',
        btn: 'newbtn',
      }, {
        image: '../../image/collection.png',
        text: '收藏商品',
        btn: 'collect',
      }, {
        image: '../../image/buy.png',
        text: '最近购买',
        btn: 'buynow',
      }, {
        image: '../../image/buyAgain.png',
        text: '再次购买',
        btn: 'buyagain',
      }
    ],
    // 加入购物车的属性
    typeattr: [
      {
        size: 's',
        price: '100',
        num1: '86',
        count1: 0
      }, {
        size: 'M',
        price: '120',
        num1: '88',
        count1: 0
      }, {
        size: 'L',
        price: '140',
        num1: '85',
        count1: 0
      }
    ],
    carImg: "../../image/footer-icon-03.png",
    // 加入购物车出现的选择属性
    selected: true,
    selected1: false,
    selected2: false,
    // 加减购物车的初始值
    // num:0,
    // totalprice:0,
    iscart: false,
    cart: [],
    count: 1,
    total: 0,
    goodsCount: 0,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    url: 'https://wx.upyuan.com/eb3/items?page_size=10&page_no=1',

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swiperchange: function (e) {

  },
  // 新款商品
  newbtn: function () {
    console.log(111);
    wx.switchTab({
      url: '../list/index',
    })
  },
  // 收藏商品
  collect: function () {
    wx.navigateTo({
      url: '../like/like',
    })
  },
  // 最近购买
  buynow: function () {
    wx.navigateTo({
      url: '../order1/order1',
    })
  },
  // 再次购买
  buyagain: function () {
    wx.navigateTo({
      url: '../order1/order1',
    })
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
    }),
      // this.setData({
      //   title: options.title
      //   }),
      wx.request({
        url: this.data.url,
        // wx5577dc540fc1050a/0/
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            navLeftItems: res.data,
            navRightItems: res.data
          })
        },
        fail: function (r) {
          console.log(r)
        },
        complete: function (v) {
          console.log(v);
        }
      })
  },
  // 点击出现加入购物车的页面
  clickButton: function (e) {
    var index = e.target.id;
    // var index = this.data.index;
    // this.data.typeattr[index].count1 = 0;
    var arr = this.data.typeattr;
    var cart = wx.getStorageSync('cart') || [];
    if (wx.getStorageSync('cart').length > 1) {
      for (var j in cart) {
        if (cart[j].num_iid != this.data.navLeftItems[index].num_iid) {
          for (var i in arr) {
            this.data.typeattr[i].count1 = 0;
          }
          this.setData({
            total: 0,
            count: 0,
          })
        }
      }
    }
    console.log(this.data.typeattr)
    this.setData({
      getDisplay: 'block',
      goodsImg: this.data.navLeftItems.img_url,
      id: e.target.dataset.id,
      numid: e.target.id,
      typeattr: this.data.typeattr
    })


  },
  hideButton: function (e) {
    this.setData({
      getDisplay: 'none',
    })
  },
  // 事件处理 加入购物车字样消失
  toastChange: function () {
    this.setData({
      toastHidden: true
    })
  },

  // 购物车减件数
  delCount: function (e) {
    var index = this.data.numid;
    var num = this.data.count;
    var price = this.data.navLeftItems[index].price;
    console.log(num);
    if (num > 0) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    // 将数值与状态写回
    this.setData({
      count: num,
      minusStatus: minusStatus,
      total: num * price
    })
  },
  // 购物车加件数
  addCount: function (e) {
    var index = this.data.numid;
    console.log(index);
    var num = this.data.count;
    var price = this.data.navLeftItems[index].price;
    num++;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    this.setData({
      count: num,
      minusStatus: minusStatus,
      total: num * price
    })
  },
  // 手动填入数量
  quality: function (e) {
    var index = e.target.dataset.index;
    this.setData({
      hidestyle: false,
      index: e.target.dataset.index
    })
  },
  goodsCount: function (e) {
    this.data.quality = e.detail.value;
  },
  cancel: function () {
    this.setData({
      hidestyle: true
    })
  },


  // 手动输入数字点击取消
  cancel: function (e) {
    this.setData({
      hidestyle: true
    })
  },
  // 手动输入数字点击确定
  combtn: function (e) {
    var num = this.data.count1;
    var index = this.data.index;
    this.data.typeattr[index].count1 = this.data.quality;
    console.log(this.data.typeattr[index].count1);
    console.log(this.data.typeattr)
    var arr = this.data.typeattr;
    var tolNum = 0,
      tolPrice = 0;
    for (var i in arr) {
      console.log(arr[i].size);
      tolNum += arr[i].count1 * arr[i].price;
      tolPrice += parseInt(arr[i].count1);
    }
    this.setData({
      hidestyle: true,
      typeattr: this.data.typeattr,
      total: tolNum,
      count: tolPrice
    })

  },
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var price = this.data.typeattr[index].price
    var num = this.data.typeattr[index].count1;
    // 如果只有1件了，就不允许再减了
    if (num > 0) {
      num--;
    }
    var total = num * price;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    // 购物车数据
    var typeattr = this.data.typeattr;
    typeattr[index].count1 = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    var arr = this.data.typeattr;
    console.log(typeattr);
    var tolNum = 0,
      tolPrice = 0;
    for (var i in arr) {
      tolNum += arr[i].count1 * arr[i].price;
      tolPrice += arr[i].count1;
    }
    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      total: tolNum,
      count: tolPrice,
      typeattr: typeattr
    });
  },
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var price = this.data.typeattr[index].price
    var num = this.data.typeattr[index].count1;
    // // 自增
    num++;
    var total = num * price;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    // 购物车数据
    var typeattr = this.data.typeattr;
    typeattr[index].count1 = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    var arr = this.data.typeattr;
    console.log(typeattr);
    var tolNum = 0,
      tolPrice = 0;
    for (var i in arr) {
      console.log(arr[i].size);
      tolNum += arr[i].count1 * arr[i].price;
      tolPrice += arr[i].count1;
    }
    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      // total: typeattr[0].count1*typeattr[0].price+typeattr[1].count1*typeattr[1].price+typeattr[2].count1*typeattr[2].price,
      // count: typeattr[0].count1+typeattr[1].count1+typeattr[2].count1,
      total: tolNum,
      count: tolPrice,
      typeattr: typeattr
    });
  },

  // 加入购物车
  addcart: function (e) {
    this.setData({
      toastHidden: false,
      getDisplay: 'none',
    });
    if(this.data.total!=0){
      for (var i in this.data.navLeftItems) {
        var id = this.data.id
        if (this.data.navLeftItems[i].num_iid == id) {
          this.data.navLeftItems[i].count = this.data.count;
          var arr = wx.getStorageSync('cart') || [];
          var arr1 = wx.getStorageSync('attr') || [];
          // 商品放入本地存储
          if (arr.length > 0) {
            for (var j in arr) {
              if (arr[j].num_iid == this.data.id) {
                arr[j].count = arr[j].count + 1;
                try {
                  wx.setStorageSync('cart', arr)
                } catch (e) {
                  console.log(e)
                }
                return;
              }
            }
            arr.push(this.data.navLeftItems[i]);
          } else {
            arr.push(this.data.navLeftItems[i]);
          }
          try {
            wx.setStorageSync('cart', arr)
            // wx.clearStorageSync()
            return;
          } catch (e) {
            console.log(e)
          }
          // 商品的属性存入本地
          if(arr1.length > 1){
            for(var m in arr1){
              if(arr1[m].num_iid == this.data.id) {
                arr[m].count1 = arr[m].count1 +1;
                try{
                  wx.setStorageSync('attr',arr1)
                } catch(e){
                  console.log(e)
                }
                return;
              }
            }
            arr1.push(this.data.typeattr[m]);
          } else {
            arr1.push(this.data.typeattr[m]);
          }
          try {
            wx.setStorageSync('attr', arr1)
            // wx.clearStorageSync()
            return;
          } catch (e) {
            console.log(e)
          }
        }
      }
    }else{
      console.log('mei')
    }
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
  },


})

// 封装函数购物车减
