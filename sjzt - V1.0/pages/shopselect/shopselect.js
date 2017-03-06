Page({
  data: {
    items: [],
    index: 0,
    checked: false,
    shopids: ''
  },
  onLoad: function () {
    var information = wx.getStorageSync('bInformation');
    var shop = information.shops;
    this.setData({
      items: shop,
      companyid: information.companyid
    })

  },
  checkboxChange: function (e) {
    var shopids = e.detail.value;
    var items = this.data.items;
    var shopids1 = '';
    // for(var i in items){
    //   if(i==0){
    //     this.data.shopids =  shopids.join();
    //   }else{
    shopids1 = shopids.join(',');
    //   }
    // }
    // console.log(this.data.shopids);
    if (shopids == this.data.companyid) {
      var information = wx.getStorageSync('bInformation');
      var shop = information.shops;
      var allshopids = '';
      var eachshopid = '';
      for(var i in shop){
        eachshopid = shop[i].shopid;
        allshopids += eachshopid +','
        if(i == shop.length-1){
          allshopids += eachshopid
        }
      }
      this.setData({
        shopids: allshopids
      })
      return
    } else {
      console.log(shopids1.indexOf(this.data.companyid) == -1);
      if (shopids1.indexOf(this.data.companyid) == -1) {
        this.setData({
          shopids: shopids1
        })
      } else {
        this.setData({
          shopids: this.data.companyid
        })
      }
    }
    console.log(this.data.shopids)
  },
  confirm: function () {
    var shopids = this.data.shopids;
    wx.redirectTo({
      url: '../business/business?shopids=' + shopids,
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
})
