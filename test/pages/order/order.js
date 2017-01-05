var app=getApp();
Page({
    data:{
        item:[{
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
    submitOrder:function(){
        wx.navigateTo({
          url: '../payment/payment',
        })
    }
})