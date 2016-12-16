//============================================================================浏览器判断============================================//
var isHandle = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    isIE8: function () {
        return navigator.userAgent.toLowerCase().indexOf("msie 8") > -1;
    },
    isIE9: function () {
        return navigator.userAgent.toLowerCase().indexOf("msie 9") > -1;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/Win64|Windows|Win32/i) ? true : false;
    },
    any: function () {
        return (isHandle.Android() || isHandle.BlackBerry() || isHandle.iOS() || isHandle.Windows());
    },
    iPad: function () {
        return navigator.userAgent.match(/iPad/i) ? true : false;
    },
    Status: function () {
        return checkLayout();
    },
    isLess640px: function () {
        return document.documentElement.clientWidth <= this.clinetSize;
    },
    microMsg: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return (ua.match(/MicroMessenger/i) == 'micromessenger') ? true : false;
    },
    clinetSize: 640,
    isMIUI: function () {
        return navigator.userAgent.match(/MiuiBrowser/i) ? true : false;
    },
    lowerIE: function () {
        return navigator.userAgent.toLowerCase().indexOf("msie") > 0;
    },
    isMac: function () {
        return navigator.userAgent.match(/MacIntel/i) ? true : false;
    }
};

if (!isHandle.isLess640px()) {
    $("body,footer,#container").css({
        "width": 640 + "px",
        "border-left": 1 + "px solid #e6e6e6",
        "border-right": 1 + "px solid #e6e6e6",
        "margin": "0 auto"
    });
    $("#container").css("margin-bottom", "44px");

    if (isHandle.isMac || isHandle.Windows) {
        // TowDimensionCodeShow();
        window.onresize = function () {
            // TowDimensionCodeShow();
        }
    }

};

// function TowDimensionCodeShow() {
//     var rm = GetRandomNumber();
//     if (rm.length > 0) {
//         if ($(".floatTwoDimensionCode").size() < 1) {

//             var url = "http://m.i200.cn/index.aspx?rm=" + rm + "";

//             $("body").append("<div class='floatTwoDimensionCode'><img src='http://qrcode.i200.cn/api.ashx?text=" + escape(url) + "&w=10' /><p>用微信扫一扫<br>立即查看</p></div>");
//         }

//         var bodyWidth = $("body").width();
//         var bodyOffSet = $("body").offset();

//         var oLeft = bodyOffSet.left + parseInt(bodyWidth) + 10;
//         $(".floatTwoDimensionCode").css(
//             {
//                 "left": oLeft
//             });
//     }

// }


//===========================================================================手机缩放----ort.js====================================
// var adaptUILayout = (function() {
// 	var regulateScreen = (function() {
// 		var cache = {};
// 		var defSize = {
// 			width: window.screen.width,
// 			height: window.screen.height
// 		};
// 		var ver = window.navigator.appVersion;
// 		var s = window.orientation;
// 		var _ = null;

// 		var check = function(key) {
// 			return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
// 		};
// 		var add = function(name, key, size) {
// 			if (name && key)
// 				cache[name] = {
// 					key: key,
// 					size: size
// 				};
// 		};

// 		var del = function(name) {
// 			if (cache[name])
// 				delete cache[name];
// 		};
// 		var cal = function() {
// 			if (_ != null)
// 				return _;

// 			for (var name in cache) {
// 				if (check(cache[name].key)) {
// 					_ = cache[name].size;
// 					break;
// 				}
// 			}

// 			if (_ == null)
// 				_ = defSize;

// 			return _;
// 		};
// 		return {
// 			add: add,
// 			del: del,
// 			cal: cal,
// 			s: s
// 		};

// 	})();
// 	var adapt = function(uiWidth) {
// 		var deviceWidth,
// 			devicePixelRatio,
// 			targetDensitydpi,
// 			//meta,
// 			initialContent,
// 			head,
// 			viewport,
// 			ua;

// 		ua = navigator.userAgent.toLowerCase();
// 		isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;

// 		devicePixelRatio = window.devicePixelRatio;
// 		devicePixelRatio < 1.5 ? 2 : devicePixelRatio;

