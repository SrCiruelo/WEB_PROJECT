var last_display_id = 0;
function display_menu(target_id){
    $("#"+target_id).css("display","flex");
    if(last_display_id!=0)$("#"+ last_display_id).css("display","none");
    last_display_id = target_id;
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
