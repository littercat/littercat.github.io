var app = getApp();
Page({
    data:{
        item:[{
            name:'张三',
            phone:'18901792222',
            address:'上海市嘉定区沪宜公路1168号305室'
        }],
        getDisplay:'none'
    },
    cancel:function(e){
        wx.redirectTo({
          url: '../payment/payment',
        })
    },
   resave:function(e){
       this.setData({
           getDisplay:'block'
       })
   },
   confirm:function(e){
       wx.redirectTo({
         url: '../order1/order1',
       })
   }
})