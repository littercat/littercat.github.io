var app = getApp()
Page({
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    getDisplay: "none",
    hidestyle: true,
    iscart:false,
    cart:[],
    count:1,
    total:0,
    goodsCount:0,
    item: [
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣1',
        goodsPrice: '159',
        selected: false,
        num: '1',
      },
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣2',
        goodsPrice: '159',
        selected: false,
        num: '1',
      },
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣3',
        goodsPrice: '159',
        selected: false,
        num: '1',
      }
    ],
    goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
    // 加入购物车出现的选择属性
    selected: true,
    selected1: false,
    selected2: false,
    count: 0,//不含运费
    number: 0,//一共
    selectedAllStatus: false,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    countprice: 0
  },
  onShow: function () {
    var arr = wx.getStorageSync('cart') || [];
    if (arr.length > 0) {
      for (var i in arr) {
        this.data.total += Number(arr[i].price);
        this.data.goodsCount += Number(arr[i].count);
      }
      this.setData({
        iscart: true,
        cart: arr,
        total: this.data.total,
        goodsCount: this.data.count
      });
    }
  },
  // 选择商品的件数
  cartBtn: function (e) {
    this.setData({
      getDisplay: 'block'
    })
  },
  // 单选
  bindCheckbox: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.item[index].selected;
    var item = this.data.item;
    var num = parseInt(this.data.item[index].num);
    var goodsPrice = this.data.item[index].goodsPrice;
    if (!selected) {
      this.setData({
        count: this.data.count + num * goodsPrice,
        number: num + this.data.number
      });
    } else {
      this.setData({
        count: this.data.count - num * goodsPrice,
        number: this.data.number - num
      });
    }
    item[index].selected = !selected;
    this.setData({
      item: item
    });
  },
  // 全选
  bindSelectAll: function () {
    var selectedAllStatus = this.data.selectedAllStatus;
    console.log(selectedAllStatus)

    console.log(!selectedAllStatus)
    var item = this.data.item;
    if (!selectedAllStatus) {
      console.log(item);
      for (var i = 0; i < item.length; i++) {
        item[i].selected = !selectedAllStatus;
        var num = parseInt(this.data.item[i].num);
        var price = parseInt(this.data.item[i].price);
        this.setData({
          count: this.data.count - num * price,
          number: this.data.number - num
        });
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
    this.setData({
      getDisplay: 'none',
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
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected1: false
    })
  },
  // 点击跳转到订单详情
  settlement: function (e) {
    wx.navigateTo({
      url: '../order/order',
    })
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
  }
})
