/* Add titles to different portions*/
document.addEventListener("DOMContentLoaded", function(event){
  console.log("Hello World");
  $(".order-description").hide();
  $(".fa-envelope").attr("title","Email-Request regarding any status updates");
  $(".fa-caret-down").attr("title","Click to get details regarding current order");

  /*Display Contents of Description*/
  var toggle_desc= false;
  $(".sh-symbol").click(function(){
    //console.log($(this).parent().parent().siblings("order-description"));
    if(!toggle_desc) {
      $(this).parent().parent().siblings(".order-description").slideDown(200);
      $(this).removeClass("fa-caret-down");
      $(this).addClass("fa-caret-up");
      toggle_desc = true;
    }
    else {
      $(this).parent().parent().siblings(".order-description").slideUp(200);
      toggle_desc = false;
      $(this).removeClass("fa-caret-up");
      $(this).addClass("fa-caret-down");
    }
  });
});