// 		if (window.orientation == 0 || window.orientation == 180) {
// 			$("#horizontal").hide();
// 			$("#main").show();
// 			if (regulateScreen.s != 0) {
// 				if (regulateScreen.cal().width < regulateScreen.cal().height) {
// 					deviceWidth = regulateScreen.cal().width;
// 				} else {
// 					deviceWidth = regulateScreen.cal().height;
// 				}
// 			} else {
// 				deviceWidth = regulateScreen.cal().width;
// 			}
// 		} else {
// 			$("#horizontal").show();
// 			if (regulateScreen.s != 0) {
// 				$(function() {
// 					$("#horizontal").fadeIn(100);
// 				});
// 				if (regulateScreen.cal().width > regulateScreen.cal().height) {
// 					deviceWidth = regulateScreen.cal().width;
// 				} else {
// 					deviceWidth = regulateScreen.cal().height;
// 				}
// 			} else {
// 				deviceWidth = regulateScreen.cal().height;
// 			}
// 		}

// 		if (devicePixelRatio == 2 && (deviceWidth == 320 || deviceWidth == 360 || deviceWidth == 592 || deviceWidth == 640)) {
// 			deviceWidth *= 2;
// 		};
// 		if (devicePixelRatio == 1.5 && (deviceWidth == 320)) {
// 			deviceWidth *= 2;
// 			devicePixelRatio = 2;
// 		};
// 		if (devicePixelRatio == 1.5 && (deviceWidth == 640)) {
// 			devicePixelRatio = 2;
// 		};

// 		targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
// 		initialContent = isiOS ? 'width=' + uiWidth + 'px, user-scalable=no' : 'target-densitydpi=' + targetDensitydpi + ', width=' + uiWidth + ', user-scalable=no';
// 		$("#viewport").remove();
// 		head = document.getElementsByTagName('head');
// 		viewport = document.createElement('meta');
// 		viewport.name = 'viewport';
// 		viewport.id = 'viewport';
// 		viewport.content = initialContent;
// 		if (isiOS && window.orientation != 0 && window.orientation != 180) {
// 			viewport.content = 'width=640';
// 			head.length > 0 && head[head.length - 1].appendChild(viewport);
// 		} else {
// 			head.length > 0 && head[head.length - 1].appendChild(viewport);
// 		}
// 	};
// 	return {
// 		regulateScreen: regulateScreen,
// 		adapt: adapt
// 	};
// })();

// if (isHandle.isLess640px()) {
// 	adaptUILayout.adapt(640);
// }

//=============================================================强转==============================
// function orien() {
// 	var _horiPrompt = document.createElement("div");
// 	_horiPrompt.id = "horiPrompt";
// 	document.body.appendChild(_horiPrompt);
// 	this.initialize();
// }
// orien.prototype = {
// 	initialize: function() {
// 		if (isHandle.any()) {
// 			this.run();
// 		} else {
// 			$("#horiPrompt").remove();
// 		}
// 	},
// 	run: function() {
// 		if (isHandle.any() && isHandle.isLess640px()) {
// 			this.phoneHori();
// 		} else if (isHandle.iPad()) {
// 			this.iPadHori();
// 		}
// 	},
// 	iPadHori: function() {
// 		orientationchange();

// 		function orientationchange() {
// 			if (window.orientation == 0 || window.orientation == 180) {
// 				$("#horiPrompt").show();
// 			} else {
// 				$("#horiPrompt").hide();
// 			}
// 		}
// 		orientationchange
// 		window.onorientationchange = function() {
// 			orientationchange();
// 		};
// 	},
// 	phoneHori: function() {
// 		orientationchange();

// 		function orientationchange() {
// 			if (window.orientation == 0 || window.orientation == 180) {
// 				$("#horiPrompt").hide();
// 			} else {
// 				$("#horiPrompt").show();
// 			}
// 		}
// 		window.onorientationchange = function() {
// 			orientationchange();
// 		};
// 	}
// }

//=============================================================强转==============================
//