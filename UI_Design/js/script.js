/**
 * Created by shuttle3468 on 13/5/17.
 */
$(window).on('load', function(){
    $(".loading-screen").fadeOut("slow");
});
$(document).ready(function () {
    var scrolled = 0;
    var duration = 300;
    $(".next-up").click(function (event) {
        event.preventDefault();
        scrolled -= window.innerHeight;
        $("html, body").animate({scrollTop: 0}, duration);
        return false;
    });
    $(".next-down").click(function (event) {
        event.preventDefault();
        scrolled += window.innerHeight;
        $("html, body").animate({scrollTop: window.innerHeight}, duration);
        return false;
    });
    // Remove Box
    $(".box-container li").click(function () {
        $(this).hide(500);
    });
    //SHow Menu Data;
    $(".menu a").click(function (event) {
        event.preventDefault();
        $(this).siblings(".trn-box").addClass("shift-show");
        return false;
    });
    $(".menu .trn-box span").click(function () {
        $(this).parent().parent().removeClass("shift-show");
    });
    $(".menu .trn-box > a").click(function () {
        $(this).parent().removeClass("shift-show");
    });
});
