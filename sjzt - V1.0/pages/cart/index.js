var app = getApp();
var totalsum2 = 0;
var countsum = 0;
var number = 0;
var num = 0;
var addnum = 0;
var cart = '';
Page({
  data: {
    cartImg: '../../image/cart-null.png',
    tipWords: '购物车空空如也',
    getDisplay: "none",
    cartnull: true,
    hidestyle: true,
    iscart: false,
    cart: [],
    withoutCart: [],
    count: 1,
    total: 0,
    goodsCount: 0,
    goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
    // 加入购物车出现的选择属性
    count: 0,//一共
    total: 0,// 不含运费
    selectedAllStatus: false,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    countprice: 0,
    item: [],
    goodsinfo: [],//商品详情
    attr: [],
    bgColor: 'default',
    colorid: 0,
    totalsum: 0,
    goodsprice: 0,
    gid: 0,
    countGe: 0,
    goodsGe: 0,
    orderGe: 0,
    hidden: true,
    attribute: [],
    cartGe: 0,
    myUserInfo: '',
    cartnull: true,
    careGe: ''

  },
  onShow: function () {
    var myUserInfo = getApp().my_userInfo
    var that = this
    this.setData({
      myUserInfo: myUserInfo,
    })
    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
    console.log(goodsCart);
    var arr = wx.getStorageSync(goodsCart) || [];
    console.log(arr);
    var countNull = 0
    if (arr.length > 0) {
      for (var i in arr) {
        if (arr[i].count == 0) {
          countNull++;
          if (countNull == arr.length) {
            this.setData({
              cartnull: false,
              count: 0
            })
            return
          }
        }
      }
      for (var i in arr) {
        // if (arr[i].count != 0) {
        this.data.total += Number(arr[i].sale);
        this.data.goodsCount += Number(arr[i].count);
        if (arr[i].selected == true) {
          arr[i].selected = false
        } 
        this.setData({
          iscart: true,
          cart: arr,
          total: this.data.total,
          goodsCount: this.data.count,
          selectedAllStatus: false,
          cartnull: true,
        });
        // } else {
        //   
        // }
      }
    } else {
      this.setData({
        cartnull: false,
        count: 0
      })
    }

  },
  // 选择商品的件数
  cartBtn: function (e) {
    this.setData({
      getDisplay: 'block'
    })
    var index = e.currentTarget.id;
    var gd = e.currentTarget.dataset.gd
    this.data.goodsGe = e.currentTarget.id;
    var goodsid = e.currentTarget.dataset.id;
    this.data.goodsprice = e.currentTarget.dataset.price;
    var _this = this;
    this.data.goodsid = goodsid;
    var withoutCart = this.data.cart
    console.log(gd);
    this.setData({
      withoutCart: withoutCart
    })
    for (var i in this.data.cart) {
      if (goodsid == this.data.cart[i].code) {
        var colors = this.data.cart[i].colors
        for (var j in colors) {
          this.data.colorid = colors[0].colorid;
        }
      }

    }
    this.setData({
      goodsid: goodsid,
      colorid: this.data.colorid,
      careGe: gd
    })
    console.log(this.data.careGe);
    // wx.request({
    //   url: 'https://upyuan.com/eb3/item_get?code=' + goodsid,
    //   data: {
    //      custcert :'',
    //     usercode :'',
    //     shopid:'',
    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     var colorT = res.data.body.colors;
    //     for (var i in colorT) {
    //       var sizeT = colorT[i].sizes;
    //       for (var m in sizeT) {
    //         sizeT[m]['count1'] = 0
    //       }
    //     }
    //     _this.setData({
    //       goodsinfo: res.data.body,
    //       attr: res.data.body.colors,
    //       goodsid: _this.data.goodsid,
    //       goodsGe:_this.data.goodsGe,
    //       cartGe:index
    //     })
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    // _this.data.attr;
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
    console.log(sizeno);
    this.setData({
      colorid: sizeno,
      totalsum: totalsum2
    })
    console.log(this.data.totalsum)
  },

  // 单件减
  bindMinus: function (e) {
    var sizeno = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var arr = null;
    var gd = this.data.careGe;
    // var num = this.data.typeattr[index].count1;
    for (var j in this.data.cart) {
      // if (gd == this.data.cart[j].id) {
      arr = this.data.cart[j].colors;
      for (var i in arr) {
        var colorid1 = arr[i].colorid;
        if (colorid1 == this.data.colorid) {
          var arr1 = arr[i].sizes;
          console.log(arr1);
          for (var j = 0; j < arr1.length; j++) {
            // var stkqty = 0;
            if (arr1[j].sizeno == sizeno) {
              // 如果只有1件了，就不允许再减了
              if (arr1[j].qty > 0) {
                (arr1[j].qty)--;
                num = arr1[j].qty;
                arr[i].stkqty = num;
              }
              arr[i].stkqty += arr1[j].qty;
              //  console.log(arr[i].stkqty)
            }
          }

          var total = num * price;
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 0 ? 'disabled' : 'normal';
          // 按钮可用状态
          // var minusStatuses = this.data.minusStatuses;
          // minusStatuses[j] = minusStatus;
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
      // }
    }
    // 将数值与状态写回
    this.setData({
      // minusStatuses: minusStatuses,
      total: this.data.total - parseInt(this.data.goodsprice),
      count: this.data.countGe - 1,
      cart: this.data.cart,
      countGe: this.data.countGe
    });
  },
  // 单件加
  bindPlus: function (e) {
    var sizeno = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var arr = null;
    var gd = this.data.careGe;
    for (var j in this.data.cart) {
      arr = this.data.cart[j].colors;
      var countnum = 0;
      // if (gd == this.data.cart[j].id) {
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
          // var minusStatuses = this.data.minusStatuses;
          // minusStatuses[i] = minusStatus;
          var tolNum = 0,
            tolPrice = 0;
          countnum = 0;
          for (var n in arr1) {
            tolPrice += arr1[n].qty * this.data.goodsprice;
            tolNum += arr1[n].qty;
            arr[i].stkqty = tolNum;
            this.data.countGe = tolNum;
          }
        }
      }
      var cart = this.data.cart;
      for (var i in cart) {
        cart[i].count;
      }
      // 将数值与状态写回
      this.setData({
        // minusStatuses: minusStatuses,
        total: parseInt(this.data.goodsprice) + this.data.total,
        countGe: this.data.countGe,
        cart: this.data.cart,
      });
      // }
    }


  },

  // 单选
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var item = this.data.cart;
    var selected = item[index].selected;
    this.data.selectedAllStatus = false;
    for (var i in item) {
      if (i == index) {
        var num = item[i].count;
        var goodsPrice = item[i].sale;
      }
    }
    if (!selected) {
      this.setData({
        count: this.data.count + num * goodsPrice,
        number: num + this.data.number,
        cart: this.data.cart
      });
    } else {
      this.setData({
        count: this.data.count - num * goodsPrice,
        number: this.data.number - num,
      });
    }
    item[index].selected = !selected;
    this.setData({
      cart: item
    })
    var arr = [];
    for (var i in item) {
      var items = item.length;
      if (item[i].selected == true) {
        arr.push(item[i]);
        var arrlength = arr.length;
      }
    }
    if (arrlength == 0) {
      this.setData({
        number: 0
      })
    }
    if (item.length == arrlength) {
      this.setData({
        selectedAllStatus: !this.data.selectedAllStatus,
        cart: item
      })
      return;
    } else {
      this.setData({
        selectedAllStatus: this.data.selectedAllStatus,
        cart: item
      })
      return;
    }
  },
  // 全选
  bindSelectAll: function () {
    var selectedAllStatus = this.data.selectedAllStatus;
    var item = this.data.cart;
    selectedAllStatus = !selectedAllStatus;
    if (selectedAllStatus) {
      for (var i = 0; i < item.length; i++) {
        item[i].selected = selectedAllStatus;
        console.log(item[i].selected);
        var num = parseInt(item[i].count);
        var price = parseInt(item[i].sale);
        this.setData({
          selectedAllStatus: selectedAllStatus,
          cart: item,
          count: this.data.count + num * price,
          number: this.data.number + num
        })
        // this.setData({
        //   count: this.data.count - num * price,
        //   number: this.data.number - num
        // });
      }
    } else {
      for (var i = 0; i < item.length; i++) {
        item[i].selected = selectedAllStatus;
        var num = parseInt(item[i].count);
        var price = parseInt(item[i].sale);
        this.setData({
          selectedAllStatus: selectedAllStatus,
          cart: item,
          count: 0,
          number: 0
        })
      }
    }
  },
  // 购物车属性
  clickButton: function (e) {
    this.setData({
      getDisplay: 'block',
    })

  },
  hideButton: function (e) {
    console.log(this.data.withoutCart);
    for (var i in this.data.withoutCart) {
      if (this.data.withoutCart[i].selected == true) {
        this.data.withoutCart[i].selected = false
      }
    }
    this.setData({
      getDisplay: 'none',
      cart: this.data.withoutCart
    })
  },
  confirm: function (e) {
    var cart = this.data.cart;
    var countSum = 0;
    var stkqty = 0
    for (var i in cart) {
      if (this.data.goodsid == cart[i].code) {
        var count = cart[i].count;
        // this.data.countGe += count;
        cart[i].count = this.data.countGe;
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
        for (var n in cart) {
          countSum += cart[n].count * cart[n].sale;
        }
        if (cart[i].selected == true) {
          this.setData({
            count: countSum
          })
        } else {
          this.setData({
            count: 0
          })
        }
      }

    }
    this.setData({
      getDisplay: 'none',
      countGe: 0,
      cart: cart,
    });
    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;

    wx.setStorageSync(goodsCart, cart);
  },
  // 点击跳转到订单详情
  settlement: function (e) {
    var order = this.data.cart;
    var orderArr = [];
    var orderGe = this.data.orderGe;
    var nullOrder = [];
    var selectedAllStatus = this.data.selectedAllStatus;
    var attributte = this.data.attributte;
    for (var i in order) {
      if (order[i].selected == true) {
        orderGe++;
        order[i]['id'] = orderGe
        orderArr.push(order[i]);
        wx.navigateTo({
          url: '../order/order',
        });
        this.setData({
          count: 0,
        })
        if (selectedAllStatus == true) {
          this.setData({
            selectedAllStatus: false
          })
        }
      }
      if (order[i].selected == false) {
        nullOrder.push(order[i].selected);
        if (nullOrder.length == order.length) {
          wx.showToast({
            title: '请勾选商品',
            icon: 'loading',
            duration: 10000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 1500)
        }
      }
    }
    for (var i in order) {
      if (order[i].id == orderGe) {
        var order = 'order_' + wx.getStorageSync('bInformation').usercode;
        var arr = wx.getStorageSync(order) || [];
        if (arr.length > 0) {
          try {
            wx.setStorageSync(order, orderArr);
          } catch (e) {
            console.log(e)
          }
        } else {
          wx.setStorageSync(order, orderArr);
        }
      }
    }
  },
  quality: function (e) {
    this.setData({
      hidestyle: false
    })
  },
  cancel: function (e) {
    this.setData({
      hidestyle: true
    })
  },
  combtn: function (e) {
    this.setData({
      hidestyle: true
    })
  },
  // 购物车为空 跳转到全部页面
  nowbuy: function () {
    wx.switchTab({
      url: '../list/index',
    })
  }
})
