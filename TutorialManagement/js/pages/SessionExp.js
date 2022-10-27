
$(document).ready(function () {

    $("#SessionExpirePopUp").dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        close: function (event, ui) {

        },
        open: function (event, ui) {
            alert("Your current session has expired");
            $('#txtpwd').val('');
            var username = $('#txtuser').val()
            $('#txtusername').val(username);
            $("#sessionexpirepopup").dialog("option", "closeonescape", false);
        },
    });
    var timeout = $('#sessionTimeOut').val();
    // setInterval(KeepSessionAlive, 02 * 60 * 1000);
   
    setInterval(function () {
        //alert('interval')
        $("#SessionExpirePopUp").dialog('open');
        
        //OpenSessionModal();
    }, 15 * 60 * 1000);


    function OpenSessionModal() {
        alert('Opening'); 
      
            $('#SessionModal').modal({
                /*backdrop: 'static',*/
                keyboard: true
            }, 'show');

      
    }



    $("#btnSubmitPassword").click(function () {
        if ($('#txtPwd').val() == '') {
            $('#error_message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">x</button>Enter Password</div>');
        }
        else {
            $.ajax({
                url: ROOT + "Account/ResetSession",
                data: JSON.stringify({ Password: $("#txtPwd").val() }),
                contentType: 'application/json',
                type: "POST",
                success: function (data) {
                    if (data == "") {
                        $("#SessionExpirePopUp").dialog('close');
                    }
                    else if (data == "-1") {
                        $('#error_message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">x</button>Invalid Password</div>');
                    }

                    else {
                        $('#error_message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">x</button>Unable to get the details</div>');
                    }
                },
                error: function () {
                }
            });
        }
    });

    $('#SessionExpirePopUp').parent().children().find('.ui-dialog-titlebar-close').click(function () {
        document.location = ROOT + "Account/Logoff";
    });
});