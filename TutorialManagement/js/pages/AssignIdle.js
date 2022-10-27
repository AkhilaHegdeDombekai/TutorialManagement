
$(document).ready(function () {
    $('#ddlSelectedItems').multiselect({
        enableClickableOptGroups: true,
        checkboxName: 'myCheckbox',
        buttonClass: 'btn btn-primary',
        buttonWidth: '385px',
        nonSelectedText: 'Select an option!',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
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
    var _seleventId = 0;
    var _selVehId = 0;

    _seleventId = $('#ddlEvent').val();
  
    if (_seleventId != 0) {
       // alert(_seleventId + " comes to get selected vehicles")
        GetSelectedVehicles();
    }

    
    $(":checkbox[value=0]").click(function () {
        if ($(":checkbox[value=0]").is(":checked", "true")) {

            $("input[name='myCheckbox']").prop("checked", this.checked);
        }
    });

   
   
    $('#form-EventToVehicle').submit(function () {
            var options = $('#ddlSelectedItems option:selected');
            if (options.length == 0) {
                //alert('Sorry ..No Vehicle Assigned');
                $("#lblError").text('Please complete mandatory field');
                return false;
            }
    });
    //dropdown ddlEvent
    $('#ddlEvent').multiselect({
        enableClickableOptGroups: true,
        checkboxName: 'myCheckbox',
        buttonClass: 'btn btn-primary',
        nonSelectedText: 'Select an option!',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
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


//Getting the related
function GetSelectedVehicles() {

    var _eventId = $('#ddlEvent').val();
    //var url = "/AssignIdle/GetSelectedEventVehicles/";
   // alert(_eventId);
    var path = window.location.pathname;
    var pathArr = path.split("/");
    var controller = pathArr[1];

    var url = "/" + controller + "/GetSelectedEventVehicles/";
    //alert(path);
   
    $("#ddlSelectedItems").multiselect('refresh');
    $.ajax({
        url: url,
        data: { eventId: _eventId },
        cache: false,
        type: "POST",
        dataType: 'json',
        traditional: true,
        success: function (data) {
            var tmpArray = [];
            $.each(data, function (i, item) {
                tmpArray.push(this.UnitInfoID.toString());
            });

            $("#ddlSelectedItems").multiselect("clearSelection");

            $("#ddlSelectedItems").multiselect('refresh');
            $('#ddlSelectedItems').multiselect('select', tmpArray);

        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });

}
