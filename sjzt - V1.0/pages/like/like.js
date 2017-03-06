var app = getApp()
Page({
  data: {
    getDisplay: "none",
    hideS: true,
    goods: {
      img: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80'
    },
    bgColor: 'default',
    index1: 0,
      attr: [
      {
        s1: '0',
        color: '黑色',
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
        ]
      }, {
        s1: '1',
        color: '白色',
        typeattr: [
          {
            size: 's',
            price: '10',
            num1: '86',
            count1: 0
          }, {
            size: 'M',
            price: '10',
            num1: '88',
            count1: 0
          }, {
            size: 'L',
            price: '10',
            num1: '85',
            count1: 0
          }
        ],
      }, {
        s1: '2',
        color: '粉色',
        typeattr: [
          {
            size: 's',
            price: '100',
            num1: '6',
            count1: 0
          }, {
            size: 'M',
            price: '120',
            num1: '88',
            count1: 0
          }, {
            size: 'L',
            price: '140',
            num1: '8',
            count1: 0
          }
        ],
      }
    ],
    carImg: "../../image/footer-icon-03.png",
    goodsinfo: [
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣1',
        goodsPrice: '159',
        goodsID: "1234567"
      },
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣2',
        goodsPrice: '159',
        goodsID: "1234567"
      },
      {
        goodsimg: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        goodsName: '红枣3',
        goodsPrice: '159',
        goodsID: "1234567"
      }
    ],
    goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
    // 加入购物车出现的选择属性
    selected2: true,
    selected3: false,
    selected4: false,
  },
  // 选择商品的件数
  cartBtn: function (e) {
    this.setData({
      getDisplay: 'block'
    })
  },
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
  },
  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
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
  selected: function (e) {
    var index = e.target.dataset.index;
    this.setData({
      index1: index
    })
    console.log(index);
    console.log(this);
  },
})
