
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
    var UserId = 0;

    UserId = $('#ddlUser').val();

    if (UserId != 0) {
        // alert(_seleventId + " comes to get selected vehicles")
        GetAssignedEvents();
    }


    //$(":checkbox[value=0]").click(function () {
    //    if ($(":checkbox[value=0]").is(":checked", "true")) {

    //        $("input[name='myCheckbox']").prop("checked", this.checked);
    //    }
    //});



    $('#form-EventAssignUser').submit(function () {
        var options = $('#ddlSelectedItems option:selected');
        if (options.length == 0) {
            //alert('Sorry ..No Vehicle Assigned');
            $("#lblError").text('Please complete mandatory field');
            return false;
        }
    });

    //js for dropdown ddluser
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



});


//Getting the related
function GetAssignedEvents() {

    var _UserId = $('#ddlUser').val();
    //var url = "/AssignIdle/GetSelectedEventVehicles/";

    var path = window.location.pathname;
    var pathArr = path.split("/");
    var controller = pathArr[1];

    var url = "/" + controller + "/GetAssignedEvents/";
    //alert(path);

    $("#ddlSelectedItems").multiselect('refresh');
    $.ajax({
        url: url,
        data: { UserId: _UserId },
        cache: false,
        type: "POST",
        dataType: 'json',
        traditional: true,
        success: function (data) {
            var tmpArray = [];
            $.each(data, function (i, item) {
                tmpArray.push(this.ID.toString());
            });

            $("#ddlSelectedItems").multiselect("clearSelection");

            $("#ddlSelectedItems").multiselect('refresh');
            $('#ddlSelectedItems').multiselect('select', tmpArray);

        },
        error: function (reponse) {
            //alert("error : " + reponse);
        }
    });

}
