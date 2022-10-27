var Common = function () {  
    return {
        init: function () {
            var form = $('form')
                 , formData = $.data(form[0])
                 , settings = formData.validator.settings
                  // Store existing event handlers in local variables
                 , oldErrorPlacement = settings.errorPlacement
                 , oldSuccess = settings.success;

                settings.errorPlacement = function (label, element) {                  
                // Call old handler so it can update the HTML
                oldErrorPlacement(label, element);

                // Add Bootstrap classes to newly added elements
                label.parents('.form-group').addClass('bv-col-error');
                label.closest(".bv-col-error").addClass('help-block animation-slideDown')
            };

            settings.success = function (label) {
                // Remove error class from <div class="form-group">
               
            	label.parents('.bv-col-error').removeClass('bv-col-error');
            	
                    //$('.btn.btn-primary').css({ 'background-color': 'white', 'color': '#000 ', 'width': '549px' });
                    $('ul.multiselect-container.dropdown-menu').css({ 'background-color': '#fff', 'color ': '#000 !important', 'width': '100%' });
                    $('.btn-group.open').css({ 'width': '100%', 'color': '#000 !important' });
                    $('.btn-group.button').css({ 'width': '100%', 'color': '#000 !important' });
                   // $('.btn-primary.btn-primary:focus').css({'color':'#000 !important'});
            	
                // Call old handler to do rest of the work
            	oldSuccess(label);
            	label.parents('.form-group').addClass('bv-tab-success');
            };
        }
    };
}();