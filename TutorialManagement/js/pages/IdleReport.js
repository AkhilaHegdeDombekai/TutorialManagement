$(document).ready(function () {

    $("#btnBackDriList").click(function () {
        if ($('#form-vsrreports').valid()) {
            var baseUrl = getBaseURL();
            var ReportName = @ViewBag.ReportName;
            window.open(baseUrl + 'Reports/GPSReportViewer.aspx?R=' + ReportName + '&PlateNo=' + $('#drpPlatenid').val() + '&StartDate=' + $('#StartDate').val() + '&EndDate=' + $('#EndDate').val()
                + '&Minutes=' + $("#TotalMinutes").val(), "PopupWindow", 'width=1000,height=800px,top=150,left=250');
            return false;
        }
    });


    function getBaseURL() {
        var url = location.href;  // entire url including querystring - also: window.location.href;
        var baseURL = url.substring(0, url.indexOf('/', 50));
        return baseURL + "/";
    }
    $(function () {
        Common.init();
        $('#StartDate,#EndDate').datepicker({ dateFormat: "yy/mm/dd" }).val()

    });
});