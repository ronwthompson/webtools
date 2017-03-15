$(document).ready(function(){  //moves the little nav slider left and right when you scroll
  var currentScroll = 0;
  var percentScroll = 0;
  var underlineTotalWidth;
  if ($('#navCont').css('width').match(/px/g) != null) { //some people use px, some use % to define width
    underlineTotalWidth = $('#navCont').css('width').replace(/px/g,'');
  } else if ($('#navCont').css('width').match(/%/g) != null) {
    underlineTotalWidth = $('#navCont').css('width').replace(/%/g,''); //replace all instances of #navCon with the div you want the bar to travel in
  }
  var onlyUnderlined;
  if ($('#moveable').css('width').match(/px/g) != null) { //replace all instances of #moveable with the div that you want to move around with
    onlyUnderlined = $('#moveable').css('width').replace(/px/g,'');
  } else if ($('#moveable').css('width').match(/%/g) != null) {
    onlyUnderlined = $('#moveable').css('width').replace(/%/g,'');
  }

  $(window).scroll(function(){
    currentScroll = $(this).scrollTop();
    percentScroll = ((currentScroll/($(document).height()-$(window).height())));
    if ($('#navCont').css('width').match(/px/g) != null) {
      underlineTotalWidth = $('#navCont').css('width').replace(/px/g,'');
    } else if ($('#navCont').css('width').match(/%/g) != null) {
      underlineTotalWidth = $('#navCont').css('width').replace(/%/g,'');
    }
    if ($('#moveable').css('width').match(/px/g) != null) {
      onlyUnderlined = $('#moveable').css('width').replace(/px/g,'');
    } else if ($('#moveable').css('width').match(/%/g) != null) {
      onlyUnderlined = $('#moveable').css('width').replace(/%/g,'');
    }

    var moveRight = ((underlineTotalWidth - onlyUnderlined) * percentScroll) + 'px';

    $('#moveable').css('left', moveRight);
    });
});