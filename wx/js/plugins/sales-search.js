$(function() {
	// =======================初始化=======================
	var baseUrl = "http://dev.9isoft.com/eb/server.php";
	var usercode = "upyuan";
	var userpwd = "123456";
	var $table = $('#table');
	var client = hprose.Client.create(baseUrl, ["user_login"]);
	client.user_login(usercode, userpwd).then(function(result) {
		var loginInfo = jQuery.parseJSON(result);
		loginInfo["usercode"] = usercode;
		localStorage.setItem("Login_Info", JSON.stringify(loginInfo));
		$table.on('page-change.bs.table', function(e, number, size) {
			querySales(number, size);
		});
		var options = $table.bootstrapTable('getOptions');
		querySales(options.pageNumber, options.pageSize);
	}, function(err) {
		alert(err);
	});

		//==========导航=================
	var navLi = $('.nav li');
	var message = $('.a .tb')
	navLi.click(function() {
		var nIndex = $(this).index();
		navLi.removeClass('active').eq(nIndex).addClass('active');
		message.css({
			display: 'none'
		}).eq(nIndex).css({
			display: 'block'
		});
	})
	var selectBtn = $('.select-btn');
	var search = $('.search');
	var filterSales = search.find('.filter-sales');
	var flag = true;
	selectBtn.click(function() {
			if(flag) {
				filterSales.slideDown();
				flag = false;
			} else {
				filterSales.slideUp();
				flag = true;
			}
		})



	// ===============================外部搜索条件================
	//搜索框发生改变时出现的商品
	var selectVal = $('.searchInput input');
	var liList = $('#liList');
	var iid = '';
	selectVal.on('input propertychange', function() {
		liList.css({
			display: 'block'
		});
		var str = '';
		if(selectVal.val() !== '') {
			var logininfos = jQuery.parseJSON(localStorage.getItem("Login_Info"));
			var client = hprose.Client.create(baseUrl, ["items_get"]);
			var s = {
				'item_cond': selectVal.val()
			};
			client.items_get(
				logininfos.body.custcert,
				logininfos.usercode,
				10,
				1,
				"",
				"",
				JSON.stringify(s)
			).then(function(result) {
				var selectResult = JSON.parse(result).body.rows;
				for(var i = 0; i < selectResult.length; i++) {
					str += '<li class="selectList"  data = "' + selectResult[i].num_iid + '"><strong class="goodsI goodsName left">' + selectResult[i].item_name + '</strong><b class = "right goodsI">￥' + selectResult[i].price + '</b></li>';
					liList.html(str);
				}
			}, function(err) {
				alert(err);
			});
		} else {
			liList.css({
				display: 'none'
			});
		}
	})

	var searchInput = $('.searchInput');
	var searchBox = $('.searchInput input');
	var searchLine = $('.searchLine')
	var iIndex = -1;
	var alist = $('#liList li');
	//点击出现对应的商品
	var Index = 0;
	liList.on('click', 'li', function(event) {
		window.event ? event.stopPropagation() : event.cancelBubble = true;
		Index = $(".selectList").index($(this));
		searchBox.val($(".selectList strong").eq(Index).html());
		var dataID = $(".selectList").eq(iIndex).attr('data');
		searchBox.attr('data', dataID);
		liList.css({
			display: 'none'
		});
	})
	$(document).click(function() {
		liList.css({
			display: 'none'
		});
	})
//上下键
	$(document).keydown(function(evt) {
			var event = evt || window.event;
			var code = evt.keyCode || event.which;
			var alist = $('#liList li');
			if((code == 38 || code == 40) && alist.length) {
				if(code == 38) {
					iIndex--;
					if(iIndex < 0) {
						iIndex = alist.length - 1;
					}
				} else {
					iIndex++;
					if(iIndex == alist.length) {
						iIndex = 0;
					}
				}
				alist.removeClass('gActive').eq(iIndex).addClass('gActive')
				searchBox.val(alist.eq(iIndex).find('.goodsName').html());
				return false;
			}
			if(code == 13) {
				searchBox.val(alist.eq(iIndex).find('.goodsName').html());
				var dataID = alist.eq(iIndex).attr('data');
				searchBox.attr('data', dataID);
				liList.css({
					display: 'none'
				})
			}
		})
		//点击搜索事件出现相应的信息
	$('.selectGoods').on('click', function() {
		var logininfos = jQuery.parseJSON(localStorage.getItem("Login_Info"));
		var client = hprose.Client.create(logininfos.body.url, ["sales_get"]);
		var selectGoodsID = searchBox.attr('data');
		var s = null;
		numID = selectGoodsID;
		console.log(numID)
		onChange(numID,iNum,payType,costType)
	})


		//获取时间信息
	var gCondition = null;
	var menuOne    = $('.menu1 li a');
	var menuTwo    = $('.menu2 li a');
	var menuThere  = $('.menu3 li a');
	var firstBtn   = $('.firstBtn b');
	var secondBtn  = $('.secondBtn b');
	var threeBtn   = $('.threeBtn b');
	obtain(menuOne, firstBtn)
	obtain(menuTwo, secondBtn)
	obtain(menuThere, threeBtn)
	function obtain(a, b) {
		a.click(function() {
			var index = a.index($(this));
			var str = a.eq(index).html();
			b.html(str);
		})
	}
	$('.menu1 li').on('click',function(){
		var lIndex = $(this).index();
		if(lIndex == 0){
			iNum = 0
		}else if( lIndex == 1){
			iNum = 1;
		}else if( lIndex == 2){
			iNum = 2;
		}else if( lIndex == 3){
			iNum = 3;
		}else if( lIndex == 5){
			iNum = 4;
		}
		onChange(numID,iNum,payType,costType)
	})
	$('.menu2 li').click(function(){
		var lIndex = $(this).index();
		if(lIndex == 0){
			payType = 'null';
		}else if( lIndex == 1){
			payType = 'XJ';
		}else if( lIndex == 2){
			payType = "YLK";
		}else if( lIndex == 3){
			payType = "CZK";
		}else if( lIndex == 4){
			payType = "JCK";
		}else if( lIndex == 5){
			payType = "QK";
		}else if( lIndex == 6){
			payType = "ZFB";
		}else if( lIndex == 7){
			payType = "WX";
		}else if( lIndex == 8){
			payType = "ZHSK";
		}else if( lIndex == 10){
			payType = 'GD'
		}
		onChange(numID,iNum,payType,costType)
	})
	$('.menu3 li').click(function(){
		var lIndex = $(this).index();
		if(lIndex == 0){
			costType = 'null';
		}else if( lIndex == 1){
			costType = 'VIP';
		}else if( lIndex == 2){
			costType = "NOVIP";
		}
		onChange(numID,iNum,payType,costType)
	})
	// ===========================内部条件的查询=======================
		//获取会员号码
	var member = $('.member');
	var oPtion = search.find('.option');
	var iValue = search.find('.option i');
	var waterSingle = search.find('.water-single')
	member.bind('input propertchange', function() {
		var mValue = member.val();
		waterSingle.animate({
			height: waterSingle.height()
		});
		oPtion.css({
			display: 'block'
		});
		iValue.html(mValue);
		if(member.val() === '') {
			oPtion.css({
				display: 'none'
			});
		}
	})
	var flowLine = $('.flow_line');
	flowLine.on('input propertchange', function() {
		
	})
	var btnList = $('.btn-list button');
	btnList.click(function() {
		var index = btnList.index($(this));
	})

	var deleteBtn = $('.deleteBtn');
	deleteBtn.click(function(){
		oPtion.css({
				display: 'none'
			});
	})
	var query = $('.query');
	query.click(function(){
		var vipNum = $('.member').val();
		var flowLiner = $('.flow_line').val()
	})
	//点击消失
	var bgListspan = $('.bg-list span');
	bgListspan.click(function(event) {
			$('.bg').fadeOut(500);
			$('.bg-list').animate({
				right: '-50%'
			}, function() {
				$('.bg-list').css({
					display: 'none'
				})
			});
		})
		//阻止冒泡
	$('.bg-list').click(function(event) {
		var e = (event) ? event : window.event;
		window.event ? e.stopPropagation() : e.cancelBubble = true;
	})
	$(document).click(function() {
			$('.bg').fadeOut(500);
			$('.bg-list').animate({
				right: '-50%'
			}, function() {
				$('.bg-list').css({
					display: 'none'
				})
			});
		})
	

	//点击出现右边栏 商品的详情
	var a = $table.find('tr')
	var flagBtn = true;
	var num = 0;
	$table.on('click',".clickSpan", function(event) {
		var e = (event) ? event : window.event;
		window.event ? e.stopPropagation() : e.cancelBubble = true;
		var add = $table.find('.clickSpan');
		var gindex = add.index($(this));
		var moreGoods = $('.moreGoods');
		// debugger;
		if(add.eq(gindex).hasClass('more') === false) {
			$('.bg').fadeIn();
			$('.bg-list').css({
				display: 'block'
			}).animate({
				right: 0
			});
			$table.on('all.bs.table', function(e, name, args) {
				console.log(args);
				if(name == 'click-row.bs.table') {
					var logininfos = jQuery.parseJSON(localStorage.getItem("Login_Info"));
					var client = hprose.Client.create(baseUrl, ["sale_get"]);
					client.sale_get(
						logininfos.body.custcert,
						logininfos.usercode,
						args[0].billid,
						args[0].dtlid
					).then(function(result) {
						var goodsDetail = jQuery.parseJSON(result).body;
						$('.listNumber').html(goodsDetail[0].billno);
						$('.imgNum').attr('src', args[0].img_url);
						$('.goodsNum').html(goodsDetail[0].item_name);
						$('.goodsSort').html(goodsDetail[0].class_name);
						$('.togalPrice').html(goodsDetail[0].price);
						$('.receivable').html(goodsDetail[0].orgprice);
						$('.net_receipts').html(goodsDetail[0].sale);
						$('.number').html(goodsDetail[0].amount);
						$('.discount').html(goodsDetail[0].discount);
						$('.specifications').html(goodsDetail[0].attr2);
						$('.Consumption_type').html();
						$('.dataTime').html(goodsDetail[0].billtime);
						$('.salePeople').html(goodsDetail[0].seller);
						$('.remark-information').html(goodsDetail[0].notes);
					}, function(err) {
						alert(err);
					});
				}
			});
		} else if(add.eq(gindex).hasClass('more') === true) {
			var str = '';
			var insertStr = '';
			var beforeStr = '';
			var mIndex = $('.more').index(this);
			beforeStr = $('.more').closest('.first').html();
			var tempArr = [];
			goodsDetail = arr[mIndex];
			if(flagBtn) {
				moreGoods.slideDown();
				flagBtn = false;
				num = 1;
				$('.more').eq(gindex).removeClass('add');
				str+= "<div class='goods-list left clear '><p class='left'>本次消费数据合计：</p><i class='left'>多笔</i></div><span class='more clickSpan moreGoods addStyle glyphicon glyphicon-chevron-down'></span>";
				$('tr').eq(gindex+1).addClass('colorStyle');
				$('#table .colorStyle:last').css({'borderTop':'1px solid #f76e4b'})
				$('tr .first').eq(gindex+1).html(str);
				for(var i = 0; i<goodsDetail.length;i++){
					insertStr +='<tr class="more-goods"><td class="first " style=""><div class="goods-list left"><dl class="clear"><dt class="left"><img src="'+imgSrc+'" width="30" height="30" alt="裤子"></dt><dd class="left"><p>'+goodsDetail[i].item_name+'</p><p><span>'+goodsDetail[i].class_name+'</span><span>'+goodsDetail[i].subclass_name+'</span></p></dd></dl></div><span class="add right clickSpan"></span></td><td style=""><i style="color: red">'+goodsDetail[i].sale+'</i></td><td style=""></td><td style="">'+goodsDetail[i].amount+'</td><td style=""></td><td style=""></td><td style=""><b></b></td><td style=""></td><td class="last" style="">'+goodsDetail[i].status+'</td></tr>';
				}
				$('tr').eq(gindex+1).after(insertStr);
				$('#table .colorStyle:first td').css({'borderTop':'1px solid #f76e4b'});
				$('#table .more-goods:last td').css({'borderBottom':'1px solid #f76e4b'});
			} else {
				flagBtn = true;
				$('.more').eq(mIndex).addClass('add');
				$('.more').eq(mIndex).removeClass('addStyle glyphicon glyphicon-chevron-down');
				$('#table .colorStyle:first td').css({'borderTop':'1px solid #eee'});
				$('tr').eq(gindex+1).removeClass('colorStyle');
				$('.more').closest('.first').eq(mIndex).html(tempStr[mIndex]);
				var a = $('tr').eq(gindex+1);
				console.log(a);
				$('.more-goods').slideUp(100);
			}
		}
	})
})

