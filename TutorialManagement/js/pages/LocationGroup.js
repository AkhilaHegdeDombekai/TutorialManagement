function HideErrorMessages() {

    $("#error-TypeName").hide();
    $("#error-GroupName").hide();
}
$("#sub").click(function () {

    HideErrorMessages();

    if (($("#TypeName").val() == null) || $("#TypeName").val() == '') {
        $("#error-TypeName").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-TypeName").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    if (($("#GroupName").val() == null) || $("#GroupName").val() == '') {
        $("#error-GroupName").show().text().toUpperCase();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
    else {
        $("#error-GroupName").hide();
        //$('.fa-lg fa fa-check-square-o').hide();
        res = false;
    }
});
