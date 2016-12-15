$(document).ready(function () {
    // 首页轮播图
   var mySwiper = new Swiper ('.swiper-one', {
        loop: true,
        autoplay:2000,
        paginationClickable: true,
        autoplayDisableOnInteraction:false,
            // 如果需要分页器
        pagination: '.swiper-pagination',
    });
   // 跑马灯公告
    var stringEl = $('.str1').liMarquee();
    // var speedChange = $(this);
    // stringEl.trigger('mouseenter');
    // stringEl.data({scrollamount:35});
    // stringEl.trigger('mouseleave');

// 尾部
    var footList = $('footer li');
    footList.on('touchstart',function(){
        var fIndex = $(this).index();
        footList.removeClass('active').eq(fIndex).addClass('active');
    })
    // 商店的信息
    var closeBtn       = $('.closeBtn a');
    var storeInformation = $('.storeInformation');
    var bgColor        = $('.bg');
    var tContact       = $('.contact');
    // 点击出现shop的信息
    tContact.on('touchstart',function(event){
        var e = (event) ? event : window.event;
        window.event ? e.stopPropagation() : e.cancelBubble = true;
        bgColor.css({display:'block'});
        storeInformation.css({display:'block'});
    })
    // 点击shop消失
    closeBtn.on('touchstart',function(event){
        var e = (event) ? event : window.event;
        window.event ? e.stopPropagation() : e.cancelBubble = true;
        bgColor.css({display:'none'});
        storeInformation.css({display:'none'});
    })
    storeInformation.on('touchstart',function(){
         var e = (event) ? event : window.event;
        window.event ? e.stopPropagation() : e.cancelBubble = true;
    })
    $(document).on('touchstart',function() {
         bgColor.css({display:'none'});
        storeInformation.css({display:'none'});
    })

    // 优惠券

    // 点击领取
    var couponPhone = $('.phone');
    var btnGetCoupon = $('#btnGetCoupon');
    var  flag = true;
    var clickObtain    = $('.clickObtain');
    var successTips    = $('#successTips');
    var usrPhone       = $('#usrPhone');
    var usrName        = $('#usrName');
    var close          = $('.close');
    btnGetCoupon.on('touchstart',function(){
        // couponPhone.slideToggle();
        if(flag){
            flag = false;
            couponPhone.slideDown();
            btnGetCoupon.html('确认并领取优惠券');
            btnGetCoupon.addClass('confirm_receive');
        }else{
            flag = true;
            successTips.css({display:'block'});
            btnGetCoupon.css({display:'none'})
             couponPhone.css({display:'none'});
            console.log(11);
        }
    })
    close.on('touchstart',function(){
        successTips.css({display:'none'});
    })



    // 二维码
    $("#barcode").barcode("1234567890128",'ean13', { barWidth: 2, barHeight: '40px' ,displayValue: 'false',bgColor:"#dfdfdf",fontSize:'0'});  


    // 详情页的轮播
     var mySwiper = new Swiper ('.swiper-two', {
        loop: true,
        autoplay:2000,
        paginationClickable: true,
        autoplayDisableOnInteraction:false,
            // 如果需要分页器
        pagination: '.swiper-pagination',
    });

     // 商品的tab切换
     var navTabs = $('.navTabs li');
     var tabContents = $('.tabContent .tabBody');
     navTabs.on('touchstart',function(){
        var nIndex = navTabs.index($(this));
        tabContents.removeClass('tActive').eq(nIndex).addClass('tActive');
     })

})