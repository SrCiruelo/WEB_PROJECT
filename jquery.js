function display_menu(target_id){
    console.log(target_id);
    $("#html_container").css("display", "flex");
    $('#display').animate({
        margin: '0 0 0 0'
    });
    $('#menu *').animate({
        left: '0'
    });
}
function hide_menu(){
    $('#display').animate({
        margin: '400% 0 0 0'
    });
    $('#menu *').animate({
        left: '400%'
    });
}


/*$( ".small_container .inactive" ).click(function() {
    $(".active").removeClass("active").addClass("inactive");
    var my_id = "div[id=" + $(this).attr("id") + "]";
    console.log(my_id);
    $(my_id).removeClass( "inactive" ).addClass( "active" );

});
$( document ).ready(function() {
    $("div[id=aboutus]").removeClass( "inactive" ).addClass("active");
});*/