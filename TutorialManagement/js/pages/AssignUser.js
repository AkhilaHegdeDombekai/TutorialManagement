$(document).ready(function () {

    $('#ddlSelectedItems').multiselect({
        enableClickableOptGroups: true,
        checkboxName: 'myCheckbox',
        buttonClass: 'btn btn-primary',
        //buttonWidth: '385px',
        nonSelectedText: 'Select an option!',
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        selectAllValue: '0',
        enableFiltering: true,
        buttonTitle: function (options, select) {
            var selected = '';
            options.each(function () {
                selected += $(this).text() + ', ';
            });
            return selected.substr(0, selected.length - 2);
        },
        onChange: function (element, checked) {
            // alert($(element).val());
        },
        label: function (element) {
            return $(element).html() + ' (' + $(element).val() + ')';
        }


    });

    $('#ddlUser').multiselect({
        enableClickableOptGroups: true,
        checkboxName: 'myCheckbox',
        buttonClass: 'btn btn-primary',       
        nonSelectedText: 'Select an option!',
        includeSelectAllOption: true,
        selectAllValue: '0',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        buttonTitle: function (options, select) {
            var selected = '';
            options.each(function () {
                selected += $(this).text() + ', ';
            });
            return selected.substr(0, selected.length - 2);
        },
        onChange: function (element, checked) {
            // alert($(element).val());
        },
        label: function (element) {
            return $(element).html() + ' (' + $(element).val() + ')';
        }


    });

    //$('#ddlUser').trigger('change');

    var _selUserId = 0;
    var _selVehId = 0;

    _selUserId = $('#ddlUser').val();

    if (_selUserId != 0) {
        //alert(_selUserId + " comes to get selected vehicles")
        GetSelectedVehicles();
    }


    // $('#MySelectedItems').multiselect('select', ['11', '32', '52']);

});




//Getting the related
function GetSelectedVehicles() {

    var _userId = $('#ddlUser').val();
    // alert(_userId);
    var url = "/AssignUser/GetSelectedVehicles/";
    $("#ddlSelectedItems").multiselect('refresh');
    $.ajax({
        url: url,
        data: { userId: _userId },
        cache: false,
        type: "POST",
        dataType: 'json',
        traditional: true,
        success: function (data) {
            var tmpArray = [];
            $.each(data, function (i, item) {
                tmpArray.push(this.VehicleId.toString());
            });

            $("#ddlSelectedItems").multiselect("clearSelection");
            //// alert(tmpArray);
            $("#ddlSelectedItems").multiselect('refresh');

            $('#ddlSelectedItems').multiselect('rebuild');// - Rebuild the plugin.
            $('#ddlSelectedItems').multiselect('enable');
            $('#ddlSelectedItems').multiselect('select', tmpArray);
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });

}



$(document).ready(function () {

    // FORM VALIDATION FEEDBACK ICONS
    // =================================================================
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }


    // FORM VALIDATION USER FORM
    // =================================================================
    $('#form-UserToVehicle').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            ddlUser: {
                validators: {
                    notEmpty: {
                        message: 'Please select a User'
                    }
                }
            },
            ddlSelectedItems: {
                validators: {
                    notEmpty: {
                        message: 'Please select atleast one vehicle'
                    }
                }
            }

        }
    })

});