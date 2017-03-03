/* Add titles to different portions*/
function extras() {
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
}
function viewDesc() {
  if($(".orders-head span").hasClass("fa-eye")) {
    $(".order-description").show();
    $(".sh-symbol").removeClass("fa-caret-down").addClass("fa-caret-up");
    $(".orders-head span").addClass("fa-eye-slash").removeClass("fa-eye");
  }
  else if($(".orders-head span").hasClass("fa-eye-slash")) {
    $(".order-description").hide();
    $(".sh-symbol").removeClass("fa-caret-up").addClass("fa-caret-down");
    $(".orders-head span").addClass("fa-eye").removeClass("fa-eye-slash");
  }
}
