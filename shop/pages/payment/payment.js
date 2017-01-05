var app = getApp();
Page({
    data:{
        addressImg:'../../image/icon_API.png',
        item:[{
            name:'张三',
            phone:12345678915,
            address:'上海市嘉定区沪宜公路1168号305室'
        }],
        info:[{
            goodsImg:'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
            goodsTitle:'西服',
            goodsPrice:'399',
            goodsid:'123456'
        },{
            goodsImg:'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
            goodsTitle:'西服',
            goodsPrice:'399',
            goodsid:'123456'
        }]
    },
    // 跳转到地址页面
    manage:function(e){
        wx.navigateTo({
          url: '../address/address',
        })
    },
    cash:function(e){
        wx.navigateTo({
          url: '../cashpayment/cashpayment',
        })
    },
    cardPay:function(e){
        wx.navigateTo({
          url: '../sucpay/sucpay',
        })
    }
})