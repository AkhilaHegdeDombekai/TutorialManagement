$(document).ready(function () {

    // FORM VALIDATION FEEDBACK ICONS
    // =================================================================
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }


    $('#logPreview1').hide();



    // FORM VALIDATION USER FORM
    // =================================================================
    $('#form-customer').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            CustomerName: {
                validators: {
                    notEmpty: {
                        message: 'Customer name is required'
                    },
                    regexp: {
                        regexp: /^[A-Z\s]+$/i,
                        message: 'The first name can only consist of alphabetical characters and spaces'
                    }
                }
            },
            TelNo: {
                validators: {
                    notEmpty: {
                        message: 'Telephone No is required'
                    },
                    digits: {
                        message: 'Mobile number can contain only digits'
                    }
                }
            },
            ContactPerson: {
                validators: {
                    notEmpty: {
                        message: 'Contact Person name is required'
                    },
                    regexp: {
                        regexp: /^[A-Z\s]+$/i,
                        message: 'The first name can only consist of alphabetical characters and spaces'
                    }
                }
            },
            PackageId: {
                validators: {
                    notEmpty: {
                        message: 'Package is required'
                    }
                }
            },
            SmsLimit: {
                validators: {
                    notEmpty: {
                        message: 'Sms limit is required'
                    }
                }
            },
            EmailLimit: {
                validators: {
                    notEmpty: {
                        message: 'Email limit is required'
                    }
                }
            }

        }
    })

    var fileName = $("#Logo").val().substr($("#Logo").val().lastIndexOf("/") + 1);
    $("#val").text(fileName);

    $("#txtFile").change(function () {
        var ext = $(this).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            alert('Invalid File Selection! Only .jpg or .png allowed');
            $(this).val("");

        }
        else
        readURL(this);
    });

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#logPreview1').attr('src', e.target.result);
                $('#logPreview1').show();//.css({ "display": "display" });
                $('#logPreview').hide();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


});