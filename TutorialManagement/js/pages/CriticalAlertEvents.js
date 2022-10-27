$.ajaxSettings.traditional = true;
$(document).ready(function () {

    var checklistarray = [];
    var checklistarray1 = [];
    var cnt1 = 0;
    var cnt2 = 0;
    $('#btnsubmitCritical').click(function () {
        $('input[type=text]').each(function () {
            if ($(this).val() == '') {
                cnt1 = 1;
            }
            else {
                cnt2 = 2;
                cnt2 = cnt2 + 1;
            }
        });

        if (cnt2 == 3) {
            $('input[type=text]').each(function () {
                //if ($(".txtname").val().length > 0) {
                //    if ($('input[type=text]').val() != null && $('input[type=text]').val() != "")
                //    {
                var value = $(this).val();
                if (value != "") {
                    checklistarray1.push($(this).attr('id'));
                    checklistarray.push(value);
                    //    }
                    //}
                }

            });
            GetEnteredtext(checklistarray, checklistarray1);
            JavascriptFunction();
        }
        else {
            alert("Please enter atleast one alert to proceed");
        }
    });
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

function GetEnteredtext(checklistarray, checklistarray1) {
    var url = "/CriticalEventAlert/GetEnteredvalueText/";
    $.ajax({
        url: url,
        data: { TEXTID: checklistarray, ID: checklistarray1 },
        type: "POST",
        cache: false,
        dataType: 'Json',
        success: function (data) {
            document.location = '/LiveMap/List'
            document.location = '/CriticalEventAlert/CriticalEventalerts';
            $('.alert').val(data).fadeOut(1000);

        },
        error: function (reponse) {

            alert("error : " + reponse);
        }

    });
}