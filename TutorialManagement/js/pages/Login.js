$(document).ready(function () {

    // FORM VALIDATION FEEDBACK ICONS
    // =================================================================
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }

    

    // FORM VALIDATION USER FORM
    // =================================================================
    $('#form-login').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: 'The login Id is required'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'The LoginID can only consist of alphabetical, number, dot and underscore'
                    }
                }
            },
            Password: {
                validators: {
                    notEmpty: {
                        message: 'Password is required'
                    }
                }
            }
            
        }
    })



});