  
$(function(){
  //购物车
   var eachQuantity = $('.eachQuantity');
   var selectNum    = $('.selectNum');
   var carBg        = $('.carBg');
   var numBtn       = $('.numBtn');
   // 点击消失
   eachQuantity.on('touchstart',function(){
      var e = (event) ? event : window.event;
      window.event ? e.stopPropagation() : e.cancelBubble = true;
     selectNum.css({display:'block'});
     carBg.css({display:'block'});
   }) 
  numBtn.on('touchstart',function(){
     selectNum.css({display:'none'});
     carBg.css({display:'none'});
   }) 
  selectNum.on('touchstart',function(event){
       var e = (event) ? event : window.event;
      window.event ? e.stopPropagation() : e.cancelBubble = true;
  })
  $(document).on('touchstart',function() {
      selectNum.css({display:'none'});
      carBg.css({display:'none'});
  })
})