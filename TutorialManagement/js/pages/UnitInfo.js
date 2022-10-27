$('#TrackingDeviceId').change(function () {
    var imei = $('#imeino option:selected').text().split("");
    var imei1 = imei[0];
    if (imei1 == '--Select--') {
        $("#simno").text("SIMNo");
        $("#deviceno").text("DeviceType");

    }
    //else if(imei==undefined)
    //{

    //}
    //else {
    //    imei= $('#imeino option:selected').val().split("-");
    //    imei1 = imei[0];
    //}
    //var imeiid = imei[1];
    $('#IMEINo').val($('#TrackingDeviceId option:selected').text());



    //GetValues(imeiid);
    //GetDevice(imeiid);$(this).text()
    //GetValues($(this).text());
    //GetValues($(this).text());

    GetValues($('#TrackingDeviceId option:selected').text());
    GetDevice($('#TrackingDeviceId option:selected').text());


});


function GetValues(imeiid) {

    if (imeiid == "" || imeiid == "-1") {

    }
    else {
        //var imei = $('#imeino option:selected').text().split("");
        if (imeiid != '--Select--' && imeiid != '-' && imeiid != undefined) {
            imei = imeiid.split("-");
            imeiid = imei[0];
        }

        $.ajax({
            url: ROOT + "UnitInfo/GetValues",
            type: 'POST',
            data: { imeiid: imeiid },
            dataType: 'json',
            traditional: true,

            success: function (data) {

                var options = $('#simno');
                var options1 = $('#simno1');
                $.each(data, function () {
                    options.text(this.SIMNo);
                    options1.val(this.SIMNo);
                });

            },
            error: function () {
            }
        });
    }

}
function GetDevice(imeiid) {

    if (imeiid == "" || imeiid == "-1") {

    }
    else {
        if (imeiid != '--Select--' && imeiid != '-' && imeiid != undefined) {
            imei = imeiid.split("-");
            imeiid = imei[0];
        }
        $.ajax({
            url: ROOT + "UnitInfo/GetDevice",
            type: 'POST',
            data: { imeiid: imeiid },
            dataType: 'json',
            traditional: true,
            success: function (data) {




                var options = $('#deviceno');
                var options1 = $('#deviceno1');
                $.each(data, function () {
                    options.text(this.DeviceName);
                    //options1.val(this.Deviceid);
                    $('#deviceno1').val(data[0].DeviceName);
                });

            },
            error: function () {
            }
        });
    }

}

$("#status").change(function () {
    var type = $("#status option:selected").text();
    if (type == 'Active') {
        $("#AD").show();
        $("#SD").hide();
        $("#SuspendedDate").val("");

    }
    else if (type == 'Inactive') {
        $("#AD").hide();
        $("#ActiveDate").val("");
        $("#SD").hide();
        $("#SuspendedDate").val("");
    }
    else if (type == 'Demo') {
        $("#AD").hide();
        $("#ActiveDate").val("");
        $("#SD").hide();
        $("#SuspendedDate").val("");
    }
    else if (type == 'Suspended') {
        $("#AD").hide();
        $("#SD").show();
        $("#ActiveDate").val("");

    }
});


var res = true;
//$('#PlateNo').on('input', function () {
//    $("#error-PlateNo").hide();
//});
//$("#VehicleGroup").change(function () {
//    $("#error-VehicleGroup").hide();
//});
//$("#imeino").change(function () {
//    $("#error-imeino").hide();
//});
//$("#status").change(function () {
//    $("#error-Status").hide();
//});
//$("#InstallationDate").on('input', function () {
//    $("#error-Status").hide();
//});
//$("#FuelTankSize").on('input', function () {
//    $("#error-FuelTankSize").hide();
//});

