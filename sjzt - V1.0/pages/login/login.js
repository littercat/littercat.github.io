//倒计时
function countdown(that, n) {
    n = 1;
    var second = that.data.second - n;
    console.log(second)
    that.setData({
        second: second
    });
    if (second <= 0) {
        clearInterval(time);
        that.setData({
            text: '请重新发送',
            code: 'inputAgin',
            second: 60
        });
        return false;
    }
    var time = setTimeout(function () {
        that.setData({
            text: second + '秒',
        });
        console.log(second)
        countdown(that, n);
    }, 1000)

}

var Util = require('../../utils/util.js')
var md5 = require('../../utils/md5.js')
var app = getApp();
var username = '';
var password = '';
Page({
    data: {
        shop: {
            img: '../../image/w_logo_0.png',
            name: '连锁当家-手机展厅'
        },
        // phone: '',
        // text: '发送验证码',
        // second: 60,
        // code: 'inputcode',
        username: '',
        password: '',
        colorU: '#ccc',
        colorP: '#ccc',
        userValue: '请输入您的用户名',
        passValue: '请输入您的密码',
        hidden: true
    },
    onLoad: function () {
        if (wx.getStorageSync('bInformation') != '' && wx.getStorageSync('nickName') != '' && wx.getStorageSync('nickName') == wx.getStorageSync('name')) {
            wx.switchTab({
                url: '../index/index',
                success: function (res) {
                    // success
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        }
        //   wx.showModal({
        //         title: '提示',
        //         content: '用户名520002；密码123456',
        //         confirmColor: '#118EDE',
        //         showCancel: false,
        //         success: function (res) {
        //             if (res.confirm) {
        //                 //console.log('用户点击确定')  
        //             }
        //         }
        //     });
    },
    // listenerUsername: function () {
    //     console.log(111);
    //     this.setData({
    //         userValue: '请输入您的用户名',
    //         colorU: '#ccc'
    //     })
    // },
    ubindblur: function (e) {
        username = e.detail.value;
        // if (username === "" || username === null) {
        //     this.setData({
        //         userValue: '用户名不能为空',
        //         colorU: 'red'
        //     })
        //     return false
        // } else {
        this.setData({
            username: username,
        })
        // }
    },
    // listenerPassword: function () {
    //     this.setData({
    //         passValue: '请输入您的密码',
    //         colorP: '#ccc'
    //     })
    // },
    passbindblur: function (e) {
        password = e.detail.value;
        password = md5.hexMD5(password);
        this.setData({
            password: password,
            passwordValue: password
        })
    },

    loginbtn: function (e) {
        var username = this.data.username;
        var password = this.data.password;
        var _this = this;
        _this.setData({
            hidden: false
        })
        if (username == '') {
            _this.setData({
                hidden: true
            })
            wx.showModal({
                title: '提示',
                content: '用户名不能为空',
                confirmColor: '#118EDE',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')  
                    }
                }
            });
            return
        }
        if (password == '') {
            _this.setData({
                hidden: true
            })
            wx.showModal({
                title: '提示',
                content: '用密码不能为空',
                confirmColor: '#118EDE',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')  
                    }
                }
            });
            return
        }
        if (username == '' || password == '') {
            _this.setData({
                hidden: true
            })
            wx.showModal({
                title: '提示',
                content: '用户名或密码不能为空',
                confirmColor: '#118EDE',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')  
                    }
                }
            });
            return
        } else {
            wx.request({
                url: app.globalym + '/user_login',
                data: {
                    usercode: username,
                    password: password
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                }, // 设置请求的 header

                success: function (res) {
                    if (res.data.code == -1) {
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            confirmColor: '#118EDE',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    //console.log('用户点击确定')  
                                }
                            }
                        });
                    }
                    if (res.data.code == -2) {

                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            confirmColor: '#118EDE',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    //console.log('用户点击确定')  
                                }
                            }
                        });
                    }
                    if (res.data.code == 1) {
                        wx.setStorageSync('bInformation', res.data.body);
                        wx.switchTab({
                            url: '../index/index?information=' + res.data.body,
                        })
                    }
                },
                fail: function () {
                    // fail
                },
                complete: function (res) {
                    _this.setData({
                        hidden: true
                    })
                    // if (res == null || res.data == null) {
                    //     wx.showModal({
                    //         title: '提示',
                    //         content: '网络请求失败',
                    //         confirmColor: '#118EDE',
                    //         showCancel: false,
                    //         success: function (res) {
                    //             if (res.confirm) {
                    //                 //console.log('用户点击确定')  
                    //             }
                    //         }
                    //     });
                    //     return;
                    // }
                }
            })
        }






    },
    // listenerPhoneInput: function (e) {
    //     this.data.phone = e.detail.value;
    //     console.log(this.data.phone)
    // },
    // inputcode: function (e) {
    //     console.log(typeof this.data.phone);
    //     var regNum = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
    //     var rsNum = regNum.test(parseInt(this.data.phone));
    //     var n = 1;
    //     if (rsNum) {
    //         countdown(this, n)
    //     } else {
    //         console.log('请输入正确的手机号!')
    //     }
    // },
    // inputAgin: function () {
    //     console.log(11);
    //     var n = 1;
    //     countdown(this, n)
    // }





})


// //获取应用实例  
// var app = getApp()  
// Page({  
//   data: {  
//     page:'1',  
//   },  
//    var password=value.password;  
//    if(password===""||password===null){  
//        wx.showModal({  
//             title:'提示',  
//             content: '密码不能为空',  
//             confirmColor:'#118EDE',  
//             showCancel: false,  
//             success: function (res) {  
//                 if (res.confirm) {  
//                     //console.log('用户点击确定')  
//                 }  
//             }  
//         });  
//         return false;  
//     }else{  
//         password=util.hexMD5(password);  
//     }  
// })  
