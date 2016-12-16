$(document).ready(function () {
  
    // 条形码
    $("#barcode").barcode("1234567890128",'ean13', { barWidth: 2, barHeight: '40px' ,displayValue: 'false',bgColor:"#dfdfdf",fontSize:'0'});  
    //返回上一级目录
    var backleave = $('.backOff');  
    console.log(backleave) 
    backleave.on('touchstart',function(){
        console.log(backleave)
       window.history.back();
    })
    $('.gTitle').click(function(){
        console.log(1);
        window.history.back();
    })
})