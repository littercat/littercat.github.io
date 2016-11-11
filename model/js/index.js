(function(){
	$(function(){
		var banner = $('.banner');
		var download = $('.download');
		var bannerBottom = $('.banner-bottom');
		var mainUl1  = $('.main1 ul');
		var mainUl2  = $('.main2 ul');
		var mainUl3  = $('.main3 ul');
		var mainUl4  = $('.main4 ul');
		var mainUl5  = $('.main5 ul');
		var mainUl6  = $('.main6 ul');
		var bannerStr = '';
		var downloadStr = '';
		var bBottomStr = '';
		var mainStr1 = '';
		var mainStr2 = '';
		var mainStr3 = '';
		var mainStr4 = '';
		var mainStr5 = '';
		var mainStr6 = '';
		// 固定头部
		var header = $('header');
		var top = 500;
		var num = '';
		$('.haudong').get('0').onscroll = function () {
			if($('.haudong').scrollTop() > 10){
				header.css({position:'fixed',left:0,top:0,zIndex:20});
				download.css({display:'none'});
			}
			if($('.haudong').scrollTop() < 10){
				header.css({position:'relative'});
				download.css({display:'block'});
			}





			// 判断条件不对
			
			// if($('.haudong').scrollTop()>500){
				/*var sTop = $('.haudong').scrollTop();
			    sTop += 500;
			    if(sTop)*/
				$.ajax({
				type:'get',
				dataType:'jsonp', 
				url:'http://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page='+num+'&ratio=3%3A4&_version=1&_=1478265667329',
				success: function(data){
					var lefttopStr = '';
					var leftbottomStr = '';
					var lefttop = $('.lefttop');
			 		var leftbottom = $('.leftbottom'); 
			 		var tempDate = data['result']['wall']['docs'];
			 		var tempHeight = null;
			 		var tempTopImg = null;
			 		var tempBotImg = null;
			 		var tempStr = '';
			 		num++;
					$.each(tempDate,function(k,v){
						var flag = true;
						tempTopImg = '';
						tempBotImg = '';
						$.each(v.lefttop_taglist,function (i, j) {
							tempTopImg += '<img src="' + j.img + '" class="goods-top-pic" />';
						})
						// 如果存在v.leftbottom_taglist.length
						if(v.leftbottom_taglist.length != 0){
							flag = false
							$.each(v.leftbottom_taglist,function (s, n) {
								tempBotImg += '<span class="goods-tip"><img src="' + n + '"/></span>';
							})
						}
						// 判断开关 增加类名
						tempStr = flag ? 'b' : 'a' ;
						mainStr6 += '<li><a href="'+ v.link +'"><div class="pic-content"><img src="'+ v.img +'" class="goods-pic">'+ tempTopImg +'</div><div class="word-content"><p class="goods-title ' +tempStr+ '">'+ v.title +'</p><p>'+ tempBotImg +'</p><p class="pirce"><b class="left">￥'+ v.price +'</b><i class="right ">'+ v.cfav +'</i></p></div></a></li>';
						mainUl6.html(mainStr6);
					});	
				}
			});
			// }
		
		}
	
		//获取banner
		$.ajax({
			type:'get',
			dataType:'jsonp', 
			url:'http://mce.mogucdn.com/jsonp/multiget/3?pids=7356%2C3756%2C24513%2C24522%2C24526&',
			success:function(data){
				// banner图
				$.each(data.data['3756'].list,function(k,v){
					bannerStr +=  '<div class="swiper-slide"><a href="'+data.data['3756'].list[k].link+'"><img src="'+data.data['3756'].list[k].image+'"></a></div>';
					banner.html(bannerStr);
				})
				// 轮播图
				var mySwiper = new Swiper ('.swiper-one', {
				    loop: true,
				    autoplay:2000,
				  paginationClickable: true,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				 });
				// 头部
				$.each(data.data['7356'].list,function(k,v){
					downloadStr += '<a href="'+data.data['7356'].list[k].link+'"><img src="'+data.data['7356'].list[k].bg+'" alt="'+data.data['7356'].list[k].title+'" /></a>'
					download.html(downloadStr);
				})
				// banner图的底部
				$.each(data.data['24513'].list,function(k,v){
					bBottomStr += '<a href="'+data.data['24513'].list[k].link+'"><img src="'+data.data['24513'].list[k].image+'" alt="'+data.data['24513'].list[k].title+'" /></a>'
					bannerBottom.html(bBottomStr);
				})
				// 大图片第一板块
				$.each(data.data['24522'].list,function(k,v){
					mainStr1 += '<li><a href="'+data.data['24522'].list[k].link+'"><img src="'+data.data['24522'].list[k].image+'" alt="'+data.data['24522'].list[k].title+'" /></a></li>'
					mainUl1.html(mainStr1);
				})
				// 图片第二板块
				$.each(data.data['24526'].list,function(k,v){
					mainStr2 += '<li><a href="'+data.data['24526'].list[k].link+'"><img src="'+data.data['24526'].list[k].image+'" alt="'+data.data['24526'].list[k].title+'" /></a></li>'
					mainUl2.html(mainStr2);
				})
			}
		}) 

		
		$.ajax({
			type:'get',
			dataType:'jsonp', 
			url:'http://mce.mogucdn.com/jsonp/multiget/3?pids=24532%2C3093%2C4746%2C4604',
			success:function(data){
				// 图片第三板块
				$.each(data.data['24532'].list,function(k,v){
					mainStr3 +=  '<li><a href="'+data.data['24532'].list[k].link+'"><img src="'+data.data['24532'].list[k].image+'" alt="'+data.data['24532'].list[k].title+'"></a></li>';
					mainUl3.html(mainStr3);
				})
				// 图片第四板块 买实惠
				$.each(data.data['3093'].list,function(k,v){
					mainStr4 +=  '<li><div><p>'+data.data['3093'].list[k].title+'</p><p>'+data.data['3093'].list[k].viceTitle+'</p></div><a href="'+data.data['3093'].list[k].link+'"><img src="'+data.data['3093'].list[k].image+'" alt="'+data.data['3093'].list[k].title+'"></a></li>';
					mainUl4.html(mainStr4);
				})
				// 正在流行
				$.each(data.data['4746'].list,function(k,v){
					mainStr5 +=  '<li><div><a href="'+data.data['4746'].list[k].link+'"><img src="'+data.data['4746'].list[k].image+'" alt="'+data.data['4746'].list[k].title+'"></a></div><div>'+data.data['4746'].list[k].title+'</div></li>';
					mainUl5.html(mainStr5);
				})
			}
		}) 
		// 猜你喜欢
		move();
		function move(){
			$.ajax({
				type:'get',
				dataType:'jsonp', 
				url:'http://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page=3&ratio=3%3A4&_version=1&_=1478265667329',
				success: function(data){
					var lefttopStr = '';
					var leftbottomStr = '';
					var lefttop = $('.lefttop');
			 		var leftbottom = $('.leftbottom'); 
			 		var tempDate = data['result']['wall']['docs'];
			 		var tempHeight = null;
			 		var tempTopImg = null;
			 		var tempBotImg = null;
			 		var tempStr = '';
					$.each(tempDate,function(k,v){
						var flag = true;
						tempTopImg = '';
						tempBotImg = '';
						$.each(v.lefttop_taglist,function (i, j) {
							tempTopImg += '<img src="' + j.img + '" class="goods-top-pic" />';
						})
						// 如果存在v.leftbottom_taglist.length
						if(v.leftbottom_taglist.length != 0){
							flag = false
							$.each(v.leftbottom_taglist,function (s, n) {
								tempBotImg += '<span class="goods-tip"><img src="' + n + '"/></span>';
							})
						}
						// 判断开关 增加类名
						tempStr = flag ? 'b' : 'a' ;
						mainStr6 += '<li><a href="'+ v.link +'"><div class="pic-content"><img src="'+ v.img +'" class="goods-pic">'+ tempTopImg +'</div><div class="word-content"><p class="goods-title ' +tempStr+ '">'+ v.title +'</p><p>'+ tempBotImg +'</p><p class="pirce"><b class="left">￥'+ v.price +'</b><i class="right ">'+ v.cfav +'</i></p></div></a></li>';
						mainUl6.html(mainStr6);
					});	
				}
			});
		}
		
		






		// =============================
	})
})(jQuery);