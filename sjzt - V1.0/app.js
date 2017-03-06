//app.js 

App({
  my_userInfo: wx.getStorageSync('bInformation'),
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
  },
  globalym: 'https://wx.upyuan.com/eb3',
  // globalym: 'http://192.168.1.199:8080/eb3',
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              var userData = res.encryptedData;
              var iv = res.iv;
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);

              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              that.globalData.nickName = nickName;
              wx.setStorageSync('nickName', nickName);
              wx.setStorageSync('name', nickName)
              // wx.request({
              //   url: '',
              //   data: {
              //     code: code,
              //     user_data: userData,
              //     iv: iv
              //   },
              //   success: function (res) {
              //     // 在服务器上，解析并生成自己的账号验证信息
              //     var user = res.data.user
              //     var token = res.data.token
              //     // 并且还可以存在本地存储上，供下次打开使用
              //     wx.setStorage({
              //       key: 'my_token',
              //       data: token
              //     })
              //   }
              // })
            }
          })
        }
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    nickName:null
  },
  //   golbalnum:{
  //     olist:[]
  //   },
  //  // ordermap: function(i,code,codename,colorobj,addressobj) {
  //    ordermap: function() {
  //     this.golbalnum.olist="001";
  //     // this.golbalnum.olist[0]["codename"] = "yf";
  //     // this.golbalnum.olist[i]["colors"] = colorobj;
  //   //  this.golbalnum.olist[i]["address"] = addressobj;
  //   }
})

