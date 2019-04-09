////////////////
// FORM VALIDATIONS
// jQuery validate plugin https://jqueryvalidation.org
////////////////

(function($, APP) {
  APP.Plugins.Validations = {
    init: function() {
      // GENERIC FUNCTIONS
      var validateErrorPlacement = function(error, element) {
        error.addClass('ui-input__validation');
        error.appendTo(element.parent('div'));
      };
      var validateHighlight = function(element) {
        $(element).addClass('has-error');
      };
      var validateUnhighlight = function(element) {
        $(element).removeClass('has-error');
      };
      var validateSubmitHandler = function(form) {
        $(form).addClass('loading');
        $.ajax({
          type: 'POST',
          url: $(form).attr('action'),
          data: $(form).serialize(),
          success: function(response) {
            $(form).removeClass('loading');
            var data = $.parseJSON(response);
            if (data.status === 'success') {
              // do something I can't test
            } else {
              $(form)
                .find('[data-error]')
                .html(data.message)
                .show();
            }
          },
        });
      };

      var validatePhone = {
        required: true,
        normalizer: function(value) {
          var PHONE_MASK = '+X (XXX) XXX-XXXX';
          if (!value || value === PHONE_MASK) {
            return value;
          } else {
            return value.replace(/[^\d]/g, '');
          }
        },
        minlength: 11,
        digits: true,
      };

      /////////////////////
      // REGISTRATION FORM
      ////////////////////
      $('.js-registration-form').validate({
        errorPlacement: validateErrorPlacement,
        highlight: validateHighlight,
        unhighlight: validateUnhighlight,
        submitHandler: validateSubmitHandler,
        rules: {
          lastName: 'required',
          firstName: 'required',
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 6,
          },
          // phone: validatePhone
        },
        messages: {
          lastName: 'Заполните это поле',
          firstName: 'Заполните это поле',
          email: {
            required: 'Заполните это поле',
            email: 'Email содержит неправильный формат',
          },
          password: {
            required: 'Заполните это поле',
            email: 'Пароль мимимум 6 символов',
          },
          // phone: {
          //     required: "Заполните это поле",
          //     minlength: "Введите корректный телефон"
          // }
        },
      });

      // when multiple forms share functionality

      // var subscriptionValidationObject = {
      //   errorPlacement: validateErrorPlacement,
      //   highlight: validateHighlight,
      //   unhighlight: validateUnhighlight,
      //   submitHandler: validateSubmitHandler,
      //   rules: {
      //     email: {
      //       required: true,
      //       email: true
      //     }
      //   },
      //   messages: {
      //     email: {
      //       required: "Fill this field",
      //       email: "Email is invalid"
      //     }
      //   }
      // }

      // call/init
      // $("[js-subscription-validation]").validate(subscriptionValidationObject);
      // $("[js-subscription-validation-footer]").validate(subscriptionValidationObject);
      // $("[js-subscription-validation-menu]").validate(subscriptionValidationObject);
    },
  };
})(jQuery, window.APP);
