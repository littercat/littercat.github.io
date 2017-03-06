var app = getApp();
var flag = true;
var util = require('../../utils/util.js');
var selectDate = '';
var dateValue = '';
var selectD = new Date();
var dateTime = '';
Page({
  data: {
    // hasEmptyGrid 变量控制是否渲染空格子，若当月第一天是星期天，就不应该渲染空格子
    hasEmptyGrid: false,
    // width:'50%',
    datetype: [
      '今天',
      '昨天',
      '其他'
    ],
    payment: [
      '现金',
      '刷卡',
      '支付宝',
      '微信',
      '其他第三方',
      '储值',
      '积分礼券',
      '一般礼券',
      '电子礼券'
    ],
    hiddenstyle: true,
    hidden: true,
    selectindex: 1,
    saleTarget: [],
    arr: [],
    ttlMoney: '',
    weekdays: '',
    dateValue: '选择日期',
    shopids: '',
    selectD: '',
    usercode: '',
    colorStyle:'#ccc'
  },
  // 日历空间
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,
      colorStyle:'#666'
    })
    dateValue = this.data.dateValue
    this.setData({
      weekdays:getWeekDay(0, new Date(dateValue))
    })
  },

  // 初始化数据
  onLoad(options) {
    var information = wx.getStorageSync('bInformation');
    var usercode = information.usercode
    if (information.shops.length == 1) {
      this.setData({
        shopids: information.shops[0].shopid
      })
    } else {
      var information = wx.getStorageSync('bInformation');
      var shop = information.shops;
      var allshopids = '';
      var eachshopid = '';
      for (var i in shop) {
        eachshopid = shop[i].shopid;
        allshopids += eachshopid + ','
        if (i == shop.length - 1) {
          allshopids += eachshopid
        }
      }
      this.setData({
        shopids: allshopids
      })
    }
    this.setData({
      usercode: usercode
    })
    console.log(this.data.shopids);
    if (options.shopids != undefined) {
      this.setData({
        shopids: options.shopids
      })
    }
    console.log(this.data.shopids);
  },
  // 点击出现相应的天的销售
  datatype: function (e) {
    var index = e.currentTarget.dataset.index;
    var _this = this;
    this.setData({
      selectindex: index
    })
    if (index == 2) {
      index = 0
    }
    var week = getWeekDay(-index, selectD);
    dateTime = GetDateStr(-index, selectD);
    console.log(dateTime);
    var data = {
      custcert: '-1',
      usercode: this.data.usercode,
      shopids: this.data.shopids,
      type: this.data.selectindex,
      date: dateTime
    }
    wx.request({
      url: app.globalym + '/retail_daily',
      data: {
        custcert: '-1',
        usercode: '',
        shopids: this.data.shopids,
        type: this.data.selectindex,
        date: dateTime
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        for (var i in res.data.body) {
          var ttlmoney = Number(res.data.body[i].ttlmoney);
          if (res.data.body[i].ttlmoney > 0) {
            res.data.body[i].ttlmoney = parseFloat(res.data.body[i].ttlmoney)
          }else{
             res.data.body[i].ttlmoney = 0
          }

        }
        GetArray(res.data.body, _this);
        _this.setData({
          saleTarget: res.data.body,
          ttlmoney: ttlmoney,
          weekdays: week
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        // complete
      }
    })
  },
  selectTime: function () {
    var _this = this;
    var nowData = dateValue.split('-');
    var arr = '';
    for (var i in nowData) {
      arr += nowData[i];
    }
    var compare = time(arr.toString());
    var opra_year = arr.substring(0, 4);
    var opra_month = arr.substring(4, 6);
    var opra_day = arr.substring(6, 8);
    var selectD = new Date(opra_year, opra_month, opra_day)
    this.setData({
      selectD: selectD
    })
    if (dateValue != '') {
      if (compare == 1) {
        var week = getWeekDay(0, this.data.selectD);
        dateTime = GetDateStr(0, this.data.selectD);
        wx.request({
          url: app.globalym + '/retail_daily',
          data: {
            custcert: '-1',
            usercode: '',
            shopids: this.data.shopids,
            type: 2,
            date: dateTime
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            for (var i in res.data.body) {
              var ttlmoney = Number(res.data.body[i].ttlmoney);
              if (res.data.body[i].ttlmoney > 0) {
                res.data.body[i].ttlmoney = parseFloat(res.data.body[i].ttlmoney)
              }else{
                res.data.body[i].ttlmoney = 0
              }
            }

            GetArray(res.data.body, _this);
            _this.setData({
              saleTarget: res.data.body,
              ttlmoney: ttlmoney,
              weekdays: week
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function () {
            // complete
          }
        })
      } else {
        wx.showToast({
          title: '不允许选择日期大于当前日期',
          icon: 'loading',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    } else {
      wx.showToast({
        title: '请选择日期',
        icon: 'loading',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
  },
  // onLoad:function(options){

  // },
  onShow: function () {
    var _this = this;
    var week = getWeekDay(-1, new Date());
    console.log(this.data.selectindex)
    if (this.data.selectindex != 2) {
      if (this.data.dateTime == '') {
        dateTime = parseInt(GetDateStr(-1, new Date()));
      }
      console.log(dateTime);
    } 
    wx.request({
      url: app.globalym + '/retail_daily',
      data: {
        custcert: '',
        usercode: wx.getStorageSync('bInformation').usercode,
        shopids: this.data.shopids,
        type: this.data.selectindex,
        date: dateTime
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        for (var i in res.data.body) {
          var ttlmoney = Number(res.data.body[i].ttlmoney);
          res.data.body[i].custprice = Number(res.data.body[i].custprice)
          // res.data.body[i].ttlmoney = parseFloat(res.data.body[i].ttlmoney)
          res.data.body[i].ttlmoney = ttlmoney

           for (var i in res.data.body) {
              var ttlmoney = Number(res.data.body[i].ttlmoney);
              if (res.data.body[i].ttlmoney > 0) {
                res.data.body[i].ttlmoney = parseFloat(res.data.body[i].ttlmoney);
                res.data.body[i].custprice = Number(res.data.body[i].custprice)
              }else{
                res.data.body[i].ttlmoney = 0;
                res.data.body[i].custprice = 0;
              }
            }
        }
        GetArray(res.data.body, _this);
        _this.setData({
          saleTarget: res.data.body,
          ttlmoney: ttlmoney,
          weekdays: week
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        // complete
      }
    })
  },
  // 查询店铺
  queryShop: function () {
    wx.navigateTo({
      url: '../shopselect/shopselect',
    })
  },
  // 销售列表
  salelist: function () {
    wx.navigateTo({
      url: "../salelist/salelist?custcert=" + '' + "&usercode=" + '-1' + "&shopids=" + this.data.shopids + "&type=" + this.data.selectindex + "&date=" + dateTime,
      success: function (res) {
        // success
      },
    })
  },
});
// 得到第几天
function GetDateStr(AddDayCount, date) {
  console.log(date);
  var dd = date;
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear().toString();
  var m = (dd.getMonth() + 1).toString();//获取当前月份的日期 
  var d = dd.getDate().toString();
  if (m.length == 1) {
    m = '0' + m;
    console.log(m);
  }
  if (d.length == 1) {
    d = '0' + d
  }
  if (AddDayCount == -1) {
    dd.setDate(dd.getDate() - AddDayCount);
  }
  return (y + m + d);
}
// 得到星期几
function getWeekDay(AddDayCount, date) {
  var show_day = new Array('周一', '周二', '周三', '周四', '周五', '周六', '周日');
  var dd = date;
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 ;
  var y = dd.getFullYear();
  var m = dd.getMonth();//获取当前月份的日期 
  var d = dd.getDate();
  var begintime = new Date(y, m, d);
  console.log(begintime);
  var weekIndex = parseInt(begintime.getDay() - 1);
  console.log(begintime.getDay());
  console.log(weekIndex);
  if (weekIndex == -1) {
    weekIndex = 6;
  }
  var week = show_day[weekIndex];
  // var week = show_day[begintime.getDay() - 1];
  if (AddDayCount == -1) {
    dd.setDate(dd.getDate() - AddDayCount);
  }
  return week
}
// 判断时间大小
function time(datetime) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var opra_date = datetime;//从前台获取
  var opra_year = opra_date.substring(0, 4);
  var opra_month = opra_date.substring(4, 6);
  var opra_day = opra_date.substring(6, 8);
  var date_time = new Date(year, month, day);
  var opra_time = new Date(opra_year, opra_month, opra_day);
  if (opra_time.getTime() <= date_time.getTime()) {
    return 1;
  } else {
    return 0;
  }
}
//获取销售指标和销售业绩
function GetArray(res, that) {
  var arr1 = [];
  var arr = [{ title: '现金', money: '' }, { title: '刷卡', money: '' }, { title: '支付宝', money: '' }, { title: '微信', money: '' }, { title: '其他第三方', money: '' }, { title: '储值', money: '' }, { title: '积分礼券', money: '' }, { title: '一般礼券', money: '' }, { title: '电子礼券', money: '' }];
  var percentage = null;
  for (var i in res) {
    var ttlmoney = Number(res[i].ttlmoney)
    arr1.push(Number(res[i].ttlxj));
    arr1.push(Number(res[i].ttlylk));
    arr1.push(Number(res[i].ttlzfb));
    arr1.push(Number(res[i].ttlwx));
    arr1.push(Number(res[i].ttlqt3));
    arr1.push(Number(res[i].ttlczk));
    arr1.push(Number(res[i].ttljf));
    arr1.push(Number(res[i].ttllq));
    arr1.push(Number(res[i].ttldz));
  }
  for (var j in arr) {
    for (var k in arr1) {
      if (j == k) {
        if (ttlmoney == 0) {
          percentage = 0.00
        } else {
          arr[j].money = arr1[j];
          percentage = (arr1[k] / ttlmoney) * 100
        }
        arr[j]['percentage'] = percentage.toFixed(2)
      }
    }
  }
  that.setData({
    arr: arr
  })
}
