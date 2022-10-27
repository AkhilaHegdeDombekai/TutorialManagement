function HideErrorMessages() {

    $("#error-GeoFenceType").hide();
}
$("#sub").click(function () {

    HideErrorMessages();

    if (($("#GeoFenceType").val() == null) || $("#GeoFenceType").val() == '') {
        $("#error-GeoFenceType").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-GeoFenceType").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});


