var app = getApp()
Page( {
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      // icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2,
      orderbtn:'orderbtn',
    }, {
        // icon: '../../images/iconfont-icontuan.png',
        text: '我喜欢的',
        isunread: true,
        unreadNum: 1,
        orderbtn:'like'
      }]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },
  orderbtn:function(e){
    wx.navigateTo({
      url: '../order1/order1',
    })
  },
  like:function(e){
    wx.navigateTo({
      url: '../like/like',
    })
  },
  back:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  }

})