/**
	 * 查询销售信息列表
	 */
	function querySales(number, size) {
		var logininfos = jQuery.parseJSON(localStorage.getItem("Login_Info"));
		var client = hprose.Client.create(logininfos.body.url, ["sales_get"]);
		var s = {
			"time_cond": "3"
		};
		console.log(JSON.stringify(s));
		client.sales_get(
			logininfos.body.custcert,
			logininfos.usercode,
			logininfos.shopid,
			size,
			number,
			1,
			JSON.stringify(s)
		).then(function(result) {
			data = jQuery.parseJSON(result).body;
			$('#table').bootstrapTable('load', data);
		}, function(err) {});
	}

var numID      = 0;
var iNum       = 3;
var payType    = null; 
var costType   = null;
function onChange(goodsID,dataID,paystyle,coststyle){
	var jsonStr = '';
	var boddsNum = null;
	if(goodsID == 0){
		boddsNum = goodsID;
	}else{
		boddsNum = goodsID;
	}
	var jsonStr = JSON.parse('{"num_iid":'+boddsNum+',"time_cond":'+dataID+',"paytype":"'+paystyle+'","sale_type":"'+coststyle+'"}');
	console.log(JSON.stringify(jsonStr))
	var logininfos = jQuery.parseJSON(localStorage.getItem("Login_Info"));
	var client = hprose.Client.create(logininfos.body.url, ["sales_get"]);
	client.sales_get(
		logininfos.body.custcert,
		logininfos.usercode,
		logininfos.shopid,
		10,
		1,
		0,
		JSON.stringify(jsonStr)
	).then(function(result) {
		data = jQuery.parseJSON(result).body;
		console.log(data);
		$('#table').bootstrapTable('load', data);
	}, function(err) {});
}


	var arr = [];
	var tempStr = [];
	var imgSrc = '';
