$(document).ready(function () {

    // FORM VALIDATION FEEDBACK ICONS
    // =================================================================
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }

    $('#PasswordSalt').prop('disabled', true);

    $("#tipShowHide").hide();

    // FORM VALIDATION USER FORM
    // =================================================================
    $('#form-user').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            LoginId: {
                validators: {
                    notEmpty: {
                        message: 'The login Id is required'
                    },
                    stringLength: {
                        min: 7,
                        max: 10,
                        message: 'The LoginID must be more than 7 and less than 10 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'The LoginID can only consist of alphabetical, number, dot and underscore'
                    },
                    different: {
                        field: 'Password',
                        message: 'The LoginID and Password cannot be the same as each other'
                    }
                }
            },
            Password: {
                validators: {
                    notEmpty: {
                        message: 'Password is required'
                    },
                    stringLength: {
                        min: 8,
                        max: 13,
                        message: 'The  password must be more than 8 and less than 14 characters long'
                    }
                    //,
                    //identical: {
                    //    field: 'PasswordSalt',
                    //    message: 'The password and its confirm are not the same'
                    //}
                }
            },
            PasswordSalt: {
                validators: {
                    notEmpty: {
                        message: 'Confirm password is required'
                    },
                    identical: {
                        field: 'Password',
                        message: 'The password and its confirm are not the same'
                    }
                }
            },
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'User name is required'
                    },
                    regexp: {
                        regexp: /^[A-Z\s]+$/i,
                        message: 'The first name can only consist of alphabetical characters and spaces'
                    }
                }
            },
            //MobileNo1: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Mobile 1 is required'
            //        },
            //        digits: {
            //            message: 'Mobile number can contain only digits'
            //        },
            //        different: {
            //            field: 'MobileNo2',
            //            message: 'MobileNo 1 and MobileNo 2 cannot be the same as each other'
            //        },
            //        regexp: {
            //            regexp: /^\d{12}$/,
            //            message: 'Invalid Mobile Number'
            //        }
            //    }
            //},
            //MobileNo2: {
            //    validators: {
            //        digits: {
            //            message: 'Mobile number can contain only digits'
            //        },
            //        different: {
            //            field: 'MobileNo1',
            //            message: 'MobileNo 1 and MobileNo 2 cannot be the same as each other'
            //        },
            //        regexp: {
            //            regexp: /^\d{12}$/,
            //            message: 'Invalid Mobile Number'
            //        }
            //    }
            //},
            Email1: {
                validators: {
                    notEmpty: {
                        message: 'Email 1 is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    },
                    different: {
                        field: 'Email2',
                        message: 'Email 1 and Email 2 cannot be the same as each other'
                    }
                }
            },
            Email2: {
                validators: {
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    },
                    different: {
                        field: 'Email1',
                        message: 'Email 1 and Email 2 cannot be the same as each other'
                    }
                }
            }

        }
    })


    //------------------------------------------------------------------------------------------------------
    //  **************************************         Password Tip       ***************************



    $("#Password").keyup(function (e) {
        $("#password_tipper").css("display", "inline - block");
        var upperCase = new RegExp('[A-Z]');
        var lowerCase = new RegExp('[a-z]');
        var numbers = new RegExp('[0-9]');
        var specChar = new RegExp('[!@#%]');//RegExp('[_@./#&!%?$*]');
        var firstChar = new RegExp('^[a-zA-Z]');

        $("#tipShowHide").hide();
        //$("#password_tipper").empty();
        //$("#password_tipper").append('<div class="pwd-hint-title">Password Criteria</div>');
        ////var temp = 0;
        var hasSpace = $("#Password").val().indexOf(' ') >= 0;
        if (e.keyCode == 8) {
           // $('#PasswordSalt').val('');
            if ($("#Password").val().length < 8 || $("#Password").val().length > 13) {
                $("#tipShowHide").show();
                $('#PasswordSalt').prop('disabled', true);

                $("#char9").remove();
                $("#password_tipper").append("<p id='char9'> <input type='checkbox' id='inputOne' /><label for='inputOne'></label> Must be 8-14 characters long</p>");
                // $("#tipShowHide").show();
            }
            else {
                $('#PasswordSalt').prop('disabled', false);
                $('#inputOne').prop('checked', true);
                $("#char9").fadeOut(1000, function () {
                    $(this).remove();
                });
              
                //$("#tipShowHide").hide();

            }
            if ($("#Password").val().match(firstChar) == null) { //($("#create_password").val().substr(0, 1).match(/[A-Za-z]/) == null)
                $("#tipShowHide").show();

                $("#sLetter").remove();
                $("#password_tipper").append("<p id='sLetter'><input type='checkbox' id='inputTwo' /><label for='inputTwo'></label> Starts With a Letter</p>");
                // $("#tipShowHide").show();
            }
            else {
                $('#inputTwo').prop('checked', true);
                $("#sLetter").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }

            if ($(this).val().match(upperCase)) {
                $('#inputThree').prop('checked', true);
                $("#upper").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }
            else {
                $("#upper").remove();
                $("#password_tipper").append("<p id='upper'><input type='checkbox' id='inputThree' /><label for='inputThree'></label> Must Contain atleast one Uppercase Letter</p>");
                $("#tipShowHide").show();
            }

            if ($(this).val().match(lowerCase)) {
                $('#inputFour').prop('checked', true);
                $("#lower").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }
            else {
                $("#lower").remove();
                $("#password_tipper").append("<p id='lower'><input type='checkbox' id='inputFour' /><label for='inputFour'></label> Must Contain atleast one Lowercase Letter</p>");
                $("#tipShowHide").show();
            }
            if ($(this).val().match(numbers)) {
                //setTimeout(function(){
                //    $("#numbers").remove();
                //}, 1000);
                $('#inputFive').prop('checked', true);
                $("#numbers").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }
            else {
                $("#numbers").remove();
                $("#password_tipper").append("<p id='numbers'><input type='checkbox' id='inputFive' /><label for='inputFive'></label> Must Contain atleast one digit</p>");
                $("#tipShowHide").show();
            }
            if (hasSpace) {
                $("#spaceBeg").remove();
                $("#password_tipper").append("<p id='spaceBeg'><input type='checkbox' id='inputSix' /><label for='inputSix'></label> Not Start or End with Space.</p>");
                $("#tipShowHide").show();
            }
            else {
                $('#inputSix').prop('checked', true);
                $("#spaceBeg").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();
            }

            if ($(this).val().match(specChar)) {//specChar.test($(this).val())

                $('#inputSeven').prop('checked', true);
                $("#specCh").fadeOut(1000, function () {
                    $(this).remove();
                });
                ////$("#tipShowHide").hide();

            }
            else {
                $("#specCh").remove();
                $("#password_tipper").append("<p id='specCh'><input type='checkbox' id='inputSeven' /><label for='inputSeven'></label> Include a special character  (! @ # % )</p>");
                $("#tipShowHide").show();
            }
            if ($(this).val().length == 0) {
                $("#tipShowHide").show();

            }
            //if (!$.isEmptyObject($("#UserName").val())) {
            //    if ($(this).val().indexOf($("#UserName").val())) {
            //        $("#uName").remove();
            //        $("#password_tipper").append("<p id='uName'><input type='checkbox' id='inputEight' /><label for='inputEight'></label> Does Not Contain UserName</p>");
            //        $("#tipShowHide").show();
            //    }

            //    else {
            //        $('#inputEight').prop('checked', true);
            //        $("#uName").fadeOut(1000, function () {
            //            $(this).remove();
            //        });
            //    }
            //}
            //else {
            //    $('#inputEight').prop('checked', true);
            //    $("#uName").fadeOut(1000, function () {
            //        $(this).remove();
            //    });
            //}
        }

        else {
            if ($("#Password").val().length < 6 || $("#Password").val().length > 13) {
            
                $("#char9").remove();
                $("#password_tipper").append("<p id='char9'> <input type='checkbox' id='inputOne' /><label for='inputOne'></label> Must be 8-14 characters long</p>");
                $("#tipShowHide").show();
            }
            else {
             
                //$('#PasswordSalt').prop('disabled', false);
                $('#inputOne').prop('checked', true);
                $("#char9").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }


            if ($("#Password").val().match(firstChar) == null) {
                $("#sLetter").remove();
                $("#password_tipper").append("<p id='sLetter'><input type='checkbox' id='inputTwo' /><label for='inputTwo'></label> Starts With a Letter</p>");
                $("#tipShowHide").show();
            }
            else {
                $('#inputTwo').prop('checked', true);
                $("#sLetter").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }



            if ($(this).val().match(upperCase)) {
                $('#inputThree').prop('checked', true);
                $("#upper").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }
            else {
                $("#upper").remove();
                $("#password_tipper").append("<p id='upper'><input type='checkbox' id='inputThree' /><label for='inputThree'></label> Must Contain atleast one Uppercase Letter</p>");
                $("#tipShowHide").show();
            }
            if ($(this).val().match(lowerCase)) {
                $('#inputFour').prop('checked', true);
                $("#lower").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();

            }
            else {
                $("#lower").remove();
                $("#password_tipper").append("<p id='lower'><input type='checkbox' id='inputFour' /><label for='inputFour'></label>  Must Contain atleast one Lowercase Letter</p>");
                $("#tipShowHide").show();
            }
            if ($(this).val().match(numbers)) {

                //setTimeout(function () {
                //    $("#numbers").remove();
                //}, 1000);
                $('#inputFive').prop('checked', true);
                $("#numbers").fadeOut(1000, function () {
                    $(this).remove();
                });
                //$("#tipShowHide").hide();
            }
            else {
                $("#numbers").remove();
                $("#password_tipper").append("<p id='numbers'><input type='checkbox' id='inputFive' /><label for='inputFive'></label> Must Contain atleast one digit</p>");
                $("#tipShowHide").show();
            }

            if (hasSpace) {
                $("#spaceBeg").remove();
                $("#password_tipper").append("<p id='spaceBeg'><input type='checkbox' id='inputSix' /><label for='inputSix'></label> Not Start or End with Space.</p>");
                $("#tipShowHide").show();
            }
            else {
                $('#inputSix').prop('checked', true);
                $("#spaceBeg").fadeOut(1000, function () {
                    $(this).remove();
                }); //$("#tipShowHide").hide();
            }
            if ($(this).val().match(specChar)) {//specChar.test($(this).val())

                $('#inputSeven').prop('checked', true);
                $("#specCh").fadeOut(1000, function () {
                    $(this).remove();
                });
                //  //$("#tipShowHide").hide();

            }
            else {
                $("#specCh").remove();
                $("#password_tipper").append("<p id='specCh'><input type='checkbox' id='inputSeven' /><label for='inputSeven'></label> Include a special character  (! @ # % )</p>");
                $("#tipShowHide").show();
            }
            if ($(this).val().length == 0) {
                $("#tipShowHide").show();

            }
            //if ($("#UserName").val().length!=0) {
            //    if ($(this).val().toString().indexOf($("#UserName").val().toString())) {
            //        $("#uName").remove();
            //        $("#password_tipper").append("<p id='uName'><input type='checkbox' id='inputEight' /><label for='inputEight'></label> Does Not Contain UserName</p>");
            //        $("#tipShowHide").show();
            //    }

            //    else {
            //        $('#inputEight').prop('checked', true);
            //        $("#uName").fadeOut(1000, function () {
            //            $(this).remove();
            //        });
            //    }
            //}
            //else {
            //    $('#inputEight').prop('checked', true);
            //    $("#uName").fadeOut(1000, function () {
            //        $(this).remove();
            //    });
            //}
        }


        if ($("#char9").length || $("#sLetter").length || $("#upper").length || $("#lower").length || $("#numbers").length ||
            $("#spaceBeg").length || $("#specChar").length) {
            $('#PasswordSalt').prop('disabled', true);
            $('#PasswordSalt').val('');
        }
        else {
          
            $('#PasswordSalt').prop('disabled', false);

        }
    });

    //---------------------------------------  End Tip -----------------------------------------------

    $("#password_show_hide_link").click(function () {
        $("#tipShowHide").toggle();
        //$('#Password').keyup();
        if ($("#password_tipper").has('p').length == 0) {

            $("#password_tipper").append("<p id='char9'> <input type='checkbox' id='inputOne' /><label for='inputOne'></label> Must be 8-14 characters long</p>");
            $("#password_tipper").append("<p id='sLetter'><input type='checkbox' id='inputTwo' /><label for='inputTwo'></label> Starts With a Letter</p>");
            $("#password_tipper").append("<p id='upper'><input type='checkbox' id='inputThree' /><label for='inputThree'></label> Must Contain atleast one Uppercase Letter</p>");
            $("#password_tipper").append("<p id='lower'><input type='checkbox' id='inputFour' /><label for='inputFour'></label>  Must Contain atleast one Lowercase Letter</p>");
            $("#password_tipper").append("<p id='numbers'><input type='checkbox' id='inputFive' /><label for='inputFive'></label> Must Contain atleast one digit</p>");
            $("#password_tipper").append("<p id='spaceBeg'><input type='checkbox' id='inputSix' /><label for='inputSix'></label> Not Start or End with Space.</p>");
            $("#password_tipper").append("<p id='specCh'><input type='checkbox' id='inputSeven' /><label for='inputSeven'></label> Include a special character  (! @ # % )</p>");
            ///$("#password_tipper").append("<p id='uName'><input type='checkbox' id='inputEight' /><label for='inputEight'></label> Does Not Contain UserName</p>");

        }

    });
    //$('#Password').keyup();
    //$("#password_tipper").toggle();

});