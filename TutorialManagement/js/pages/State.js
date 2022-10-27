function HideErrorMessages() {

    $("#error-CountryName").hide();
    $("#error-StateName").hide();
  
}
$("#btnnext").click(function () {

    HideErrorMessages();
   
    if (($("#Countryid").val() == 0) ) {
       
        $("#error-CountryName").show().text().toUpperCase();       
    }
    else if ($("#Countryid").val() !=0) {
       
        //$("#error-CountryName").hide();
        $("#error-CountryName").html("<i class='fa fa-check-square-o' style='color:green'></i>").show();
      
    }
    
    if($("#Statename").val()=='' || ($("#Statename").val()==null))
    {
       
        //$("#error-StateName").show().text().toUpperCase();
        $("#error-StateName").html("<i class='fa fa-times-circle fa-lg' style=color:#d82b0a;font-size:12px;>This Field Can't Be Empty </i>").show();
        
    }
    else {

        $("#error-StateName").html("<i class='fa fa-check-square-o' style='color:green'></i>").show();
       
    }
});
//function change() {

//    if (($("#Countryid").val() == 0) || ($("#Countryid").val() == ' ') || ($("#Countryid").val() == null)) {
//        $("#error-CountryName").show().text().toUpperCase();
//    }
//    else {
//        $("#error-CountryName").html("<i class='fa fa-check-square-o' style='color:green'></i>").show();
//    }

//}


