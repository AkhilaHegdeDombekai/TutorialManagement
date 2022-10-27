/// <reference path="../jquery-2.1.1.min.js" />

$.ajaxSettings.traditional = true;
var s;
function popover(s) {
   
    var tr = $(this).parent();
  
    var html = "";
    var UnitInfoId = s;



    $.ajax({
        type: 'POST',
        url: '/DriverAssign/GetDriverAssignedHistoryListById/',
        dataType: 'json',
        data: { UnitInfoId: UnitInfoId },
        success: function (response) {

            var result = response.map(function (item) {
                var result = [];
                result.push(item.PlateNo);
                result.push(item.DriverName);
                result.push(item.ChangeDate);
                result.push(item.Remarks);
                return result;
            });
            for (var i = 0; i < result.length; i++) {
                $("#demo-dt-basicOver").DataTable().row.add(result[i]);
            }
            $("#demo-dt-basicOver").DataTable().draw();

            $('[data-toggle=popover]').popover({
                content: $('#myPopoverContent').html(),
                html: true
            });
           
        },
        error: function (xhr, ajaxOptions, error) {

        }
    });
    $('[data-toggle=popover]').popover({
        content: $('#myPopoverContent').html(),
        html: true
    });

    $('table > tbody > td').popover('show');
    $('table > tbody > td').not(tr).popover('hide');

  
  
}
$(document).ready(function () {
    $("#demo-dt-basic").DataTable({
        language: {
            searchPlaceholder: "Search "
        },

        "deferRender": true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "sDom": 'lfrtip'
        
    });
    //$("#demo-dt-basicOver").DataTable({
    //    language: {
    //        searchPlaceholder: "Search "
    //    }
    //});
    var last_valid_selection = null;
  
    //$("#demo-dt-basicOver").DataTable({
    //    "deferrender": true,
    //    "paging": true,
    //    "lengthchange": false,
    //    "searching": true,
    //    "ordering": true,
    //    "info": true,
    //    "autowidth": false,
    //    "sdom": 'lfrtip'
    //});
   
    $("select").change(function (e) {
        var ddlId = $(this).attr("id").replace('ddl', '');
        $("#lblErr-" + ddlId).text("");
        
    });

    $("form").each(function () {
        var that = $(this); // define context and reference

        /* for each of the submit-inputs - in each of the forms on
           the page - assign click and keypress event */
        $(".btn-primary", that).bind("click keypress", function () {
            // store the id of the submit-input on it's enclosing form
            that.data("callerid", this.id);
        });
    });
   
    $('#form-DriverAssign').submit(function (e) {
        e.preventDefault();

        /* retrieve the id of the input that was clicked, stored on
           it's enclosing form */
        var UnitInfoId = $(this).data("callerid");
     
        //var options = $('#ddl' + UnitInfoId + ' option:selected');
        //if (options[0].text == '--Select--') {
        //    $("#lblErr-" + UnitInfoId).text("Select Driver From The List");
        //    return false;
        //}
        //else {
        //    var objAssignEvent = [{

        //        DriverAllocationID: $("#txtHidden-" + UnitInfoId).val(),
        //        DriverInfoID: options.val(),
        //        UnitInfoID: UnitInfoId,
        //        Remarks: $("#txtRemarks" + UnitInfoId).val()
        //    }];
        //    $.ajax({

        //        type: 'POST',
        //        url: '/DriverAssign/Assign/',
        //        dataType: 'json',
        //        data: objAssignEvent,

        //        success: function (res) {
        //            if (res == 1)
        //                location.reload();
        //        },
        //        error: function (xhr, ajaxOptions, error) {
        //        }
        //    });

           

        var DriverName = new Array();
        $('.form-control-dropdown :selected').each(function (i, selected) {
           
            DriverName[i] = $(selected).val();
            

                });

        if (DriverName.length <= 0) {
                    alert('Please Select a Vehicle ..!');
        }
        
        var objAssignEvent = [{

            DriverAllocationID: $("#txtHidden-" + UnitInfoId).val(),
            DriverInfoID: DriverName,
                    DrivernameId: DriverName,
                    UnitInfoID: UnitInfoId,
                    Remarks: $("#txtRemarks" + UnitInfoId).val()
                }];
      

        $.ajax({

          
            url: '/DriverAssign/Assign/',
            dataType: 'json',
            data: { DriverAllocationID : $("#txtHidden-" + UnitInfoId).val() ,
                DrivernameId: DriverName,
                DriverInfoID: DriverName,
                UnitInfoIds: UnitInfoId,
            Remarks: $("#txtRemarks" + UnitInfoId).val()
        },
            type: 'POST',

                success: function (res) {
                    if (res)
                        location.reload();
                },
                error: function (xhr, ajaxOptions, error) {
                }
            });
    });
   
    $('.form-control-dropdown').change(function (event) {
        
        if ($(this).val().length > 3) {
            alert('You can only choose maximum 3!');
            $(this).val(last_valid_selection);
        
            $(this).multiselect('ddl');
            $(this).multiselect('refresh');
        
          
        }
        else
        {

            last_valid_selection = $(this).val();
        }
    });
//-----------------------------------------------------------------------------------------------------------------------------------------
    ////$('table td:nth-child(2)').mouseover(function () {
       
    ////    var tr = $(this).parent();

    ////    var html = "";  
    ////    var UnitInfoId = $(tr).attr("id").replace("tr-", "");



    ////    $.ajax({
    ////        type: 'POST',
    ////        url: '/DriverAssign/GetDriverAssignedHistoryListById/',
    ////        dataType: 'json',
    ////        data: { UnitInfoId: UnitInfoId },
    ////        success: function (response) {

    ////            var result = response.map(function (item) {
    ////                var result = [];
    ////                result.push(item.PlateNo);
    ////                result.push(item.DriverName);
    ////                result.push(item.ChangeDate);
    ////                result.push(item.Remarks);
    ////                return result;
    ////            });
                //var tmpArray = [];
                //$.each(data, function (i, item) {
                //    tmpArray.push(this.CustomerName.toString());
                //    tmpArray.push(this.PlateNo.toString());
                //    tmpArray.push(this.ActiveDate.toString());
                //    tmpArray.push(this.Status.toString());

                //});
        ////        for (var i = 0; i < result.length; i++) {
        ////            $("#demo-dt-basicOver").DataTable().row.add(result[i]);                   
        ////        }
        ////        $("#demo-dt-basicOver").DataTable().draw();

        ////        $('[data-toggle=popover]').popover({
        ////            content: $('#myPopoverContent').html(),
        ////            html: true
        ////        });

        ////    },
        ////    error: function (xhr, ajaxOptions, error) {

        ////    }
        ////});


       
        //$.ajax({
        //    type: 'POST',
        //    url: '/DriverAssign/GetDriverAssignedHistoryListById/',
        //    dataType: 'json',
        //    data: { UnitInfoId: UnitInfoId },
        //    success: function (res) {
        //        for (var i = 0; i < res.length; i++) {
        //            html = html + "<tr><td>" + res[i].PlateNo + "</td><td>" + res[i].DriverName
        //                + "</td><td>" + res[i].ChangeDate + "</td><td>" + res[i].Remarks + "</td></tr>";

        //            //historyTable.rows.add([res]);
        //            //$("#demo-dt-basicOver").DataTable({ data: res });
        //            //historyTable.row.add([res[i].PlateNo, res[i].DriverName, res[i].ChangeDate, res[i].Remarks]);
        //            //historyTable.fnAddData([res[i].PlateNo, res[i].DriverName, res[i].ChangeDate, res[i].Remarks]);
        //        }
        //        if (res.length == 0)
        //        {
        //            html = html + "<tr><td colspan=4> No Data to Display </td></tr>"
        //        }
        //       $("#demo-dt-basicOver tbody").append("");
        //        $("#demo-dt-basicOver tbody").append(html);
        //        $('[data-toggle=popover]').popover({
        //            content: $('#myPopoverContent').html(),
        //            html: true
        //        });

        //    },
        //    error: function (xhr, ajaxOptions, error) {

        //    }
        //});


        //$("#demo-dt-basicOver").dataTable({
        //    "bServerSide": true,
        //    "sAjaxSource": "/DriverAssign/GetDriverAssignedHistoryListById/?UnitInfoId=19",
        //    "sServerMethod": "POST",
        //    "fnServerParams": function (aoData) {
        //        aoData.push(
        //        { "name": "PlateNo", "value": PlateNo },
        //        { "name": "DriverName", "value": DriverName },
        //        { "name": "ChangeDate", "value": ChangeDate },
        //        { "name": "myX2name", "value": Remarks }
        //        );
        //    }
        //});


        // var historyTable= $("#demo-dt-basicOver").DataTable( {
        //    "serverSide": true,
        //    "ajax":{
        //        "type": 'POST',
        //           "url": '/DriverAssign/GetDriverAssignedHistoryListById/',
        //            "dataType": 'json',
        //            "data": { UnitInfoId: 19 },
        //            "success": function (res) {
        //                for (var i = 0; i < res.length; i++) {
        //                   // html = html + "<tr><td>" + res[i].PlateNo + "</td><td>" + res[i].DriverName
        //                 //       + "</td><td>" + res[i].ChangeDate + "</td><td>" + res[i].Remarks + "</td></tr>";

        //                    //historyTable.rows.add([res]);
        //                    //$("#demo-dt-basicOver").DataTable({ data: res });
        //                    //historyTable.row.add([res[i].PlateNo, res[i].DriverName, res[i].ChangeDate, res[i].Remarks]);
        //                    //historyTable.fnAddData([res[i].PlateNo, res[i].DriverName, res[i].ChangeDate, res[i].Remarks]);
        //                }
        //               //$("#demo-dt-basicOver tbody").append("");
        //                //$("#demo-dt-basicOver tbody").append(html);
        //                $('[data-toggle=popover]').popover({
        //                    content: $('#myPopoverContent').html(),
        //                    html: true
        //                });
        //            },
        //            "error": function (xhr, ajaxOptions, error) {

        //            }
        //        //}
        //    },
        //    "columns": [
        //       { "data": "PlateNo", "orderable": true },
        //       { "data": "DriverName", "orderable": false },
        //       { "data": "ChangeDate", "orderable": true },
        //        { "data": "Remarks", "orderable": true }
        //    ],
        //} );
   




        //historyTable.draw();
        //setTimeout(function () {
    ////    $('[data-toggle=popover]').popover({
    ////        content: $('#myPopoverContent').html(),
    ////        html: true

    ////    })

    ////    $(tr).popover('show');
    ////    $('table > tbody > tr').not(tr).popover('hide');

    ////    //}, 20);
     
    ////});
//-------------------------------------------------------------------------------------------------------------------------
    //$('table').on('mouseover', 'table td:nth-child(1)', function (e) {
    //    var tr = $(this);
    //    //var html="<div id='myPopoverContent' class='close' data-dismiss='modal'><div class='close'> <a href='#' class='btn' data-dismiss='aler'>X</a></div><table style='width:100%' table id='demo-dt-basicOver' class='table table-striped table-bordered history' cellspacing='0'>";
        
    //    var html = "";
    //    var UnitInfoId = $(tr).attr("id").replace("tr-", "");
    //    $.ajax({
    //        type: 'POST',
    //        url: '/DriverAssign/GetDriverAssignedHistoryListById/',
    //        dataType: 'json',
    //        data: { UnitInfoId: UnitInfoId },
    //        success: function (res) {
    //            for(var i=0;i<res.length;i++)
    //            {
    //                html = html + "<tr><td>" + res[i].PlateNo + "</td><td>" + res[i].DriverName
    //                    + "</td><td>" + res[i].ChangeDate + "</td><td>" + res[i].Remarks + "</td></tr>";

                    
    //            }
    //            $("#demo-dt-basicOver tbody").append("");
    //            $("#demo-dt-basicOver tbody").append(html);
    //            $('[data-toggle=popover]').popover({
    //                content: $('#myPopoverContent').html(),
    //                html: true
    //            });
                
    //        },
    //        error: function (xhr, ajaxOptions, error) {
               
    //        }
    //    });

    //    //setTimeout(function () {
    //        $('[data-toggle=popover]').popover({
    //            content:$('#myPopoverContent').html(),
    //            html: true

    //        })
          
    //        $(tr).popover('show');
    //        $('table > tbody > tr').not(tr).popover('hide');
            
    //    //}, 20);
       
    //});

  
    //function popFunction(tr) {
    //    setTimeout(function () {
    //        $('[data-toggle=popover]').popover({
    //            content: $('#myPopoverContent').html(),
    //            html: true,
    //            content: '<div class="media"><a href="#" class="pull-left"><img src="../images/avatar-tiny.jpg" class="media-object" alt="Sample Image"></a><div class="media-body"><h4 class="media-heading">Jhon Carter</h4><p>Excellent Bootstrap popover! I really love it.</p></div></div>'

    //        })

    //        $(tr).popover('show');
    //        $('table > tbody > tr').not(tr).popover('hide');
    //        popFunction(tr);
    //    },2000);
    //}

    $(document).on("click", ".close .btn", function () {
        $(this).parents(".popover").popover('hide');
    });
    $(document).on("click", ".popover-footer .btn", function () {
        $(this).parents(".popover").popover('hide');
    });
    //$('table').on('mouseleave', 'tr', function () {
    //    var tr = $(this);
    //    $(tr).popover('hide');
    //    });

    //$('[data-toggle=popover]').popover({
    //    content: $('#myPopoverContent').html(),
    //    html: true
    //}).click(function () {
    //    $(this).popover('show');
    //});dd
    

});