$("#btnnext").click(function () {

    HideErrorMessages();

    var asds = $('.active .tab1').text().trim();
    if (asds == 'Unit Info') {
        if (($("#PlateNo").val() == null) || $("#PlateNo").val() == '') {
            $("#error-PlateNo").show().text().toUpperCase();
            //$('.fa-lg fa fa-check-square-o').hide();
            res = false;
        }
        else if ($('#VehicleType option:selected').text() == '--Select--' || $('#VehicleType option:selected').text() == '') {

            $("#error-VehicleType").show().text().toUpperCase();
            res = false;
        }
        else if ($('#FuelType option:selected').text() == '--Select--' || $('#FuelType option:selected').text() == '') {

            $("#error-FuelType").show().text().toUpperCase();
            res = false;
        }
        else if ($('#VehicleGroup option:selected').text() == '--Select--' || $('#VehicleGroup option:selected').text() == '') {

            $("#error-VehicleGroup").show().text().toUpperCase();
            //$('.fa-lg fa fa-check-square-o').hide();
            res = false;
        }
        else
            if ($('#TrackingDeviceId option:selected').text() == '--Select--' || $('#TrackingDeviceId option:selected').text() == '') {

                $("#error-imeino").show().text().toUpperCase();
                // $('.fa-lg fa fa-check-square-o').hide();
                res = false;
            }
            else

                if ($('#StatusID option:selected').text() == '--Select--' || $('#StatusID option:selected').text() == '') {

                    $("#error-StatusID").show().text().toUpperCase();
                    //$('.fa-lg fa fa-check-square-o').hide();
                    res = false;
                } else if ($('#StatusID option:selected').text() != '--Select--' || $('#StatusID option:selected').text() != '') {
                    //$('.fa-lg fa fa-check-square-o').show();
                    res = true;

                }
                else if ($('#StatusID option:selected').text() == "Active" && $('#ActiveDate').val() == '') {
                    $("#AD").show();
                    $("#error-ActiveDate").show();
                    // $('.fa-lg fa fa-check-square-o').hide();
                    res = false;
                }
                else if ($('#StatusID option:selected').text() == "Suspended" && $('#SuspendedDate').val() == '') {
                    $("#SD").show();
                    $("#error-SuspendedDate").show();
                    // $('.fa-lg fa fa-check-square-o').hide();
                    res = false;
                }
                    //else if ($('#status option:selected').text() == 'Active' || $('#ActiveDate option:selected').text() != '') {
                    //   // $("#AD").show();
                    //  //  $("#error-ActiveDate").show();
                    //    res = false;
                    //}
                else {

                    res = true;
                }
        $('input[name^="fileupload"]').each(function () {
            $(this).rules('add', {
                required: true,
                accept: "image/jpeg, image/png, image/gif"
            })
        })
        ControlButtons(res);
    }
    var asds1 = $('.active .tab2').text().trim();
    if (asds1 == 'Unit Configuration') {
        if (($('#FuelSensor').is(':checked')) && $("#FuelTankSize").val() == '') {
            $("#error-FuelTankSize").show();
            //$('.fa-lg fa fa-check-square-o field-validation-valid').hide();
            res = false;
        }


        else
            if (($('#FuelSensor').is(':unchecked')) && $("#FuelTankSize").val() != '') {
                $("#FuelTankSize").val("");
                res = true;
            }
            else
                if (($('#FuelSensor').is(':checked')) && $("#FuelTankSize").val() != '') {

                    res = true;
                }

        ControlButtons(res);

    }
});
$("#btnsubmit").click(function () {
    HideErrorMessages();
    var asds2 = $('.active .tab5').text().trim();
    if (asds2 == 'Installation Info') {
        if (($("#InstallationDate").val() == null) || $("#InstallationDate").val() == '') {
            $("#error-InstallationDate").show();

            return false;
        }
        else {

            res = true;
        }
        ControlButtons(res);
    }
});
function HideErrorMessages() {

    $("#error-PlateNo").hide();
    $("#error-VehicleType").hide();
    $("#error-FuelType").hide();
    $("#error-VehicleGroup").hide();
    $("#error-imeino").hide();
    $("#error-StatusID").hide();
    $("#error-SuspendedDate").hide();

    $("#error-Status").hide();
    $("#error-ActiveDate").hide();
    $("#error-FuelTankSize").hide();
    $("#error-InstallationDate").hide();
    //$("span.text-danger").hide();

}

function ControlButtons(res) {


    if (res == false) {


        $('.tab1').valid();
        $('.tab2').valid();
        $('.tab5').valid();
    }
    else {
        return false;
    }
}


$('#FuelSensor').click(function () {
    var thisCheck = $('#FuelSensor');
    if (thischeck.is(':checked')) {
        $('#FuelTankSize').prop('disabled', true);
    } else {
        $('#FuelTankSize').prop('disabled', false);
    }
});

//---Multiselect js for input--//

$('#UnitIOConfig_0_InputOnInput').multiselect({
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


$('#UnitIOConfig_0__InputOffInput').multiselect({
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

$('#UnitIOConfig_0__OutputOnInput').multiselect({
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

$('#UnitIOConfig_0__OutputOffInput').multiselect({
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


//--Input/output2--//
$('#UnitIOConfig_1__InputOnInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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


$('#UnitIOConfig_1__InputOffInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_1__OutputOnInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_1__OutputOffInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

//----Input/output3---//
$('#UnitIOConfig_2__InputOnInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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


$('#UnitIOConfig_2__InputOffInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_2__OutputOnInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_2__OutputOffInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

//---Input/output4---/
$('#UnitIOConfig_3__InputOnInput').multiselect({
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


$('#UnitIOConfig_3__InputOffInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_3__OutputOnInput').multiselect({
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

$('#UnitIOConfig_3__OutputOffInput').multiselect({
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

//--Input/output5---//
$('#UnitIOConfig_4__InputOnInput').multiselect({
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


$('#UnitIOConfig_4__InputOffInput').multiselect({
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

$('#UnitIOConfig_4__OutputOnInput').multiselect({
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

$('#UnitIOConfig_4__OutputOffInput').multiselect({
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

//------Input/Output 6-----//
$('#UnitIOConfig_5__InputOnInput').multiselect({
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


$('#UnitIOConfig_5__InputOffInput').multiselect({
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

$('#UnitIOConfig_5__OutputOnInput').multiselect({
    enableClickableOptGroups: true,
    checkboxName: 'myCheckbox',
    buttonClass: 'btn btn-primary',
    nonSelectedText: 'Select an option!',
    includeSelectAllOption: true,
    selectAllValue: '0',
    enableCaseInsensitiveFiltering: true,
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

$('#UnitIOConfig_5__OutputOffInput').multiselect({
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

//--------Input/Output 7--------//
$('#UnitIOConfig_6__InputOnInput').multiselect({
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


$('#UnitIOConfig_6__InputOffInput').multiselect({
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

$('#UnitIOConfig_6__OutputOnInput').multiselect({
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

$('#UnitIOConfig_6__OutputOffInput').multiselect({
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