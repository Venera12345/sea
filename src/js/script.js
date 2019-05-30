$('.product-title').click(function(event){
    event.preventDefault();
 $('.popup').addClass('show');
 $('.background-modul').addClass('show');
});
$('.close').click(function(){
 $('.popup').removeClass('show');
 $('.background-modul').removeClass('show');
});
var arrayButton = Array.from($('.linck-foto img'));
$.each(arrayButton, function(){
    console.log('all ok');
    $(this).click(function(){
    console.log('click');
    console.log(this);
        var linckImg = $(this).attr('src');
        var srcImg = linckImg;
      
        $('.photo-full').attr('src', linckImg);
        });
});
