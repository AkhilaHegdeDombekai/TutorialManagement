
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

});