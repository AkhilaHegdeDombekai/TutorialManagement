
$(document).ready(function () {

    var getchkid;
    var checklistarray = [];
    var checklistarray1 = [];
    var NotificationID;
    $.ajaxSettings.traditional = true;


    $('#txtstartdate').datepicker({ dateFormat: 'yy-mm-dd' })
    $('#txtenddate').datepicker({ dateFormat: 'yy-mm-dd' })

    $('#btnsubmit').click(function () {

        if ($('#smdata').find('input[type=checkbox]:checked').length == 0) {
            alert("Please select atleast one Vehicle");
        }
        else {
            $('input[type=checkbox]').each(function () {

                if ($(this).is(':checked')) {
                    checklistarray.push($(this).attr('value'));
                    //NotificationID = $(this).attr('id');

                }

            })
            var chk22 = $('#chkAll').is(':checked');
            if (chk22) {
                checklistarray.shift();
            }

            GetSelectedMenuItems(checklistarray);
            JavascriptFunction();
        }
    });

    $('#btnsubmitspeed').click(function () {

        if ($('#smdata').find('input[type=checkbox]:checked').length == 0) {
            alert("Please select atleast one Vehicle");
        }
        else {
            $('input[type=checkbox]').each(function () {

                if ($(this).is(':checked')) {
                    checklistarray1.push($(this).attr('value'));
                    //NotificationID = $(this).attr('id');

                }

            })
            var chk22 = $('#chkAll').is(':checked');
            if (chk22) {
                checklistarray.shift();
            }

            GetSelectedSpeedcount(checklistarray1);
            JavascriptFunction();;
        }
    });


    $('#chkAll').on('click', function () {
        var checked = $(this).prop("checked");
        $('input[name="selectedMenuItems"]').prop("checked", checked);

        // GetAllCheckboxvalues();
    });


    if ($('input[name="selectedMenuItems"]:checked').length == $('input[name="selectedMenuItems"]').length) {
        $('#chkAll').prop('checked', true);
    } else {
        $('#chkAll').prop('checked', false);
    }

    $('input[name="selectedMenuItems"]').on('click', function () {
        //alert('clicked');
        if ($('input[name="selectedMenuItems"]:checked').length == $('input[name="selectedMenuItems"]').length) {
            $('#chkAll').prop('checked', true);
        } else {
            $('#chkAll').prop('checked', false);
        }
    });

    //GetSelectedMenuItems(checklistarray);

});

function JavascriptFunction() {
    var url = '@Url.Action("ImportFuelTransaction", "Equipment")';
    $("#divLoading").show();
    $.post(url, null,
            function (data) {
                // $("#PID")[0].innerHTML = data;
                $("#divLoading").hide();
                // alert(data);
            });
}

function GetSelectedMenuItems(checklistarray) {

    //var _packageId = getchkid;
    var url = "/AlertNotification/GetSelectedVehicleId/";
    //alert(_packageId);
    //if (_packageId != undefined && _packageId != null && _packageId != "") {
    $.ajax({
        url: url,
        data: { CBID: checklistarray },
        cache: false,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            document.location = "/AlertNotification/AlertIdelEvent"
            $('.alert').val(data).fadeOut(1000);

            //alert(chkvalues);
            if (_allchecked) {
                $('#chkAll').prop('checked', true);
            }

            if ($('input[name="selectedMenuItems"]:checked').length == $('input[name="selectedMenuItems"]').length) {
                $('#chkAll').prop('checked', true);
            } else {
                $('#chkAll').prop('checked', false);
            }
            document.location = '/AlertNotification/AlertIdelEvent'
            document.location = '/LiveMap/List'
        },
        error: function (reponse) {

            alert("error : " + reponse);
        }
    });


}

function GetSelectedSpeedcount(checklistarray1) {

    //var _packageId = getchkid;
    var url = "/AlertNotification/GetSelectedSpeedVehicleId/";
    //alert(_packageId);
    //if (_packageId != undefined && _packageId != null && _packageId != "") {
    $.ajax({
        url: url,
        data: { CBID: checklistarray1 },
        cache: false,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            document.location = "/AlertNotification/SpeedEvent"
            $('.alert').val(data).fadeOut(1000);

            //alert(chkvalues);
            if (_allchecked) {
                $('#chkAll').prop('checked', true);
            }

            if ($('input[name="selectedMenuItems"]:checked').length == $('input[name="selectedMenuItems"]').length) {
                $('#chkAll').prop('checked', true);
            } else {
                $('#chkAll').prop('checked', false);
            }
            document.location = '/AlertNotification/SpeedEvent'
            document.location = '/LiveMap/List'
        },
        error: function (reponse) {

            alert("error : " + reponse);
        }
    });


}

// This filter is to filter fromdate and todate in AlertIdle page
$('#btnfilter').click(function () {

    var fromdate = $('#txtstartdate').val();
    var EndDate = $('#txtenddate').val();
    if (fromdate != null && fromdate != "" || EndDate != null && EndDate != "") {
        if (fromdate != null && fromdate != "") {

            if (EndDate != null && EndDate != "") {

                //var _packageId = getchkid;
                var url = "/AlertNotification/GetFiltereddata/";

                //if (_packageId != undefined && _packageId != null && _packageId != "") {
                $.ajax({
                    url: url,
                    data: { Fromdate: fromdate, Todate: EndDate },
                    cache: false,
                    type: "POST",
                    dataType: 'json',
                    success: function (data) {
                        //document.location = "/AlertNotification/AlertIdelEvent"
                        $('.alert').val(data).fadeOut(1000);

                        // document.location = '/AlertNotification/AlertIdelEvent'           
                    },
                    error: function (reponse) {

                        alert("error : " + reponse);
                    }
                });
            }
            else {
                alert("Please select To date to proceed.");
            }
        }
        else {
            alert("Please select from date and to proceed.");
        }
    }
    else {
        alert("Please select from date and To date to proceed.");
    }
});

// This filter is to filter fromdate and todate in AlertSpeed page

$('#btnfilterspeed').click(function () {

    var fromdate = $('#txtstartdate').val();
    var EndDate = $('#txtenddate').val();

    if (fromdate != null && fromdate != "" || EndDate != null && EndDate != "") {
        if (fromdate != null && fromdate != "") {

            if (EndDate != null && EndDate != "") {
                //var _packageId = getchkid;
                var url = "/AlertNotification/GetFiltereddataforSpeed/";

                //if (_packageId != undefined && _packageId != null && _packageId != "") {
                $.ajax({
                    url: url,
                    data: { Fromdate: fromdate, Todate: EndDate },
                    cache: false,
                    type: "POST",
                    dataType: 'json',
                    success: function (data) {
                        //document.location = "/AlertNotification/AlertIdelEvent"
                        $('.alert').val(data).fadeOut(1000);

                        // document.location = '/AlertNotification/AlertIdelEvent'           
                    },
                    error: function (reponse) {

                        alert("error : " + reponse);
                    }
                });
            }
            else {
                alert("Please select To date to proceed.");
            }
        }
        else {
            alert("Please select from date and to proceed.");
        }
    }
    else {
        alert("Please select from date and To date to proceed.");
    }
});