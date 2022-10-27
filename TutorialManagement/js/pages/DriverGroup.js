function HideErrorMessages() {

    $("#error-DriverGroup").hide();
}
$("#sub").click(function () {

    HideErrorMessages();

    if (($("#DriverGroup").val() == null) || $("#DriverGroup").val() == '') {
        $("#error-DriverGroup").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-DriverGroup").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});


