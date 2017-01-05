var app = getApp();
Page({
    save:function(e){
        wx.navigateTo({
          url: '../address/address',
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