$(document).ready(function () {
     customerId = 0;
    
    

    $('#Statusdate').datepicker({ autoclose: true});
    $('#Statusdate').datepicker('setDate', new Date());
    $('#Statusdate').datepicker("option", "dateFormat", "dd-mm-yy");

    $('#ddlCustomer')
            .val($("#ddlCustomer").val())
            .trigger('change');
});
$("#ddlCustomer").change(function () {
    GetSelectedCustomerVehicles($(this).val());
    VehicleStatusCount($(this).val());
    $("#demo-dt-basic").DataTable().clear();
    customerId = $(this).val();
});

$("#demo-dt-basic").on('click', 'tr', function () {
    $("#PlateNo").val($(this).find("td:eq(1)").text());
    $("#UnitInfoId").val($(this).find("td:eq(0) span").attr('id'));
    
    if($(this).find("td:eq(3)").text()=="Active")
    {
        
        $("#ddlStatus").empty();
        $("#ddlStatus").append($("<option>Inactive</option>").val("9").html("Inactive"));
        $("#ddlStatus").append($("<option>Suspended</option>").val("11").html("Suspended"));
    }
    else if ($(this).find("td:eq(3)").text() == "Inactive")
    {
        $("#ddlStatus").empty();
        $("#ddlStatus").append($("<option>Active</option>").val("8").html("Active"));
        $("#ddlStatus").append($("<option>Suspended</option>").val("11").html("Suspended"));
    }
    else if ($(this).find("td:eq(3)").text() == "Demo")
    {
        $("#ddlStatus").empty();
        $("#ddlStatus").append($("<option>Active</option>").val("8").html("Active"));
        $("#ddlStatus").append($("<option>Suspended</option>").val("11").html("Suspended"));
        $("#ddlStatus").append($("<option>Inactive</option>").val("9").html("Inactive"));
    }
    else
    {
       
    }
    
});

$("#register-modal").click(function () {
    
    //alert($(this).attr('data'));
});

$("#btnsubmit").click(function () {
    
    var path = window.location.pathname;
    var pathArr = path.split("/");
    var controller = pathArr[1];
    if ($("#Reason").val() != "") {        
        $("#ErroeReason").html("");       
        var unitInfoId = $("#UnitInfoId").val();    
        var custId = $("#ddlCustomer :selected").val();

        if ($("#ddlStatus :selected").text() == "Suspended") {      
            path = "/" + controller + "/DeleteSuspendStatus/";
            
            if (confirm('Really You want to delete entire unit information,It will going to delete from server?')) {

                $.ajax({
                    type: "POST",
                    url: path,
                    data: { UnitInfoId: unitInfoId },
                    dataType: "json",
                    success: function (response) {
                        if (response == 1) {
                            $("#message").addClass('alert alert-success').html("Deleted successfully");
                           
                        } else { $("#message").addClass('alert alert-danger').html("Error.. Deletion Unsuccessfull"); }
                        location.reload();
                    },
                    failure: function () {
                        
                    }
                });
            }


            

        }
        else {           
          
            path = "/" + controller + "/InsertUpdateStatus/";            
            var yes = confirm('Are you sure want to update the unit status?');
            if (yes) {
                $.ajax({
                    type: "POST",
                    url: path,
                    data: { UnitInfoId: unitInfoId, CustomerId: custId, StatusDate: $("#Statusdate").val(), Status: $("#ddlStatus :selected").text(), Reason: $("#Reason").val() },
                    dataType: "json",
                    success: function (response) {
                        if (response == 1) { $("#message").addClass('alert alert-success').html("successfully Update");  } else { $("#message").addClass('alert alert-danger').html("Error.. Update Unsuccessfull"); }
                        
                    },
                    failure: function () {
                        $("#message").addClass('alert alert-danger').html("Error.. Update Unsuccessfull"); 
                    }
                });
            }


           
        }
    }
    else{
        $("#ErroeReason").html("Enter reason");
        return false;
    }
    
});


