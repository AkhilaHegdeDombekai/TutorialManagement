function HideErrorMessages() {

    $("#error-VehicleType").hide();
    $("#error-VehicleGroup").hide();
}
$("#sub").click(function () {

    HideErrorMessages();    
    if (($("#VehicleType").val() == null) || $("#VehicleType").val() == '') {
        $("#error-VehicleType").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-VehicleType").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }

    if (($("#VehicleGroup").val() == null) || $("#VehicleGroup").val() == '') {
        $("#error-VehicleGroup").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-VehicleGroup").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});

        
        