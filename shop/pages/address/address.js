var app = getApp();
Page({
    data:{
        item:[{
            name:'张三',
            phone:12345678915,
            address:'上海市嘉定区沪宜公路1168号305室'
        }],
    },
    addAddress:function(e){
        wx.navigateTo({
          url: '../address1/address1',
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
    }
})