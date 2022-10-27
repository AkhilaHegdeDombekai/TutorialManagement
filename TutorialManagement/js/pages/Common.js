var Common = function () {
    return {
        init: function () {
            var form = $('form')
                 , formData = $.data(form[0])
                 , settings = formData.validator.settings
                  // Store existing event handlers in local variables
                 , oldErrorPlacement = settings.errorPlacement
                 , oldSuccess = settings.success;

            settings.errorPlacement = function (label, element) {
                // Call old handler so it can update the HTML
                oldErrorPlacement(label, element);

                // Add Bootstrap classes to newly added elements
                label.parents('.form-group').addClass('has-error');
                label.closest(".field-validation-error").addClass('fa fa-times-circle fa-lg')
                $('.field-validation-error').css({ 'color': 'red','text-transform':'uppercase' });
            };

            settings.success = function (label) {
                // Remove error class from <div class="form-group">

                label.parents('.form-group').removeClass('has-error').closest().addClass('fa fa-check-square-o fa-lg').css({ 'color': 'green' });
                label.closest(".field-validation-error").removeClass('fa fa-times-circle has-error field-validation-error').addClass('fa fa-check-square-o fa-lg').css({ 'color': 'green' })
                //$('.multiselect dropdown-toggle btn btn-primary.btn.btn-primary').css({ 'background-color': 'white', 'color': '#000 !important', 'width': '549px' });
                //$('ul.multiselect-container.dropdown-menu').css({ 'background-color': 'white', 'color': '#000 !important', 'width': '549px' });
                // Call old handler to do rest of the work
                oldSuccess(label);
            };
        }
    };
}();

$(document).ready(function () {
    //$('.multiselect dropdown-toggle btn btn-primary.btn.btn-primary').css({ 'background-color': 'white', 'color': '#000 !important', 'width': '549px' });
    //$('ul.multiselect-container.dropdown-menu').css({ 'background-color': 'white', 'color': '#000 !important', 'width': '549px' });
    $('.btn-group').css({ 'width': '100%' });
    $('.btn-group button').css({ 'background-color': '#fff', 'width': '100%' });
    $('.multiselect').addClass('-black');


})


//Getting the related states from db based on the country Id
function GetStates(_countryId) {

    var procemessage = "<option value='0'> Please wait...</option>";
    $("#ddlStates").html(procemessage).show();
    var url = "/Agent/GetStates/";
    alert(_countryId);
    $.ajax({
        url: url,
        data: { countryId: _countryId },
        cache: false,
        type: "POST",
        dataType: 'json',
        traditional: true,
        success: function (data) {

            $('#ddlStates').children('option:not(:first)').remove();
            /*Binding Vehicles ddl*/
            var options = $('#ddlStates');
            $.each(data, function () {
                options.append($('<option />').val(this.StateId).text(this.StateName));
            });
            $("#ddlStates").val($("#ddlStates option:first").val());
            $("#ddlStates").select({ placeholder: "select", allowClear: true });


        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });

}


function FillStates() {
    var countryid = $('#ddlCountry').val();

    var procemessage = "<option value='0'> Please wait...</option>";
    $("#ddlStates").html(procemessage).show();

    //alert(countryid);
    $.ajax({
        url: '/Agent/FillStates',
        type: "GET",
        dataType: "JSON",
        data: { Countryid: countryid },
        success: function (states) {
            $("#ddlStates").html(""); // clear before appending new list
            $.each(states, function (i, state) {
                $("#ddlStates").append(
                    $('<option></option>').val(state.Stateid).html(state.Statename));
            });
        }
    });
}