var app = getApp();
var totalsum2 = 0;
var countsum = 0;
var number = 0;
var num = 0;
var addnum = 0;
var olist = [];
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
        curIndex: 0,
        getDisplay: 'none',
        goodsImg: 'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80',
        cartImg: '../../image/footer-icon-03.png',
        bgColor: 'default',
        index1: 0,
        hideS: true,
        // 更多更多
        more: [
            '商品编码：从小到大',
            '商品编码：从大到小',
            '商品名称：从A到Z',
            '商品名称：从Z到A',
            '最新上架优先'
        ],
        // 筛选筛选
        options: [
            {
                condition: '仅查看促销商品',
                label: [
                    '特价',
                ]
            }, {
                condition: '新品上架'
            }, {
                condition: '热卖推荐'
            }, {
                condition: '清仓优惠'
            }
        ],
        moreNone: true,
        optionNone: true,
        flag: true,
        flag1: true,
        classname: 'last_content',
        displaystyle: 'none',
        myUserInfo: '',
        attr: [],
        imgArr: [],
        images: [],
        carImg: "../../image/footer-icon-03.png",
        eachCount: 0,
        iscart: false,
        cart: [],
        count: 0,
        total: 0,
        goodsCount: 0,
        minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
        bgColor: 'default',
        colorid: 0,
        totalsum: 0,
        goodsprice: 0,
        gid: 0,
        colorImg: '',
        curNav: 1,
        curIndex: 0,
        getDisplay: 'none',
        hidestyle: true,
        toastHidden: true,
        id: '',
        hidden: false,
        //搜索名称
        searchName: null,
        //pageindex
        pageIdx: 1,
        //产品列表
        productArr: [],
        clientHeight: 0,
        arr: [],
        arrHight: [],
        every: '',
        pageno: 1,
        sGoodHidden: false,
        allHidden: true,
        n_moreGOods: true,
        // 轮播图
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        transform: '',
        flagBtn: false
    },
    onShow: function () {
        var that = this
        wx.request({
            url: app.globalym + '/items_get?page_size=10&page_no=1',
            data: {
                custcert: '',
                usercode: wx.getStorageSync('bInformation').usercode,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
                var goodsCartA = wx.getStorageSync(goodsCart);
                for (var j in res.data.body) {
                    if (goodsCartA.length > 0) {
                        var Allcount = 0;
                        for (var i in goodsCartA) {
                            var gCode = goodsCartA[i].code;
                            var gCodeArr = [];

                            if (res.data.body[j].hidden == false) {
                                res.data.body[j].hidden = false;
                            } else {
                                res.data.body[j].hidden = true;
                            }
                            if (res.data.body[j].code == gCode) {
                                gCodeArr.push(goodsCartA[i]);
                                for (var n in gCodeArr) {
                                    Allcount += gCodeArr[n].count;
                                    if (Allcount != 0) {
                                        res.data.body[j]['Allcount'] = Allcount;
                                        res.data.body[j].hidden = false;
                                    } else {
                                        res.data.body[j]['Allcount'] = Allcount;
                                        res.data.body[j].hidden = true;
                                    }
                                }
                            }
                        }

                    } else {
                        for (var i in res.data.body) {
                            res.data.body[i]['hidden'] = true;
                        }
                    }
                }
                for (var i in res.data.body) {
                    res.data.body[i].sale = parseFloat(res.data.body[i].sale);
                }
                that.setData({
                    navLeftItems: res.data.body,
                    hidden: true,
                    sGoodHidden: false,
                    allHidden: true
                });
                console.log(that.data.navLeftItems)
            },
            fail: function () {
                // fail
            },
            complete: function (res) {
                that.setData({
                    navLeftItems: res.data.body,
                    hidden: true,
                    sGoodHidden: false,
                    allHidden: true,
                    n_moreGOods: true
                });
            }
        })
    },
    //事件处理函数
    switchRightTab: function (e) {
        let id = e.target.dataset.id,
            index = parseIn(e.target.dataset.index);
        this.setData({
            curNav: id,
            curIndex: index
        })
    },
    // 处理加入购物车的信息
    clickButton: function (e) {
        var index = e.target.id;
        var goodsid = e.currentTarget.dataset.numid;
        this.data.goodsprice = e.currentTarget.dataset.price;
        var _this = this;
        var upperid = wx.getStorageSync('bInformation').parentcompany.wareid
        this.data.goodsid = goodsid;
        var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
        var goodsCartA = wx.getStorageSync(goodsCart);
        wx.setStorageSync('goodscode', goodsid)
        wx.request({
            url: app.globalym + '/item_get',
            data: {
                custcert: '',
                usercode: wx.getStorageSync('bInformation').usercode,
                shopid: upperid,
                code: goodsid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var colorT = res.data.body.colors;
                // if(res.data.body.count)
                for (var i in colorT) {
                    var sizeT = colorT[i].sizes;
                    colorT[i].stkqty = 0;
                    for (var m in sizeT) {
                        sizeT[m]['qty'] = 0
                    }
                }
                for (var i in _this.data.navLeftItems) {
                    if (res.data.body.code == _this.data.navLeftItems[i].code) {
                        _this.data.navLeftItems[i]['stkqty'] = res.data.body.stkqty
                    }
                }
                res.data.body.sale = parseFloat(res.data.body.sale);
                var goodsCount = 0;
                if (goodsCartA.length > 0) {
                    for (var i in goodsCartA) {
                        if (goodsCartA[i].code == res.data.body.code) {
                            res.data.body.colors = goodsCartA[i].colors
                            for (var j in goodsCartA[i].colors) {
                                goodsCount += goodsCartA[i].colors[j].stkqty
                            }
                            _this.setData({
                                count: goodsCount,
                                total: goodsCount * res.data.body.sale
                            })
                        }
                    }
                }
                _this.setData({
                    navRightItems: res.data.body,
                    navLeftItems: _this.data.navLeftItems,
                    attr: res.data.body.colors,
                    images: res.data.body.images,
                    goodsid: _this.data.goodsid,
                    every: index,
                })
            },
            complete: function () {
                var colortype = _this.data.attr;
                var sizetype = colortype[0].colorid;
                var imgArr = [];
                if (_this.data.images.length > 0) {
                    for (var i in _this.data.images) {
                        if (_this.data.images[i].colorid == _this.data.colorid) {
                            imgArr.push(_this.data.images[i].imgurl);
                        }
                    }
                }
                else {
                    imgArr.push('../../image/w_logo_0.png')
                }

                console.log(_this.data.imgArr);
                _this.setData({
                    colorid: sizetype,
                    goodsprice: _this.data.goodsprice,
                    imgArr: imgArr,
                    transform: ''
                })

            },
        })
        this.setData({
            getDisplay: 'block',
            goodsImg: this.data.navLeftItems.img_url,
            id: e.target.dataset.id,
            numid: e.target.id,
        })


    },
    // 购物车减件数
    delCount: function (e) {
        var typeattr = this.data.attr;
        var totalprice = 0;
        var index = this.data.numid;
        var num = this.data.count;
        var price = this.data.navLeftItems[index].price;
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        for (var m in typeattr) {
            if (typeattr[m].colorid == this.data.colorid) {
                var typeattr1 = typeattr[m].sizes;
                for (var i in typeattr1) {
                    if (typeattr1[i].qty > 0) {
                        (typeattr1[i].qty)--;
                    }
                }
                num = 0;
                totalprice = 0;
                countsum = 0;
                for (var j in typeattr1) {
                    if (typeattr1[j].qty >= 0) {
                        totalprice += typeattr1[j].qty * this.data.goodsprice;
                        num += typeattr1[j].qty;
                        typeattr[m].stkqty = num;
                        // countsum = typeattr[m].stkqty;
                        var ml = this.data.totalsum;
                        if (ml >= 0) {
                            totalsum2 = totalprice + ml;
                        }
                    }
                }
            }
        }
        var attr1 = this.data.attr;
        for (var k in attr1) {
            console.log(attr1[k].stkqty);
            countsum += attr1[k].stkqty
        }
        console.log(countsum);

        // 将数值与状态写回
        this.setData({
            count: countsum,
            minusStatus: minusStatus,
            total: totalsum2,
            attr: this.data.attr,
        })
        console.log(this.data.total);
    },

    // 购物车加件数
    addCount: function (e) {
        var typeattr = this.data.attr;
        var index = this.data.numid;
        var num = this.data.count;
        var totalprice = 0;
        var qty = 0;
        var countsum1 = 0;
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        for (var m in typeattr) {
            if (typeattr[m].colorid == this.data.colorid) {
                var sizetype = typeattr[m].sizes;
                for (var n in sizetype) {
                    (sizetype[n].qty)++;
                }
                num = 0;
                countsum = 0;
                totalprice = 0;
                for (var j in sizetype) {
                    totalprice += sizetype[j].qty * this.data.goodsprice;
                    num += sizetype[j].qty;
                    typeattr[m].stkqty = num;
                    var jianNum = sizetype.length
                    // var ml = this.data.totalsum;
                    // if (ml == undefined) {
                    //   totalsum2 = totalprice
                    // } else {
                    //   totalsum2 = totalprice + ml;
                    // }
                }
            }
        }
        var attr1 = this.data.attr;
        for (var k in attr1) {
            countsum += attr1[k].stkqty
        }
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        this.setData({
            count: countsum,
            minusStatus: minusStatus,
            total: this.data.total + jianNum * this.data.goodsprice,
            attr: this.data.attr,
        })
    },
    hideButton: function (e) {
        this.setData({
            getDisplay: 'none',
            count: 0,
            total: 0
        })
        var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
        var goodsCartA = wx.getStorageSync(goodsCart);
        var leftItems = this.data.navLeftItems;
        var Allcount = 0;
        for (var j in leftItems) {
            if (goodsCartA.length > 0) {
                delete leftItems[j].colors
                for (var i in goodsCartA) {
                    var gCode = goodsCartA[i].code;
                    var gCodeArr = [];
                    for (var j in leftItems) {
                        if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
                            if (leftItems[j].code == gCode) {
                                gCodeArr.push(goodsCartA[i]);
                                for (var n in gCodeArr) {
                                    Allcount = gCodeArr[n].count;
                                    if (Allcount != 0) {
                                        leftItems[j]['Allcount'] = Allcount;
                                        leftItems[j].hidden = false;
                                    } else {
                                        leftItems[j]['Allcount'] = Allcount;
                                        leftItems[j].hidden = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setData({
            navLeftItems: leftItems,
        })
    },
    selected: function (e) {
        var index = e.target.dataset.index;
        this.setData({
            index1: index
        })
        console.log(index);
        console.log(this);
    },

    more: function () {
        if (this.data.flag) {
            this.setData({
                moreNone: false,
                flag: false
            })
        } else {
            this.setData({
                moreNone: true,
                flag: true
            })
            // this.data.flag = false
        }
    },
    option: function () {
        if (this.data.flag1) {
            this.setData({
                optionNone: false,
                flag1: false,
                classname: 'second'
            })
        } else {
            this.setData({
                optionNone: true,
                flag1: true,
                classname: 'last_content'
            })
        }
    },
    // 单件减
    bindMinus: function (e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var price = this.data.goodsprice;
        // var num = this.data.typeattr[index].qty;
        var arr = this.data.attr;
        console.log(arr)
        for (var i in arr) {
            var arr1 = arr[i].sizes;
            var colorid1 = arr[i].colorid;
            if (colorid1 == this.data.colorid) {
                // console.log(eachCount)
                for (var j = 0; j < arr1.length; j++) {
                    var stkqty = 0;
                    if (j == index) {
                        // 如果只有1件了，就不允许再减了
                        if (arr1[index].qty > 0) {
                            (arr1[index].qty)--;
                            num = arr1[index].qty;
                            arr[i].stkqty = num;
                        }
                        stkqty += arr1[j].qty;
                        console.log(stkqty)
                        //  console.log(arr[i].stkqty)
                    }
                }

                var total = num * price;
                // 只有大于一件的时候，才能normal状态，否则disable状态
                var minusStatus = num <= 0 ? 'disabled' : 'normal';
                // 按钮可用状态
                // var minusStatuses = this.data.minusStatuses;
                // minusStatuses[index] = minusStatus;
                var tolNum = 0,
                    tolPrice = 0;
                countsum = 0;
                for (var n in arr1) {
                    tolPrice += arr1[n].qty * this.data.goodsprice;
                    tolNum += arr1[n].qty;
                    arr[i].stkqty = tolNum;
                    countsum = arr[i].stkqty;
                }
            }
        }
        if (this.data.count - 1 > 0) {
            this.data.count = this.data.count - 1
        } else {
            this.data.count = 0
        }
        if (this.data.total - parseInt(this.data.goodsprice) > 0) {
            this.data.total = this.data.total - parseInt(this.data.goodsprice)
        } else {
            this.data.total = 0
        }
        // 将数值与状态写回
        this.setData({
            // minusStatuses: minusStatuses,
            total: this.data.total,
            count: this.data.count,
            attr: this.data.attr
        });
    },
    // 单件加
    bindPlus: function (e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var price = this.data.goodsprice;
        var arr = this.data.attr;
        var countnum = 0;
        for (var i in arr) {
            var colorid1 = arr[i].colorid;
            if (colorid1 == this.data.colorid) {
                var arr1 = arr[i].sizes;
                for (var j in arr1) {
                    if (j == index) {
                        (arr1[index].qty)++;
                        num = arr1[index].qty;
                    }
                }
                // // 自增
                var total = num * price;
                // 只有大于一件的时候，才能normal状态，否则disable状态
                var minusStatus = num <= 0 ? 'disabled' : 'normal';
                // 按钮可用状态
                // var minusStatuses = this.data.minusStatuses;
                // minusStatuses[index] = minusStatus;
                var tolNum = 0,
                    tolPrice = 0;
                countnum = 0;
                for (var n in arr1) {
                    tolPrice += arr1[n].qty * this.data.goodsprice;
                    tolNum += arr1[n].qty;
                    arr[i].stkqty = tolNum;
                }
            }
        }
        console.log(arr);
        this.data.attr = arr;
        console.log(this.data.attr);
        // 将数值与状态写回
        this.setData({
            // minusStatuses: minusStatuses,
            total: parseInt(this.data.goodsprice) + this.data.total,
            count: 1 + this.data.count,
            attr: this.data.attr,
        });
    },
    // 加入购物车
    addcart: function (e) {
        var id = e.target.id;
        wx.setStorageSync('goodsCode', this.data.goodsid);
        for (var i in this.data.navLeftItems) {
            var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
            var arr = wx.getStorageSync(goodsCart) || [];
            var _this = this
            this.data.navLeftItems[i]['colors'] = this.data.attr;
            // console.log(this.data.navLeftItems[i].count);
            // console.log(this.data.navLeftItems[i].count*this.data.navLeftItems[i].sale);
            // this.setData({
            //   count:this.data.navLeftItems[i].count,
            //   total:this.data.navLeftItems[i].count*this.data.navLeftItems[i].sale
            // })
            //  console.log(this.data.navLeftItems)
            //   console.log(this.data.count);
            //   console.log(this.data.total);
            if (this.data.navLeftItems[i].code == this.data.goodsid) {
                this.data.navLeftItems[i].count = this.data.count;
                // 商品放入本地存储
                this.data.navLeftItems[i]['selected'] = false;
                var beforeImg = this.data.navLeftItems[i].imgurl
                this.data.navLeftItems[i].imgurl = this.data.imgArr[0];
                var allSingle = wx.getStorageSync(goodsCart) || [];
                this.setData({
                    allSingle: allSingle
                })
                if (arr.length > 0) {
                    for (var j in arr) {
                        if (arr[j].code == this.data.id) {
                            arr[j].count = this.data.navLeftItems[i].count;
                            arr[j].colors = this.data.navLeftItems[i].colors;
                            // 如果本地存储为1的话
                            if (arr.length == 1) {
                                // 如果本地存储count为0 的话
                                if (arr[j].count == 0) {
                                    for (var n in this.data.navLeftItems) {
                                        if (arr[j].code == this.data.navLeftItems[n].code) {
                                            this.data.navLeftItems[n].Allcount = 0;
                                            this.data.navLeftItems[n].hidden = true;
                                        }
                                    }
                                    this.setData({
                                        navLeftItems: this.data.navLeftItems
                                    })
                                    wx.showModal({
                                        title: '提示',
                                        content: '该商品加入购物车为空????',
                                        confirmColor: '#118EDE',
                                        showCancel: true,
                                        success: function (res) {
                                            if (res.confirm) {
                                                _this.setData({
                                                    toastHidden: true,
                                                    getDisplay: 'none',
                                                });
                                                try {
                                                    wx.removeStorageSync(goodsCart)
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                                return
                                            } else {
                                                // wx.removeStorageSync(goodsCart)
                                                console.log(222);
                                                _this.setData({
                                                    toastHidden: true,
                                                    getDisplay: 'block',
                                                });
                                            }
                                        }
                                    });
                                    // wx.removeStorageSync(goodsCart)
                                    return
                                } else {
                                    wx.setStorageSync(goodsCart, arr);
                                    _this.setData({
                                        toastHidden: false,
                                        getDisplay: 'none',
                                    });
                                }
                            } else {
                                console.log(arr)
                                var spliceArr = [];
                                for (var n in this.data.navLeftItems) {
                                    if (arr[j].code == this.data.navLeftItems[n].code) {
                                        this.data.navLeftItems[n].Allcount = 0;
                                        this.data.navLeftItems[n].hidden = true;
                                    }
                                }
                                this.setData({
                                    navLeftItems: this.data.navLeftItems
                                })
                                if (arr[j].count == 0) {
                                    _this.setData({
                                        toastHidden: true,
                                        getDisplay: 'block',
                                    });
                                    var arrCode = arr[j].code
                                    wx.showModal({
                                        title: '提示',
                                        content: '该商品加入购物车为空????',
                                        confirmColor: '#118EDE',
                                        showCancel: true,
                                        success: function (res) {
                                            if (res.confirm) {
                                                for (var k in arr) {
                                                    if (arr[k].code != arrCode) {
                                                        spliceArr.push(arr[k])
                                                    }
                                                }
                                                arr = spliceArr;
                                                wx.setStorageSync(goodsCart, arr);
                                                _this.setData({
                                                    toastHidden: true,
                                                    getDisplay: 'none',
                                                });
                                                console.log(wx.getStorageSync(goodsCart))
                                                return
                                            } else {
                                                console.log(222222);
                                                _this.setData({
                                                    toastHidden: true,
                                                    getDisplay: 'block',
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    wx.setStorageSync(goodsCart, arr);
                                    _this.setData({
                                        toastHidden: false,
                                        getDisplay: 'none',
                                    });
                                }
                            }
                            try {
                                wx.setStorageSync(goodsCart, arr);
                            } catch (e) {
                                console.log(e)
                            }
                            this.data.navLeftItems[i]['count'] = 0;
                            var cartnull = 0;
                            this.data.navLeftItems[i].imgurl = beforeImg;
                            for (var j in wx.getStorageSync(goodsCart)) {
                                var storageCode = wx.getStorageSync(goodsCart)[j].code;
                                var GeCode = this.data.navLeftItems[i].code;
                                if (storageCode == GeCode) {
                                    cartnull += wx.getStorageSync(goodsCart)[j].count;
                                    this.data.navLeftItems[i].count = cartnull
                                }
                            }
                            var goodsCartA = wx.getStorageSync(goodsCart);
                            var leftItems = this.data.navLeftItems;
                            delete leftItems[j].colors
                            var Allcount = 0;
                            if (goodsCartA.length > 0) {
                                for (var i in goodsCartA) {
                                    var gCode = goodsCartA[i].code;
                                    var gCodeArr = [];
                                    for (var j in leftItems) {
                                        if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
                                            if (leftItems[j].code == gCode) {
                                                gCodeArr.push(goodsCartA[i]);
                                                for (var n in gCodeArr) {
                                                    Allcount = gCodeArr[n].count;
                                                    if (Allcount != 0) {
                                                        leftItems[j]['Allcount'] = Allcount;
                                                        leftItems[j].hidden = false;
                                                    } else {
                                                        leftItems[j]['Allcount'] = Allcount;
                                                        leftItems[j].hidden = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                this.setData({
                                    navLeftItems: leftItems
                                })
                                return
                            }
                        } else {
                            _this.setData({
                                toastHidden: false,
                                getDisplay: 'none',
                            });
                        }
                    }
                    this.data.navLeftItems[i]['selected'] = false
                    arr.unshift(this.data.navLeftItems[i]);
                } else {
                    if (this.data.navLeftItems[i].count == 0) {
                        _this.setData({
                            toastHidden: true,
                            getDisplay: 'block',
                        });
                        wx.showModal({
                            title: '提示',
                            content: '该商品为空',
                            confirmColor: '#118EDE',
                            showCancel: true,
                            success: function (res) {
                                if (res.confirm) {
                                    _this.setData({
                                        toastHidden: true,
                                        getDisplay: 'none',
                                    });
                                    try {
                                        wx.removeStorageSync(goodsCart)
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    return
                                } else {
                                    wx.removeStorageSync(goodsCart)
                                    _this.setData({
                                        toastHidden: true,
                                        getDisplay: 'block',
                                    });
                                }
                            }
                        });
                    } else {
                        _this.data.navLeftItems[i]['selected'] = false
                        arr.unshift(this.data.navLeftItems[i]);
                        this.setData({
                            toastHidden: false,
                            getDisplay: 'none',
                        });
                    }
                }
                try {
                    wx.setStorageSync(goodsCart, arr)
                } catch (e) {
                    console.log(e)
                }
                this.setData({
                    count: 0,
                    total: 0,
                })

                this.data.navLeftItems[i]['count'] = 0;
                var cartnull = 0;
                this.data.navLeftItems[i].imgurl = beforeImg;
                for (var j in wx.getStorageSync(goodsCart)) {
                    var storageCode = wx.getStorageSync(goodsCart)[j].code;
                    var GeCode = this.data.navLeftItems[i].code;
                    if (storageCode == GeCode) {
                        cartnull += wx.getStorageSync(goodsCart)[j].count;
                        this.data.navLeftItems[i].count = cartnull
                    }
                }
                var goodsCartA = wx.getStorageSync(goodsCart);
                var leftItems = this.data.navLeftItems;
                var Allcount = 0;
                if (goodsCartA.length > 0) {
                    delete leftItems[j].colors
                    for (var i in goodsCartA) {
                        var gCode = goodsCartA[i].code;
                        var gCodeArr = [];
                        for (var j in leftItems) {
                            if (wx.getStorageSync('goodsCode') == gCode || this.data.goodsid == gCode) {
                                if (leftItems[j].code == gCode) {
                                    gCodeArr.push(goodsCartA[i]);
                                    for (var n in gCodeArr) {
                                        Allcount = gCodeArr[n].count;
                                        if (Allcount != 0) {
                                            leftItems[j]['Allcount'] = Allcount;
                                            leftItems[j].hidden = false;
                                        } else {
                                            leftItems[j]['Allcount'] = Allcount;
                                            leftItems[j].hidden = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.setData({
                    navLeftItems: leftItems
                })
            }
        }
    },

    selected: function (e) {
        var sizeno = e.target.dataset.index;
        var attr = this.data.attr;
        for (var i in attr) {
            if (attr[i].colorid == sizeno) {
                this.setData({
                    bgColor: 'bgcolor',
                    colorImg: attr[i].imgurl
                })
                console.log(this.data.colorImg);
            }
        }
        this.setData({
            colorid: sizeno,
            totalsum: totalsum2
        })
        console.log(this.data.totalsum)
    },
    // 手动填入数量
    quality: function (e) {
        var index = e.target.dataset.index;
        this.setData({
            hidestyle: false,
            index: e.target.dataset.index
        })
    },
    goodsCount: function (e) {
        this.data.quality = e.detail.value;
    },
    cancel: function () {
        this.setData({
            hidestyle: true
        })
    },
    selectAllG: function () {
        var that = this;
        this.data.pageno += 1;
        this.setData({
            sGoodHidden: true
        })
        if (this.data.flagBtn == false) {
            this.setData({
                flagBtn: true
            })
            if (this.data.pageno <= 200) {
                // console.log(111);
                setTimeout(function () {
                    that.setData({
                        allHidden: false,
                    })
                }, 1000);
                wx.request({
                    url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
                    data: {
                        // goods_commend:'1'
                        custcert: '',
                        usercode: wx.getStorageSync('bInformation').usercode,
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
                        var goodsCartA = wx.getStorageSync(goodsCart);
                        for (var j in res.data.body) {
                            if (goodsCartA.length > 0) {
                                var Allcount = 0;
                                for (var i in goodsCartA) {
                                    var gCode = goodsCartA[i].code;
                                    var gCodeArr = [];

                                    if (res.data.body[j].hidden == false) {
                                        res.data.body[j].hidden = false;
                                    } else {
                                        res.data.body[j].hidden = true;
                                    }
                                    if (res.data.body[j].code == gCode) {
                                        gCodeArr.push(goodsCartA[i]);
                                        for (var n in gCodeArr) {
                                            Allcount += gCodeArr[n].count;
                                            res.data.body[j]['Allcount'] = Allcount;
                                            res.data.body[j].hidden = false;
                                        }
                                    }
                                }

                            } else {
                                for (var i in res.data.body) {
                                    res.data.body[i]['hidden'] = true;
                                }
                            }
                        }
                        for (var i in res.data.body) {
                            res.data.body[i].sale = parseFloat(res.data.body[i].sale);
                        }
                        var tempArr = that.data.navLeftItems;
                        if (tempArr.length < 10) {
                            setTimeout(function () {
                                that.setData({
                                    navLeftItems: tempArr.concat(res.data.body),
                                    hidden: true,
                                    pageno: that.data.pageno,
                                    allHidden: true
                                })
                            }, 1000)

                        } else {
                            setTimeout(function () {
                                that.setData({
                                    navLeftItems: tempArr.concat(res.data.body),
                                    hidden: true,
                                    pageno: that.data.pageno
                                })
                            }, 1000)

                        }
                    },
                    fail: function () {
                        // fail
                    },
                    complete: function () {
                        // wx.hideNavigationBarLoading() //完成停止加载
                        // wx.stopPullDownRefresh() //停止下拉刷新
                    }
                })
            } else {
                console.log(2222);
                that.setData({
                    n_moreGOods: false,
                    allHidden: true
                })
            }
        }

    },
    onPullDownRefresh() {
        console.log('--------下拉刷新-------')
        // wx.showNavigationBarLoading() //在标题栏中显示加载
        if (this.data.flagBtn) {
            var that = this;
            that.setData({
                pageno: that.data.pageno + 1,
                // sGoodHidden: true
            })
            setTimeout(function () {
                that.setData({
                    allHidden: false,
                })
            }, 1000);
            wx.request({
                url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
                data: {
                    // goods_commend:'1'
                    custcert: '',
                    usercode: wx.getStorageSync('bInformation').usercode,
                    // shopid:'',
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
                    var goodsCartA = wx.getStorageSync(goodsCart);
                    for (var j in res.data.body) {
                        if (goodsCartA.length > 0) {
                            var Allcount = 0;
                            for (var i in goodsCartA) {
                                var gCode = goodsCartA[i].code;
                                var gCodeArr = [];

                                if (res.data.body[j].hidden == false) {
                                    res.data.body[j].hidden = false;
                                } else {
                                    res.data.body[j].hidden = true;
                                }
                                if (res.data.body[j].code == gCode) {
                                    gCodeArr.push(goodsCartA[i]);
                                    for (var n in gCodeArr) {
                                        Allcount += gCodeArr[n].count;
                                        res.data.body[j]['Allcount'] = Allcount;
                                        res.data.body[j].hidden = false;
                                    }
                                }
                            }

                        } else {
                            for (var i in res.data.body) {
                                res.data.body[i]['hidden'] = true;
                            }
                        }
                    }
                    for (var i in res.data.body) {
                        res.data.body[i].sale = parseFloat(res.data.body[i].sale);
                    }
                    var tempArr = that.data.navLeftItems;
                    if (tempArr.length < 10) {
                        setTimeout(function () {
                            that.setData({
                                navLeftItems: tempArr.concat(res.data.body),
                                hidden: true,
                                pageno: that.data.pageno,
                                n_moreGOods: false,
                                allHidden: true
                            })
                        }, 1000)

                    } else {
                        setTimeout(function () {
                            that.setData({
                                navLeftItems: res.data.body.concat(tempArr),
                                hidden: true,
                                pageno: that.data.pageno,
                            })
                        }, 1000)

                    }
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                    // wx.hideNavigationBarLoading() //完成停止加载
                    // wx.stopPullDownRefresh() //停止下拉刷新
                }
            })
        }
    },
    onReachBottom() {
        console.log('--------上拉加载-------')
        // wx.showNavigationBarLoading() //在标题栏中显示加载
        if (this.data.flagBtn) {
            var that = this;
            that.setData({
                pageno: that.data.pageno + 1,
                sGoodHidden: true
            })
            setTimeout(function () {
                that.setData({
                    allHidden: false,
                })
            }, 1000);
            wx.request({
                url: app.globalym + '/items_get?page_size=10&page_no=' + this.data.pageno,
                data: {
                    // goods_commend:'1'
                    custcert: '',
                    usercode: wx.getStorageSync('bInformation').usercode,
                    // shopid:'',
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    var goodsCart = 'cart_' + wx.getStorageSync('bInformation').usercode;
                    var goodsCartA = wx.getStorageSync(goodsCart);
                    for (var j in res.data.body) {
                        if (goodsCartA.length > 0) {
                            var Allcount = 0;
                            for (var i in goodsCartA) {
                                var gCode = goodsCartA[i].code;
                                var gCodeArr = [];

                                if (res.data.body[j].hidden == false) {
                                    res.data.body[j].hidden = false;
                                } else {
                                    res.data.body[j].hidden = true;
                                }
                                if (res.data.body[j].code == gCode) {
                                    gCodeArr.push(goodsCartA[i]);
                                    for (var n in gCodeArr) {
                                        Allcount += gCodeArr[n].count;
                                        res.data.body[j]['Allcount'] = Allcount;
                                        res.data.body[j].hidden = false;
                                    }
                                }
                            }

                        } else {
                            for (var i in res.data.body) {
                                res.data.body[i]['hidden'] = true;
                            }
                        }
                    }
                    for (var i in res.data.body) {
                        res.data.body[i].sale = parseFloat(res.data.body[i].sale);
                    }
                    var tempArr = that.data.navLeftItems;
                    // if (tempArr.length < 10) {

                    // }
                    // tempArr.concat(res.data.body);
                    // console.log(tempArr.concat(res.data.body))
                    // that.setData({
                    //     navLeftItems: tempArr.concat(res.data.body),
                    //     hidden: true,
                    //     pageno: that.data.pageno,
                    //     allHidden: true
                    // })

                    if (tempArr.length < 10) {
                        setTimeout(function () {
                            that.setData({
                                navLeftItems: tempArr.concat(res.data.body),
                                hidden: true,
                                pageno: that.data.pageno,
                                allHidden: true,
                                n_moreGOods: false,
                            })
                        }, 1000)

                    } else {
                        console.log(111);
                        setTimeout(function () {
                            that.setData({
                                navLeftItems: tempArr.concat(res.data.body),
                                hidden: true,
                                pageno: that.data.pageno,
                            })
                        }, 1000)
                        console.log(that.data.navLeftItems);
                    }
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                    // wx.hideNavigationBarLoading() //完成停止加载
                    // wx.stopPullDownRefresh() //停止下拉刷新
                }
            })
        }
    }

});
