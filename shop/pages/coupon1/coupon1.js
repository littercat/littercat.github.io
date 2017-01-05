var app = getApp();
Page({
    data: {
        getHidden: true,
        flag: true,
        obtain:'点击领取',
        getDispaly:false,
        successTips:true
    },
    get: function () {
        if (this.data.flag) {
            this.setData({
                getHidden: false,
                flag: false,
                obtain:'确认并领取优惠券'
            })
        } else {
            this.setData({
                getHidden: true,
                flag: true,
                getDispaly:true,
                successTips:false
            })
        }
    },
    close:function(){
        this.setData({
            successTips:true
        })
        
    }
})