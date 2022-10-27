$(function () {
    //bindForm(this);

    
    $.ajaxSetup({ cache: false });

    $("a[data-modal]").on("click", function (e) {

        // hide dropdown if any
        $(e.target).closest('.btn-group').children('.dropdown-toggle').dropdown('toggle');
       // alert('clicked');

        $('#myModalContent').load(this.href, function () {


            $('#myModal').modal({
                /*backdrop: 'static',*/
                keyboard: true
            }, 'show');

            bindForm(this);
        });

        return false;
    });


});

//function bindForm(dialog) {

//    $('form', dialog).submit(function () {
//        $.ajax({
//            url: this.action,
//            type: this.method,
//            data: $(this).serialize(),
//            success: function (result) {
//                if (result.success) {
//                    $('#myModal').modal('hide');
//                    //Refresh
//                    location.reload();
//                } else {
//                    $('#myModalContent').html(result);
//                    bindForm();
//                }
//            }
//        });
//        return false;
//    });
//}
$(document).ready(function () {
    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }
    $('#form-user').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            IMEINo: {

                validators: {
                    notEmpty: {
                        message: 'The IMEINo is required'
                    },
                    digits: {
                        message: 'IMEINo number can contain only digits'
                    },
                }
            },
            SIMNo: {
                    validators: {
                        
                        digits: {
                            message: 'SIMNo number can contain only digits'
                        }
                    }
                },

        }
    });
});