function imgformatter(value, row, index) {
	if(row.is_more === '0') {
		return "<div class='goods-list left'><dl class='clear'><dt class='left'><img src='" + row.thumb_url + "' width=\"30\" height=\"30\" alt='" + row.class_name + "' /></dt><dd class='left'><p>" + row.item_name + "</p><p><span>" + row.class_name + "</span><span>" + row.subclass_name + "</span></p></dd></dl></div><span class='add right clickSpan'></span>"
	} else {
			goodsDetail = row.order_dtl;
			arr.push(goodsDetail);
			imgSrc = row.thumb_url;
			var moreStr = "<div class='goods-list more_list left clear'><dl class='clear left'><dt class='left'><img src='" + row.thumb_url + "' width=\"30\" height=\"30\" alt='" + row.class_name + "' /></dt><dd class='left'><p>" + row.item_name + "</p><p><span>" + row.class_name + "</span><span>" + row.subclass_name + "</span></p></dd></dl><i class='left'>多笔</i></div><span class='add right more clickSpan'></span>"
			tempStr.push(moreStr);
		return moreStr;
	}
}

function priceFormatter(value, row) {
	var color = 'red';
	return '<i style="color: ' + color + '">' + value.substring(1) + '</i>';
}

function paymentMethod(value, row) {
	if(row.paytype == 'XJ') {
		row.paytype = "现金"
		return "<b>" + row.paytype + "</b>"
	}
	if(row.paytype == 'WX') {
		row.paytype = "微信"
		return "<b>" + row.paytype + "</b>"
	}
	if(row.paytype == 'ZFB') {
		row.paytype = "支付宝"
		return "<b>" + row.paytype + "</b>"
	}
	if(row.paytype == 'YLK') {
		row.paytype = "银行卡"
		return "<b>" + row.paytype + "</b>"
	}
	/*var arr = [WX,XJ,YHK,CZK,JCK,QK,ZFB,GD];
	var arr1 = ['微信','现金','银行卡','储值卡','计次卡','欠款','支付宝','挂单'];
	console.log(arr.length);
	for(var i=0, arrLength = arr.length;i<arrLength;i++){
		if(row.paytype == arr[i]){
			row.paytype = arr1[i];
			return "<b>"+row.paytype+"</b>"
		}
	}*/
}



