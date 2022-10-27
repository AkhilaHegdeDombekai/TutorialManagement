function HideErrorMessages() {

    $("#error-TripName").hide();
}
$("#sub").click(function () {

    HideErrorMessages();

    if (($("#TripName").val() == null) || $("#TripName").val() == '') {
        $("#error-TripName").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-TripName").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});