function GetSelectedCustomerVehicles(_CustomerId)
{
   
    var path = window.location.pathname;
    var pathArr = path.split("/");
    var controller = pathArr[1];
     path = "/" + controller + "/GetCustomerVehicles/";    

    $.ajax({
        type: "POST",
        url: path,
        data: { CustomerId: _CustomerId },
        dataType: "json",
        success: function (response) {         
            
            var result = response.map(function (item) {
                var result = [];
                result.push(item.CustomerName);
                result.push(item.PlateNo);
                result.push(item.ActiveDate);
                result.push(item.Status);
                result.push(item.UnitInfoId);
                return result;
            });
            for (var i = 0; i < result.length; i++) {
                result[i][0] = "<span id='" + result[i][4] + "'>" + result[i][0] + "</span>";
                result[i][3] = "<a href='#register-modal' data-toggle='modal' data-target='#register-modal' class='bg-blue'>" + result[i][3] + "</a>";
                result[i][4] = "<button type='button' class='btn btn-xs btn-default' id='testing'  name='button'><span hidden='hidden'>"+ result[i][4] + "</span><i class='fa fa-history'></i></button>";
                $("#demo-dt-basic").DataTable().row.add(result[i]);
               
            }
            $('#demo-dt-basic').on('draw.dt', function () {
                $("a:contains('Active')").each(function () {

                    $(this).parent().parent().css({ 'background-color': '#9cc96b', 'color': 'white' });
                });
                $("a:contains('Inactive')").each(function () {

                    $(this).parent().parent().css({ 'background-color': '#f76c51', 'color': 'white' });
                });
                $("a:contains('Demo')").each(function () {

                    $(this).parent().parent().css({ 'background-color': '#5fa2dd', 'color': 'white' });
                });
                $("a:contains('Suspended')").each(function () {

                    $(this).parent().parent().css({ 'background-color': '#ebaa4b', 'color': 'white' });
                });

            });
          
            $("#demo-dt-basic").DataTable().draw();
            
             $("a:contains('Active')").each(function () {

                $(this).parent().parent().css({ 'background-color': '#9cc96b', 'color': 'white' });
            });
            $("a:contains('Inactive')").each(function () {

                $(this).parent().parent().css({ 'background-color': '#f76c51', 'color': 'white' });
            });
            $("a:contains('Demo')").each(function () {

                $(this).parent().parent().css({ 'background-color': '#5fa2dd', 'color': 'white' });
            });
            $("a:contains('Suspended')").each(function () {

                $(this).parent().parent().css({ 'background-color': '#ebaa4b', 'color': 'white' });
            });
        },
        failure: function () {
            $("#demo-dt-basic").append(" Error when fetching data please contact administrator");
        }
    });
    
}

$('#demo-dt-basic tbody').on('click', 'button', function () {
    
    var id = $(this).closest('tr').find('span')[1].outerText;
    $("#demo-dt-basic_history").DataTable().clear();
    $("#VehicleHistory").show();
    $("#VehicleHistory").dialog({
        modal: true,
        title: 'Vehicle History',
        zIndex: -100,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        open: function (event, ui) {


            $.ajax({
                type: 'POST',
                url: '/UnitStatus/GetUnitStatusHistory/',
                dataType: 'json',
                data: { UnitInfoId: id },
                success: function (response) {
                    
                    var result = response.map(function (item) {

                        var result = [];
                        result.push(item.CustomerName);
                        result.push(item.PlateNo);
                        result.push(item.IMEINo);
                        result.push(item.Status);
                        result.push(item.ActiveDate);
                        result.push(item.Username);
                        return result;
                    });
                    for (var i = 0; i < result.length; i++) {
                       
                        $("#demo-dt-basic_history").DataTable().row.add(result[i]);

                    }


                    $("#demo-dt-basic_history").DataTable().draw();

                },
                failure: function () {
                    $("#demo-dt-basic_history").append(" Error when fetching data please contact administrator");
                }
            });
        }
    });
        
    });

    



function VehicleStatusCount(_CustomerId)
{
    var path = window.location.pathname;
    var pathArr = path.split("/");
    var controller = pathArr[1];

    path = "/" + controller + "/VehicleStatusCount/";

    var myTable = $("#demo-dt-basic").DataTable();

    $.ajax({
        type: "POST",
        url: path,
        data: { CustomerId: _CustomerId },
        dataType: "json",
        success: function (response) {
            var result = response.map(function (item) {
                
                var result = [];
                result.push(item.ActiveCount);
                result.push(item.InActiveCount);
                result.push(item.DemoCount);
                
                return result;
            });
            if (result == undefined || result == null || result.length == 0)
            {
                $("#ActiveCount").text("0");
                $("#InActiveCount").text("0");
                $("#DemoCount").text("0");
                
            }
            else{
            $("#ActiveCount").text(result[0][0]);
            $("#InActiveCount").text(result[0][1]);
            $("#DemoCount").text(result[0][2]);
            
            }
        },
        failure: function () {
            $("#demo-dt-basic").append(" Error when fetching data please contact administrator");
        }
    });

    $('#ddlCustomer').multiselect({       
        buttonClass: 'btn btn-primary',
        buttonWidth: '385px',
        nonSelectedText: 'Select an option!',
        includeSelectAllOption: true,
        selectAllValue: '0',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        label: function (element) {
            return $(element).html() + ' (' + $(element).val() + ')';
        }


    });

    
}
$("#btnClose").click(function () {
    
    $("#demo-dt-basic").DataTable().clear();
    GetSelectedCustomerVehicles(customerId);
});




