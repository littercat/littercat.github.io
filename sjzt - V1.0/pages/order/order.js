var app = getApp();
var totalsum2 = 0;
var countsum = 0;
var number = 0;
var num = 0;
var addnum = 0;
var order = null;
Page({
  data: {
    getDisplay: "none",
    hidestyle: true,
    // 加入购物车出现的选择属性
    attr: [],
    goodsinfo: [],
    index1: 0,
    hideS: true,
    bgColor: 'default',
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    order: [],
    withoutOrder: [],
    countsum: 0,
    total: 0,
    count: 0,
    orderGe: 0,
    countGe: 0,
    myUserInfo: [],
    attribute: [],
    careGe: ''
  },
  onShow: function () {
    var myUserInfo = app.my_userInfo;
    this.setData({
      myUserInfo: myUserInfo
    })
    // // 获取order的存在数据库
    var order = 'order_' + wx.getStorageSync('bInformation').usercode;
    var orderlist = wx.getStorageSync(order) || [];
    var orderPrice = 0;
    if (orderlist.length > 0) {
      for (var i in orderlist) {
        orderPrice += orderlist[i].count * orderlist[i].sale
        this.data.countsum = orderPrice;
      }
      this.setData({
        iscart: true,
        order: orderlist,
        total: this.data.total,
        goodsCount: this.data.count,
        countsum: this.data.countsum,
      });
    }
  },
  // 提交订单
  submitOrder: function () {
    var order = this.data.order;
    wx.navigateTo({
      url: '../payment/payment',
    })
    var order = 'order_' + wx.getStorageSync('bInformation').usercode;
    var arr = wx.getStorageSync(order) || [];
    wx.setStorageSync(order, this.data.order);
    var orderGoods = wx.getStorageSync(order)
    for (var i in orderGoods) {
      var cartGoods = 'cart_' + wx.getStorageSync('bInformation').usercode;
      var cartGoodsA = wx.getStorageSync(cartGoods);
      
      var tempArr = [];
      for (var j in cartGoodsA) {
        console.log(cartGoodsA[j].code != orderGoods[i].code)
        if (cartGoodsA[j].code != orderGoods[i].code) {
          tempArr.push(cartGoodsA[j])
        }
      }
      console.log(tempArr);
      wx.setStorageSync(cartGoods, tempArr)
    }
  },
  // 选择商品的件数
  cartBtn: function (e) {
    this.setData({
      getDisplay: 'block'
    })
    var withoutOrder = this.data.order;
    this.setData({
      withoutOrder: withoutOrder
    })
    var index = e.currentTarget.id;
    var gd = e.currentTarget.dataset.gd;
    console.log(gd);
    this.data.goodsGe = e.currentTarget.id;
    var goodsid = e.currentTarget.dataset.id;
    this.data.goodsprice = e.currentTarget.dataset.price;
    console.log(this.data.goodsprice);
    var _this = this;
    this.data.goodsid = goodsid;
    order = this.data.order;
    for (var i in this.data.order) {
      if (goodsid == this.data.order[i].code) {
        var colors = this.data.order[i].colors
        for (var j in colors) {
          this.data.colorid = colors[0].colorid;
        }
      }
    }
    this.setData({
      goodsid: goodsid,
      colorid: this.data.colorid,
      careGe: gd,
      goodsprice: this.data.goodsprice
    })
    // wx.request({
    //   url: 'https://upyuan.com/eb3/item_get?code=' + goodsid,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     var colorT = res.data.body.colors;
    //     for (var i in colorT) {
    //       var sizeT = colorT[i].sizes;
    //       for (var m in sizeT) {
    //         sizeT[m]['qty'] = 0
    //       }
    //     }
    //     _this.setData({
    //       goodsinfo: res.data.body,
    //       attr: res.data.body.colors,
    //       goodsid: _this.data.goodsid,
    //       goodsGe:_this.data.goodsGe
    //     })
    //      console.log(_this.data.attr);
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     var colortype = _this.data.attr;
    //     var sizetype = colortype.colorid
    //     _this.setData({
    //       colorid: sizetype,
    //       goodsprice: _this.data.goodsprice
    //     })
    //   }
    // })
  },
  //点击颜色
  selected: function (e) {
    var sizeno = e.target.dataset.index;
    this.setData({
      colorid: sizeno,
      totalsum: totalsum2
    })
  },
  // 单件减
  bindMinus: function (e) {
    var sizeno = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var arr = null;
    var gd = this.data.careGe;
    // var num = this.data.typeattr[index].count1;
    for (var j in this.data.order) {
      arr = this.data.order[j].colors;
      var tCount = this.data.order[j].count;
      console.log(this.data.order);
      if (gd == this.data.order[j].id) {
        for (var i in arr) {
          var colorid1 = arr[i].colorid;
          if (colorid1 == this.data.colorid) {
            var arr1 = arr[i].sizes;
            for (var j = 0; j < arr1.length; j++) {
              if (arr1[j].sizeno == sizeno) {
                // 如果只有1件了，就不允许再减了
                if (arr1[j].qty > 0) {
                  (arr1[j].qty)--;
                  num = arr1[j].qty;
                  arr[i].stkqty = num;
                }
                arr[i].stkqty += arr1[j].qty;
                // tCount = arr[i].stkqty
              }
            }
            var total = num * price;
            // 只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 0 ? 'disabled' : 'normal';
            // 按钮可用状态
            var minusStatuses = this.data.minusStatuses;
            minusStatuses[j] = minusStatus;
            var tolNum = 0,
              tolPrice = 0;
            countsum = 0;
            for (var n in arr1) {
              tolPrice += arr1[n].qty * this.data.goodsprice;
              tolNum += arr1[n].qty;
              arr[i].stkqty = tolNum;
              this.data.countGe = arr[i].stkqty;
            }
          }
        }
      }
    }
    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      total: this.data.total - parseInt(this.data.goodsprice),
      countGe: this.data.countGe,
      order: this.data.order
    });
  },
  // 单件加
  bindPlus: function (e) {
    var sizeno = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var arr = null;
    var gd = this.data.careGe;
    for (var j in this.data.order) {
      arr = this.data.order[j].colors;
      var countnum = 0;
      if (gd == this.data.order[j].id) {
        for (var i in arr) {
          var colorid1 = arr[i].colorid;
          if (colorid1 == this.data.colorid) {
            var arr1 = arr[i].sizes;
            var eachCount = arr1[i].stkqty;
            for (var j in arr1) {
              if (arr1[j].sizeno == sizeno) {
                (arr1[j].qty)++;
                num = arr1[j].qty;
              }
              //  countnum += arr1[j].count1
            }

            // // 自增
            var total = num * price;
            // 只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 0 ? 'disabled' : 'normal';
            // 按钮可用状态
            var minusStatuses = this.data.minusStatuses;
            minusStatuses[i] = minusStatus;
            var tolNum = 0,
              tolPrice = 0;
            countnum = 0;
            for (var n in arr1) {
              tolPrice += arr1[n].qty * this.data.goodsprice;
              tolNum += arr1[n].qty;
              arr[i].stkqty = tolNum;
              this.data.countGe = tolNum
            }
          }
        }
      }
    }
    var order = this.data.order;
    for (var i in order) {
      order[i].count;
    }
    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      total: parseInt(this.data.goodsprice) + this.data.total,
      countGe: this.data.countGe,
      order: this.data.order
    });
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
      order: this.data.withoutOrder
    })

  },
  // 确定
  confirm: function (e) {
    var cart = this.data.order;
    console.log(cart);
    var countsum = 0;
    var eachcountGe = 0;
    var stkqty = null;
    for (var i in cart) {
      console.log(cart);
      if (this.data.careGe == cart[i].id) {
        var count = cart[i].count;
        // eachcountGe += count;
        // console.log(eachcountGe)
        // this.data.countGe = eachcountGe
        cart[i].count = this.data.countGe;
        console.log(cart[i].count);
        var arr1 = cart[i].colors;
        for (var j in arr1) {
          stkqty += arr1[j].stkqty
          if (this.data.colorid == arr1[j].colorid) {
            var sizes = arr1[j]
            for (var k in sizes) {
              var sizeno = sizes[k].sizes;
              for (var i in sizeno) {
                sizeno[i].qty = count
              }
            }
          }
        }
        cart[i].count = stkqty;
      }
      countsum += cart[i].count * cart[i].sale
    };
    this.setData({
      getDisplay: 'none',
      countGe: count,
      order: cart,
      countsum: countsum
    });

  },

  // selected: function (e) {
  //   var index = e.target.dataset.index;
  //   this.setData({
  //     index1: index
  //   })
  //   console.log(index);
  //   console.log(this);
  // },
})