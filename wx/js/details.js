(function($){
	$(function(){
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
	     var navTabs     = $('.navTabs li');
	     var tabContents = $('.tabContent .tabBody');
	     navTabs.on('touchstart',function(event){
	        var nIndex = navTabs.index($(this));
	        tabContents.removeClass('tActive').eq(nIndex).addClass('tActive');
	        navTabs.removeClass('border').eq(nIndex).addClass('border');
	     })
	      // 详情页footer
	      var detalFooterli = $('.detal_footer li');
	      var dIconfont     = $('.detal_footer .iconfont')
	      detalFooterli.on('touchstart',function(){
	        var dIndex = $(this).index();
	        dIconfont.removeClass('active').eq(dIndex).addClass('active')
	      })
	      // 点击联系卖家出现卖家的信息
	    var contactSale      = $('.contactSale');
	    var closeBtn         = $('.closeBtn a');
	    var storeInformation = $('.storeInformation');
	    var bgColor          = $('.bg');
	    var tContact         = $('.contact');
	    // 点击出现shop的信息
	    contactSale.on('touchstart',function(event){
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
	    cancelBubble(storeInformation)
	    $(document).on('touchstart',function() {
	         bgColor.css({display:'none'});
	        storeInformation.css({display:'none'});
	        GoodsSku.css({display:'none'});
	    })

	    // 点击加入购物车出现的信息点击立即购买出现的信息
	    var carChange   = $('.change');
	    var GoodsSku    = $('.GoodsSku');
	    var buyBtn      = $('.buyBtn a'); 
	    carChange.on('touchstart',function(event){
	    	var e = (event) ? event : window.event;
	        window.event ? e.stopPropagation() : e.cancelBubble = true;
	        var cIndex = carChange.index($(this));
	    	bgColor.css({display:'block'});
	    	GoodsSku.css({display:'block'});
	    	console.log(cIndex);
	    	console.log(buyBtn.eq(cIndex));
	    	buyBtn.removeClass('hide').eq(cIndex).addClass('hide');
	    })
	   cancelBubble(GoodsSku);
	})
	// 阻止冒泡
	function cancelBubble(obj){
		 obj.on('touchstart',function(event){
	         var e = (event) ? event : window.event;
	        window.event ? e.stopPropagation() : e.cancelBubble = true;
	    })
	}

})(jQuery)
