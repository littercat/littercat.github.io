//index.js
//获取应用实例
var app = getApp();
var totalsum2 = 0;
var countsum = 0;
var number = 0;
var num = 0;
var addnum = 0;
var olist = [];
var searchWord = '';
var id = 0;
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    curIndex: 0,
    getDisplay: 'none',
    hidestyle: true,
    toastHidden: true,
    id: '',
    goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
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
    attr: [],
    images: [],
    imgArr: [],
    carImg: "../../image/footer-icon-03.png",
    eachCount: 0,
    iscart: false,
    cart: [],
    count: 0,
    total: 0,
    goodsCount: 0,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    bgColor: 'default',
    colorid: 0,
    totalsum: 0,
    goodsprice: 0,
    gid: 0,
    colorImg: '',
    // 图片懒加载
    // text:"这是一个页面"
    hidden: false,
    //搜索名称
    searchName: null,
    //pageindex
    pageIdx: 1,
    //产品列表
    productArr: [],
    clientHeight: 0,
    arr: [],
    arrHight: [],
    myUserInfo: '',
    // cartGe: false,
    every: '',
    pageno: 1,
    sGoodHidden: false,
    allHidden: true,
    sGoodHidden: true,
    n_moreGOods: true,
    // network: false,
    barcode: '',
    // 轮播图
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    Allcount: 0,
    transform: '',
    searchWord: '',
    allSingle: "",
    resLength: 1,
    flag: false
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
    olist[0]["code"] = "001";
    olist[0]["codename"] = "yf";
    olist[1]["code1"] = "002";
    olist[1]["codename2"] = "yf2";
    // this.golbalnum.olist[i]["colors"] = colorobj;
    //  this.golbalnum.olist[i]["address"] = addressobj;

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
  // // 最近购买
  // buynow: function () {
  //   wx.navigateTo({
  //     url: '../order1/order1',
  //   })
  // },
  // // 再次购买
  // buyagain: function () {
  //   wx.navigateTo({
  //     url: '../order1/order1',
  //   })
  // },
  onShow: function (options) {
    var myUserInfo = app.my_userInfo
    var that = this;
    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
    this.setData({
      myUserInfo: myUserInfo
    })
    searchWord = '';
    this.setData({
      searchWord: ''
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    });
    // 获得手机屏幕
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    // 设置头部的名字
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('bInformation').username
    })
    var goodsCartA = wx.getStorageSync(goodsCart)
    wx.request({
      url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
      data: {
        // goods_commend:'1'
        custcert: '',
        usercode: wx.getStorageSync('bInformation').usercode,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        for (var j in res.data.body) {
          if (goodsCartA.length > 0) {
            var Allcount = 0;
            for (var i in goodsCartA) {
              var gCode = goodsCartA[i].code;
              var gCodeArr = [];
              if (res.data.body[j].hidden == false) {
                res.data.body[j].hidden = false;
              } else {
                res.data.body[j].hidden = true;
              }
              if (res.data.body[j].code == gCode) {
                gCodeArr.push(goodsCartA[i]);
                for (var n in gCodeArr) {
                  Allcount += gCodeArr[n].count;
                  if (Allcount != 0) {
                    res.data.body[j]['Allcount'] = Allcount;
                    res.data.body[j].hidden = false;
                  } else {
                    res.data.body[j]['Allcount'] = Allcount;
                    res.data.body[j].hidden = true;
                  }
                }
              }
            }
          } else {
            res.data.body[j]['hidden'] = true
          }
        }
        for (var i in res.data.body) {
          res.data.body[i].sale = parseFloat(res.data.body[i].sale);
        }
        that.setData({
          navLeftItems: res.data.body,
          hidden: true,
          sGoodHidden: false,
          allHidden: true
        })
        var arr = [];
        var length = Array.from(res.data.body).length;
        var isD = length % 2 == 0 ? true : false;
        var arrHight = [];
        for (var i = 0; i < length; i++) {
          arr[i] = false;
          arrHight[i] = Math.floor(i / 2) * (320 / 750) * 520;
        }
        that.setData({
          arr: arr,
          productArr: Array.from(res.data.body),
          arrHight: arrHight
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })

  },
  scroll: function (e) {
    var seeHeight = this.data.clientHeight; //可见区域高度
    var arrHight = this.data.arrHight;
    var event = e;
    var scrollTop = event.detail.scrollTop;
    var arr = this.data.arr
    for (var i = 0; i < this.data.navLeftItems.length; i++) {
      if (arrHight[i] < scrollTop) {
        if (arr[i] == false) {
          arr[i] = true;
          // arr[i*2]   arr[i*2+1] 
        }
        //n = i + 1;
      }
      //arr[i] = true;
    }
    this.setData({
      arr: arr
    })
  },
  // 点击出现加入购物车的页面
  clickButton: function (e) {
    var index = e.target.id;
    var goodsid = e.currentTarget.dataset.numid;
    this.data.goodsprice = e.currentTarget.dataset.price;
    var _this = this;
    var upperid = wx.getStorageSync('bInformation').parentcompany.wareid
    this.data.goodsid = goodsid;
    wx.setStorageSync('goodsCode', goodsid)
    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
    var goodsCartA = wx.getStorageSync(goodsCart);
    wx.request({
      url: app.globalym + '/item_get',
      data: {
        custcert: '',
        usercode: wx.getStorageSync('bInformation').usercode,
        shopid: upperid,
        code: goodsid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        var colorT = res.data.body.colors;
        // if(res.data.body.count)
        for (var i in colorT) {
          var sizeT = colorT[i].sizes;
          colorT[i].stkqty = 0;
          for (var m in sizeT) {
            sizeT[m]['qty'] = 0
          }
        }
        for (var i in _this.data.navLeftItems) {
          if (res.data.body.code == _this.data.navLeftItems[i].code) {
            _this.data.navLeftItems[i]['stkqty'] = res.data.body.stkqty
          }
        }
        var goodsCount = 0;
        if (goodsCartA.length > 0) {
          for (var i in goodsCartA) {
            if (goodsCartA[i].code == res.data.body.code) {
              res.data.body.colors = goodsCartA[i].colors
              for (var j in goodsCartA[i].colors) {
                goodsCount += goodsCartA[i].colors[j].stkqty
              }
              _this.setData({
                count: goodsCount,
                total: goodsCount * res.data.body.sale
              })
            }
          }
        }
        _this.setData({
          navRightItems: res.data.body,
          navLeftItems: _this.data.navLeftItems,
          attr: res.data.body.colors,
          images: res.data.body.images,
          goodsid: _this.data.goodsid,
          every: index,
        })
        var colortype = _this.data.attr;
        var sizetype = colortype[0].colorid;
        _this.setData({
          colorid: sizetype,
          goodsprice: _this.data.goodsprice,
        })
      },
      complete: function () {
        var imgArr = [];
        if (_this.data.images.length > 0) {
          for (var i in _this.data.images) {
            if (_this.data.images[i].colorid == _this.data.colorid) {

              imgArr.push(_this.data.images[i].imgurl);
            }
          }
        } else {
          imgArr.push('../../image/w_logo_0.png');
          _this.setData({
            transform: '',
          })
        }
        _this.setData({
          imgArr: imgArr,

        })
      },
    })
    this.setData({
      getDisplay: 'block',
      goodsImg: this.data.navLeftItems.img_url,
      id: e.target.dataset.id,
      numid: e.target.id,
    })


  },
  hideButton: function (e) {
    this.setData({
      getDisplay: 'none',
      count: 0,
      total: 0
    })
    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
    var goodsCartA = wx.getStorageSync(goodsCart);
    var leftItems = this.data.navLeftItems;
    var Allcount = 0;
    for (var j in leftItems) {
      if (goodsCartA.length > 0) {
        delete leftItems[j].colors
        for (var i in goodsCartA) {
          var gCode = goodsCartA[i].code;
          var gCodeArr = [];
          for (var j in leftItems) {
            if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
              if (leftItems[j].code == gCode) {
                gCodeArr.push(goodsCartA[i]);
                for (var n in gCodeArr) {
                  Allcount = gCodeArr[n].count;
                  if (Allcount != 0) {
                    leftItems[j]['Allcount'] = Allcount;
                    leftItems[j].hidden = false;
                  } else {
                    leftItems[j]['Allcount'] = Allcount;
                    leftItems[j].hidden = true;
                  }
                }
              }
            }
          }
        }
      }
    }
    this.setData({
      navLeftItems: leftItems,
    })
  },
  // 事件处理 加入购物车字样消失
  toastChange: function () {
    this.setData({
      toastHidden: true,
      count: 0,
      total: 0
    })
  },

  // 购物车减件数
  delCount: function (e) {
    var typeattr = this.data.attr;
    var totalprice = 0;
    var index = this.data.numid;
    var num = this.data.count;
    var price = this.data.navLeftItems[index].price;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    for (var m in typeattr) {
      if (typeattr[m].colorid == this.data.colorid) {
        var typeattr1 = typeattr[m].sizes;
        for (var i in typeattr1) {
          if (typeattr1[i].qty > 0) {
            (typeattr1[i].qty)--;
          }
        }
        num = 0;
        totalprice = 0;
        countsum = 0;
        for (var j in typeattr1) {
          if (typeattr1[j].qty >= 0) {
            totalprice += typeattr1[j].qty * this.data.goodsprice;
            num += typeattr1[j].qty;
            typeattr[m].stkqty = num;
            // countsum = typeattr[m].stkqty;
            var ml = this.data.totalsum;
            if (ml >= 0) {
              totalsum2 = totalprice + ml;
            }
          }
        }
      }
    }
    var attr1 = this.data.attr;
    for (var k in attr1) {
      countsum += attr1[k].stkqty
    }


    // 将数值与状态写回
    this.setData({
      count: countsum,
      minusStatus: minusStatus,
      total: totalsum2,
      attr: this.data.attr,
    })

  },
  // 购物车加件数
  addCount: function (e) {
    var typeattr = this.data.attr;
    var index = this.data.numid;
    var num = this.data.count;
    var totalprice = 0;
    var qty = 0;
    var countsum1 = 0;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    for (var m in typeattr) {
      if (typeattr[m].colorid == this.data.colorid) {
        var sizetype = typeattr[m].sizes;
        for (var n in sizetype) {
          (sizetype[n].qty)++;
        }
        num = 0;
        countsum = 0;
        totalprice = 0;
        for (var j in sizetype) {
          totalprice += sizetype[j].qty * this.data.goodsprice;
          num += sizetype[j].qty;
          typeattr[m].stkqty = num;
          var jianNum = sizetype.length
          // var ml = this.data.totalsum;
          // if (ml == undefined) {
          //   totalsum2 = totalprice
          // } else {
          //   totalsum2 = totalprice + ml;
          // }
        }
      }
    }
    var attr1 = this.data.attr;
    for (var k in attr1) {
      countsum += attr1[k].stkqty
    }
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    this.setData({
      count: countsum,
      minusStatus: minusStatus,
      total: this.data.total + jianNum * this.data.goodsprice,
      attr: this.data.attr,
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
    if (!isNaN(e.detail.value)) {
      this.data.quality = e.detail.value;
    }

  },
  cancel: function () {
    this.setData({
      hidestyle: true
    })
  },


  // // 手动输入数字点击取消
  // cancel: function (e) {
  //   this.setData({
  //     hidestyle: true
  //   })
  // },
  // // 手动输入数字点击确定
  // combtn: function (e) {
  //   var num = this.data.qty;
  //   var index = this.data.index;
  //   this.data.typeattr[index].qty = this.data.quality;
  //   console.log(this.data.typeattr[index].qty);
  //   console.log(this.data.typeattr)
  //   var arr = this.data.typeattr;
  //   var tolNum = 0,
  //     tolPrice = 0;
  //   for (var i in arr) {
  //     console.log(arr[i].size);
  //     tolNum += arr[i].qty * arr[i].price;
  //     tolPrice += parseInt(arr[i].qty);
  //   }
  //   this.setData({
  //     hidestyle: true,
  //     typeattr: this.data.typeattr,
  //     total: tolNum,
  //     count: tolPrice
  //   })

  // },
  // 单件减
  bindMinus: function (e) {
    var typeattr = this.data.attr;
    var index = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var num = 0;
    var arr = this.data.attr;
    for (var i in arr) {
      var arr1 = arr[i].sizes;
      // var eachCount = arr1[i].stkqty;
      var colorid1 = arr[i].colorid;
      var stkqty = 0;
      if (colorid1 == this.data.colorid) {
        for (var j = 0; j < arr1.length; j++) {
          // 如果只有1件了，就不允许再减了
          if (j == index) {
            if (arr1[index].qty > 0) {
              (arr1[index].qty)--;
            }
          }
        }
        num = 0;
        var totalprice = 0;
        var countsum = 0;
        for (var j in arr1) {
          if (arr1[j].qty >= 0) {
            totalprice += arr1[j].qty * this.data.goodsprice;
            num += arr1[j].qty;
            arr[i].stkqty = num;
            // countsum = typeattr[m].stkqty;
            var ml = this.data.totalsum;
            if (ml >= 0) {
              totalsum2 = totalprice + ml;
            }
          }
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 0 ? 'disabled' : 'normal';
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
      }
    }
    var attr1 = this.data.attr;
    for (var k in attr1) {
      console.log(attr1[k].stkqty)
      countsum += attr1[k].stkqty
    }
    console.log(countsum);
    console.log(totalsum2);
    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      total: totalsum2,
      count: countsum,
      attr: this.data.attr
    });

  },
  // 单件加
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var price = this.data.goodsprice;
    var arr = this.data.attr;
    var countnum = 0;
    for (var i in arr) {
      var colorid1 = arr[i].colorid;
      if (colorid1 == this.data.colorid) {
        var arr1 = arr[i].sizes;

        // var eachCount = arr1[i].stkqty;
        // console.log(eachCount);
        for (var j in arr1) {
          if (j == index) {
            (arr1[index].qty)++;
            num = arr1[index].qty;
          }
        }
        // // 自增
        var total = num * price;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 0 ? 'disabled' : 'normal';
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        var tolNum = 0,
          tolPrice = 0;
        countnum = 0;
        for (var n in arr1) {
          tolPrice += arr1[n].qty * this.data.goodsprice;
          tolNum += arr1[n].qty;
          arr[i].stkqty = tolNum;
        }
      }
    }

    this.data.attr = arr;

    // 将数值与状态写回
    this.setData({
      minusStatuses: minusStatuses,
      total: parseInt(this.data.goodsprice) + this.data.total,
      count: 1 + this.data.count,
      attr: this.data.attr,
    });
  },

  // 加入购物车
  addcart: function (e) {
    var id = e.target.id;
    wx.setStorageSync('goodsCode', this.data.goodsid);
    for (var i in this.data.navLeftItems) {
      var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
      var arr = wx.getStorageSync(goodsCart) || [];
      var _this = this
      this.data.navLeftItems[i]['colors'] = this.data.attr;
      if (this.data.navLeftItems[i].code == this.data.goodsid) {
        this.data.navLeftItems[i].count = this.data.count;
        // 商品放入本地存储
        this.data.navLeftItems[i]['selected'] = false;
        var beforeImg = this.data.navLeftItems[i].imgurl
        this.data.navLeftItems[i].imgurl = this.data.imgArr[0];
        var allSingle = wx.getStorageSync(goodsCart) || [];
        this.setData({
          allSingle: allSingle
        })
        if (arr.length > 0) {
          for (var j in arr) {
            if (arr[j].code == this.data.id) {
              arr[j].count = this.data.navLeftItems[i].count;
              arr[j].colors = this.data.navLeftItems[i].colors;
              // 如果本地存储为1的话
              if (arr.length == 1) {
                // 如果本地存储count为0 的话
                if (arr[j].count == 0) {
                  for (var n in this.data.navLeftItems) {
                    if (arr[j].code == this.data.navLeftItems[n].code) {
                      this.data.navLeftItems[n].Allcount = 0;
                      this.data.navLeftItems[n].hidden = true;
                    }
                  }
                  this.setData({
                    navLeftItems: this.data.navLeftItems
                  })
                  wx.showModal({
                    title: '提示',
                    content: '该商品加入购物车为空????',
                    confirmColor: '#118EDE',
                    showCancel: true,
                    success: function (res) {
                      if (res.confirm) {
                        _this.setData({
                          toastHidden: true,
                          getDisplay: 'none',
                        });
                        try {
                          wx.removeStorageSync(goodsCart)
                        } catch (e) {
                          console.log(e)
                        }
                        return
                      } else {
                        // wx.removeStorageSync(goodsCart)
                        console.log(222);
                        _this.setData({
                          toastHidden: true,
                          getDisplay: 'block',
                        });
                      }
                    }
                  });
                  // wx.removeStorageSync(goodsCart)
                  return
                } else {
                  wx.setStorageSync(goodsCart, arr);
                  _this.setData({
                    toastHidden: false,
                    getDisplay: 'none',
                  });
                }
              } else {
                console.log(arr)
                var spliceArr = [];
                for (var n in this.data.navLeftItems) {
                  if (arr[j].code == this.data.navLeftItems[n].code) {
                    this.data.navLeftItems[n].Allcount = 0;
                    this.data.navLeftItems[n].hidden = true;
                  }
                }
                this.setData({
                  navLeftItems: this.data.navLeftItems
                })
                if (arr[j].count == 0) {
                  _this.setData({
                    toastHidden: true,
                    getDisplay: 'block',
                  });
                  var arrCode = arr[j].code
                  wx.showModal({
                    title: '提示',
                    content: '该商品加入购物车为空????',
                    confirmColor: '#118EDE',
                    showCancel: true,
                    success: function (res) {
                      if (res.confirm) {
                        for (var k in arr) {
                          if (arr[k].code != arrCode) {
                            spliceArr.push(arr[k])
                          }
                        }
                        arr = spliceArr;
                        wx.setStorageSync(goodsCart, arr);
                        _this.setData({
                          toastHidden: true,
                          getDisplay: 'none',
                        });
                        console.log(wx.getStorageSync(goodsCart))
                        return
                      } else {
                        console.log(222222);
                        _this.setData({
                          toastHidden: true,
                          getDisplay: 'block',
                        });
                      }
                    }
                  });
                } else {
                  wx.setStorageSync(goodsCart, arr);
                  _this.setData({
                    toastHidden: false,
                    getDisplay: 'none',
                  });
                }
              }
              try {
                wx.setStorageSync(goodsCart, arr);
              } catch (e) {
                console.log(e)
              }
              this.data.navLeftItems[i]['count'] = 0;
              var cartnull = 0;
              this.data.navLeftItems[i].imgurl = beforeImg;
              for (var j in wx.getStorageSync(goodsCart)) {
                var storageCode = wx.getStorageSync(goodsCart)[j].code;
                var GeCode = this.data.navLeftItems[i].code;
                if (storageCode == GeCode) {
                  cartnull += wx.getStorageSync(goodsCart)[j].count;
                  this.data.navLeftItems[i].count = cartnull
                }
              }
              var goodsCartA = wx.getStorageSync(goodsCart);
              var leftItems = this.data.navLeftItems;
              delete leftItems[j].colors
              var Allcount = 0;
              if (goodsCartA.length > 0) {
                for (var i in goodsCartA) {
                  var gCode = goodsCartA[i].code;
                  var gCodeArr = [];
                  for (var j in leftItems) {
                    if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
                      if (leftItems[j].code == gCode) {
                        gCodeArr.push(goodsCartA[i]);
                        for (var n in gCodeArr) {
                          Allcount = gCodeArr[n].count;
                          if (Allcount != 0) {
                            leftItems[j]['Allcount'] = Allcount;
                            leftItems[j].hidden = false;
                          } else {
                            leftItems[j]['Allcount'] = Allcount;
                            leftItems[j].hidden = true;
                          }
                        }
                      }
                    }
                  }
                }

                this.setData({
                  navLeftItems: leftItems
                })
                return
              }
            } else {
              _this.setData({
                toastHidden: false,
                getDisplay: 'none',
              });
            }
          }
          this.data.navLeftItems[i]['selected'] = false
          arr.unshift(this.data.navLeftItems[i]);
        } else {
          if (this.data.navLeftItems[i].count == 0) {
            _this.setData({
              toastHidden: true,
              getDisplay: 'block',
            });
            wx.showModal({
              title: '提示',
              content: '该商品为空',
              confirmColor: '#118EDE',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  _this.setData({
                    toastHidden: true,
                    getDisplay: 'none',
                  });
                  try {
                    wx.removeStorageSync(goodsCart)
                  } catch (e) {
                    console.log(e)
                  }
                  return
                } else {
                  wx.removeStorageSync(goodsCart)
                  _this.setData({
                    toastHidden: true,
                    getDisplay: 'block',
                  });
                }
              }
            });
          } else {
            _this.data.navLeftItems[i]['selected'] = false
            arr.unshift(this.data.navLeftItems[i]);
            this.setData({
              toastHidden: false,
              getDisplay: 'none',
            });
          }
        }
        try {
          wx.setStorageSync(goodsCart, arr)
        } catch (e) {
          console.log(e)
        }
        this.setData({
          count: 0,
          total: 0,
        })

        this.data.navLeftItems[i]['count'] = 0;
        var cartnull = 0;
        this.data.navLeftItems[i].imgurl = beforeImg;
        for (var j in wx.getStorageSync(goodsCart)) {
          var storageCode = wx.getStorageSync(goodsCart)[j].code;
          var GeCode = this.data.navLeftItems[i].code;
          if (storageCode == GeCode) {
            cartnull += wx.getStorageSync(goodsCart)[j].count;
            this.data.navLeftItems[i].count = cartnull
          }
        }
        var goodsCartA = wx.getStorageSync(goodsCart);
        var leftItems = this.data.navLeftItems;
        var Allcount = 0;
        if (goodsCartA.length > 0) {
          delete leftItems[j].colors
          for (var i in goodsCartA) {
            var gCode = goodsCartA[i].code;
            var gCodeArr = [];
            for (var j in leftItems) {
              if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
                if (leftItems[j].code == gCode) {
                  gCodeArr.push(goodsCartA[i]);
                  for (var n in gCodeArr) {
                    Allcount = gCodeArr[n].count;
                    if (Allcount != 0) {
                      leftItems[j]['Allcount'] = Allcount;
                      leftItems[j].hidden = false;
                    } else {
                      leftItems[j]['Allcount'] = Allcount;
                      leftItems[j].hidden = true;
                    }
                  }
                }
              }
            }
          }
        }
        this.setData({
          navLeftItems: leftItems
        })
      }
    }
  },
  // 挑选颜色
  selected: function (e) {
    var sizeno = e.target.dataset.index;
    var attr = this.data.attr;
    var images = this.data.images;
    var imgArr = [];
    for (var i in attr) {
      if (attr[i].colorid == sizeno) {
        this.setData({
          bgColor: 'bgcolor',
          // colorImg: attr[i].imgurl
        })
      }
    }
    for (var i in images) {
      if (images[i].colorid == sizeno) {
        imgArr.push(this.data.images[i].imgurl);
        this.setData({
          imgArr: imgArr
        })
      }
    }
    this.setData({
      colorid: sizeno,
      totalsum: totalsum2
    })
  },

  // 查看所有商品
  selectAllG: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        pageno: that.data.pageno + 1,
        sGoodHidden: true,
        allHidden: false,
      })
    }, 1000)
    if (this.data.flag) {
      this.setData({
        flag: false
      })
    }
    if (this.data.flag == false) {
      this.setData({
        flag: true
      })
      if (this.data.pageno <= 20) {
        that.setData({
          allHidden: false,
        })
        wx.request({
          url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
          data: {
            // goods_commend:'1'
            custcert: '',
            usercode: wx.getStorageSync('bInformation').usercode,
            // fields: {
            //   value: searchWord,
            //   type: ''
            // }
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
            var goodsCartA = wx.getStorageSync(goodsCart);
            for (var j in res.data.body) {
              if (res.data.body.length >= 10) {
                if (goodsCartA.length > 0) {
                  var Allcount = 0;
                  for (var i in goodsCartA) {
                    var gCode = goodsCartA[i].code;
                    var gCodeArr = [];
                    if (res.data.body[j].hidden == false) {
                      res.data.body[j].hidden = false;
                    } else {
                      res.data.body[j].hidden = true;
                    }
                    if (res.data.body[j].code == gCode) {
                      gCodeArr.push(goodsCartA[i]);
                      for (var n in gCodeArr) {
                        Allcount += gCodeArr[n].count;
                        res.data.body[j]['Allcount'] = Allcount;
                        res.data.body[j].hidden = false;
                      }
                    }
                  }

                } else {
                  for (var i in res.data.body) {
                    res.data.body[i]['hidden'] = true;
                  }
                }
                that.setData({
                  n_moreGOods: true,
                  sGoodHidden: true,
                  allHidden: false
                })
              } else {
                that.setData({
                  n_moreGOods: false,
                  sGoodHidden: true,
                  allHidden: true
                })
              }

            }
            for (var i in res.data.body) {
              res.data.body[i].sale = parseFloat(res.data.body[i].sale);
            }
            var tempArr = that.data.navLeftItems;
            if (tempArr.length < 10) {
              setTimeout(function () {
                that.setData({
                  navLeftItems: tempArr.concat(res.data.body),
                  hidden: true,
                  pageno: that.data.pageno,
                  allHidden: true,
                  n_moreGOods: true,
                  sGoodHidden: false,
                  resLength: 1,
                })
              }, 1000)

            } else {
              setTimeout(function () {
                that.setData({
                  navLeftItems: tempArr.concat(res.data.body),
                  hidden: true,
                  pageno: that.data.pageno,
                  allHidden: false,
                  n_moreGOods: true,
                  sGoodHidden: true,
                  resLength: 1,
                })
              }, 1000)

            }

          },
          fail: function () {
            // fail
          },
          complete: function () {
            that.setData({
              sGoodHidden: true,
              hidden: true
            })
          }
        })
      } else {
        that.setData({
          n_moreGOods: false,
          allHidden: true,
          sGoodHidden: true
        })
      }
    }

  },

  // 向上加载
  onReachBottom() {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log(this.data.flag);
    if (this.data.flag) {
      var that = this;
      that.setData({
        pageno: that.data.pageno + 1,
        sGoodHidden: true,
        searchWord: searchWord
      })
      if (this.data.pageno <= 20) {
        setTimeout(function () {
          that.setData({
            allHidden: false,
          })
        }, 1000);
        wx.request({
          url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
          data: {
            // goods_commend:'1'
            custcert: '',
            usercode: wx.getStorageSync('bInformation').usercode,
            fields: {
              value: searchWord,
              type: ''
            }
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
            var goodsCartA = wx.getStorageSync(goodsCart);
            for (var j in res.data.body) {
              if (goodsCartA.length > 0) {
                var Allcount = 0;
                for (var i in goodsCartA) {
                  var gCode = goodsCartA[i].code;
                  var gCodeArr = [];

                  if (res.data.body[j].hidden == false) {
                    res.data.body[j].hidden = false;
                  } else {
                    res.data.body[j].hidden = true;
                  }
                  if (res.data.body[j].code == gCode) {
                    gCodeArr.push(goodsCartA[i]);
                    for (var n in gCodeArr) {
                      Allcount += gCodeArr[n].count;
                      res.data.body[j]['Allcount'] = Allcount;
                      res.data.body[j].hidden = false;
                    }
                  }
                }

              } else {
                for (var i in res.data.body) {
                  res.data.body[i]['hidden'] = true;
                }
              }
            }
            for (var i in res.data.body) {
              res.data.body[i].sale = parseFloat(res.data.body[i].sale);
            }
            var tempArr = that.data.navLeftItems;
            if (tempArr.length < 10) {
              setTimeout(function () {
                that.setData({
                  navLeftItems: tempArr.concat(res.data.body),
                  hidden: true,
                  pageno: that.data.pageno,
                  allHidden: true,
                  n_moreGOods: false,
                  sGoodHidden: true,
                })
              }, 1000)
            } else {
              setTimeout(function () {
                that.setData({
                  navLeftItems: tempArr.concat(res.data.body),
                  hidden: true,
                  n_moreGOods: true,
                  allHidden: false,
                  pageno: that.data.pageno
                })
              }, 1000)
            }
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
        })
      } else {
        that.setData({
          n_moreGOods: false,
          allHidden: true
        })
      }
    }

  },
  // 跳转到搜索页面
  // search: function () {
  //   wx.switchTab({
  //     url: '../search/index'
  //   })
  // }
  // 查询的code codename 条形码
  EventHandle: function (e) {
    searchWord = e.detail.value;
  },
  search: function () {
    var _this = this;
    if (searchWord != '') {
      wx.request({
        url: app.globalym + '/items_get?page_size=10&page_no=2',
        data: {
          custcert: '',
          usercode: wx.getStorageSync('bInformation').usercode,
          fields: {
            value: searchWord,
            type: ''
          }
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);
          var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
          var goodsCartA = wx.getStorageSync(goodsCart);
          // setTimeout(function () {
            // wx.showToast({
            //   title: '查询中',
            //   icon: 'loading',
            //   duration: 10000
            // })
          // }, 1000)
          if (res.data.body.length != 0) {
            for (var j in res.data.body) {
              if (goodsCartA.length > 0) {
                var Allcount = 0;
                for (var i in goodsCartA) {
                  var gCode = goodsCartA[i].code;
                  var gCodeArr = [];
                  if (res.data.body[j].hidden == false) {
                    res.data.body[j].hidden = false;
                  } else {
                    res.data.body[j].hidden = true;
                  }
                  if (res.data.body[j].code == gCode) {
                    gCodeArr.push(goodsCartA[i]);
                    for (var n in gCodeArr) {
                      Allcount += gCodeArr[n].count;
                      res.data.body[j]['Allcount'] = Allcount;
                      res.data.body[j].hidden = false;
                    }
                  }
                }

              } else {
                for (var i in res.data.body) {
                  res.data.body[i]['hidden'] = true;
                }
              }
              // setTimeout(function () {
                _this.setData({
                  n_moreGOods: true,
                  sGoodHidden: false,
                  allHidden: true,
                  flag: false
                })
              // }, 1000)

            }
          } else {
            // setTimeout(function () {
              _this.setData({
                n_moreGOods: false,
                sGoodHidden: false,
                allHidden: true,
                searchWord: '',
                flag: false
              })
            // }, 1000)
            searchWord = '';
          }
          for (var i in res.data.body) {
            res.data.body[i].sale = parseFloat(res.data.body[i].sale);
          }
          // setTimeout(function () {
            _this.setData({
              navLeftItems: res.data.body,
            })
          // }, 1000)


        },
        fail: function (res) {
          // fail
          console.log(res)
        },
        complete: function () {
          // complete
          // wx.hideToast()
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '未输入商品名称、类别名称、条形码',
        confirmColor: '#118EDE',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')  
          }
        }
      });
    }
  },
  // 扫描二维码
  scanCode: function () {
    var _this = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        _this.setData({
          barcode: res.result
        })
        if (this.data.barcode != '') {
          wx.request({
            url: app.globalym + '/items_get?page_size=10&page_no=' + _this.data.pageno,
            data: {
              custcert: '',
              usercode: wx.getStorageSync('bInformation').usercode,
              fields: {
                value: _this.data.barcode,
                type: '1'
              }
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log(res);
              var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
              var goodsCartA = wx.getStorageSync(goodsCart);
              if (res.data.body.length == 0) {
                _this.setData({
                  resLength: res.data.body.length
                })
                console.log(res.data.body)
                console.log(1111);
                console.log(res.data.body)
                _this.setData({
                  n_moreGOods: false,
                  sGoodHidden: false,
                  navLeftItems: res.data.body,
                  allHidden: true,
                  flag: false
                })
                console.log(_this.data.navLeftItems)
                return
              }
              if (res.data.body.length >= 10) {
                _this.setData({
                  resLength: res.data.body.length
                })
                for (var j in res.data.body) {
                  res.data.body[j].sale = parseFloat(res.data.body[j].sale);
                  if (goodsCartA.length > 0) {
                    var Allcount = 0;
                    for (var i in goodsCartA) {
                      var gCode = goodsCartA[i].code;
                      var gCodeArr = [];

                      if (res.data.body[j].hidden == false) {
                        res.data.body[j].hidden = false;
                      } else {
                        res.data.body[j].hidden = true;
                      }
                      if (res.data.body[j].code == gCode) {
                        gCodeArr.push(goodsCartA[i]);
                        for (var n in gCodeArr) {
                          Allcount += gCodeArr[n].count;
                          res.data.body[j]['Allcount'] = Allcount;
                          res.data.body[j].hidden = false;
                        }
                      }
                    }
                  } else {
                    for (var i in res.data.body) {
                      res.data.body[i]['hidden'] = true;
                    }
                  }
                }
                _this.setData({
                  n_moreGOods: true,
                  sGoodHidden: false,
                  flag: false
                })
              } else {
                _this.setData({
                  resLength: res.data.body.length
                })
                for (var j in res.data.body) {
                  res.data.body[j].sale = parseFloat(res.data.body[j].sale);
                }
                _this.setData({
                  n_moreGOods: false,
                  sGoodHidden: true,
                  flag: false
                })
              }
              _this.setData({
                navLeftItems: res.data.body,
              })
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) {
            }
          })
        }
      },
    })


  }

})


