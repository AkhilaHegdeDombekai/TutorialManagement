function HideErrorMessages() {

    $("#error-GpsDevice").hide();
}
$("#sub").click(function () {

    HideErrorMessages();

    if (($("#DeviceName").val() == null) || $("#DeviceName").val() == '') {
        $("#error-GpsDevice").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-GpsDevice").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});

