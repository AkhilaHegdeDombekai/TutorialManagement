
$(document).ready(function () {

    var getchkid;
    var checklistarray = [];
    var NotificationID;
    $.ajaxSettings.traditional = true;

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
        },
        error: function (reponse) {

            alert("error : " + reponse);
        }
    });


}

