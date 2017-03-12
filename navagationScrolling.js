$(document).ready(function(){ //jQuery required!
  $('#navbarOne').click(function(){ //change navbarOne to the element that you want to be clicked
     $('html, body').animate({
        scrollTop: $("#idOfDivOne").offset().top //change idOfDivOne to the div you'd like to scroll to
    }, 1000);
  });
  $('#navbarTwo').click(function(){
     $('html, body').animate({
        scrollTop: $("#ifOfDivTwo").offset().top
    }, 1000);
  });
  $('#navbarThree').click(function(){
     $('html, body').animate({
        scrollTop: $("#idOfDivThree").offset().top
    }, 1000);
  });
  $('#navbarFour').click(function(){
     $('html, body').animate({
        scrollTop: $("#idOfDivFour").offset().top
    }, 1000);
  });
 });