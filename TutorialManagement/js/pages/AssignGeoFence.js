 $(document).ready(function () {

        $('#ddlSelectedItems').multiselect({
            enableClickableOptGroups: true,
            checkboxName: 'myCheckbox',
            buttonClass: 'btn btn-primary',
            buttonWidth: '385px',
            nonSelectedText: 'Select an option!',
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
        var _selGeoFenceId = 0; 
        var _selVehId = 0;

        _selGeoFenceId = $('#ddlGeoFence').val();

        if (_selGeoFenceId != 0)
        {
            //alert(_selGeoFenceId + " comes to get selected vehicles")
            GetSelectedVehicles();
        }

        
        // $('#MySelectedItems').multiselect('select', ['11', '32', '52']);
      
});


//Getting the related
function GetSelectedVehicles() {

    var _GeoFenceId = $('#ddlGeoFence').val();
    var url = "/AssignGeoFence/GetSelectedVehicles/";
    $("#ddlSelectedItems").multiselect('refresh');
    $.ajax({
        url: url,
        data: { GeoFenceId: _GeoFenceId },
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
            //alert(tmpArray);
            $("#ddlSelectedItems").multiselect('refresh');
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


// FORM VALIDATION GeoFence FORM
// =================================================================
$('#form-GeoFenceToVehicle').bootstrapValidator({
    excluded: [':disabled'],
    feedbackIcons: faIcon,
    fields: {
        ddlGeoFence: {
            validators: {
                notEmpty: {
                    message: 'Please select a GeoFence'
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

    //dropdown for ddlgeofence
$('#ddlGeoFence').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
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

});

