////////////////
// FORM VALIDATIONS
// jQuery validate plugin https://jqueryvalidation.org
////////////////

(function($, APP) {
  APP.Plugins.Validations = {
    init: function() {
      this.localize();
      this.customMethods();
      this.validateFormsConstructor();
      this.validateFormsCustom();
    },
    data: {
      // GENERIC FUNCTIONS
      validateErrorPlacement: function(error, element) {
        error.addClass('ui-input__validation');
        if (element.is('select')) {
          error.appendTo(element.closest('.selectric-wrapper'));
        } else if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
          error.appendTo(element.closest('.ui-group'));
        } else {
          error.appendTo(element.parent('div'));
        }
      },
      validateHighlight: function(element) {
        var $element = $(element);

        if ($element.is('select')) {
          $element.closest('.selectric-wrapper').addClass('has-error');
        } else {
          $(element).addClass('has-error');
        }
      },
      validateUnhighlight: function(element) {
        var $element = $(element);

        if ($element.is('select')) {
          $element.closest('.selectric-wrapper').removeClass('has-error');
        } else {
          $(element).removeClass('has-error');
        }
      },
      validateSubmitHandler: function(form) {
        $(form).addClass('loading');
        var formData = $(form).serialize();
        var sucessFunction = $(form).data('success-function');
        if (sucessFunction !== undefined) {
          var x = eval(sucessFunction);
          if (typeof x == 'function') {
            x(formData);
          }
        }
      },
      masks: {
        phone: {
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
        },
      },
    },
    customMethods: function() {
      $.validator.addMethod(
        'laxEmail',
        function(value, element) {
          // allow any non-whitespace characters as the host part
          return (
            this.optional(element) ||
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            )
          );
        },
        'Email format must be like name@site.com'
      );
    },
    localize: function() {
      /*
       * Translated default messages for the jQuery validation plugin.
       * Locale: RU (Russian; русский язык)
       */
      $.extend($.validator.messages, {
        required: 'Это поле необходимо заполнить.',
        remote: 'Пожалуйста, введите правильное значение.',
        email: 'Пожалуйста, введите корректный адрес электронной почты.',
        url: 'Пожалуйста, введите корректный URL.',
        date: 'Пожалуйста, введите корректную дату.',
        dateISO: 'Пожалуйста, введите корректную дату в формате ISO.',
        number: 'Пожалуйста, введите число.',
        digits: 'Пожалуйста, вводите только цифры.',
        creditcard: 'Пожалуйста, введите правильный номер кредитной карты.',
        equalTo: 'Пожалуйста, введите такое же значение ещё раз.',
        extension: 'Пожалуйста, выберите файл с правильным расширением.',
        maxlength: $.validator.format('Пожалуйста, введите не больше {0} символов.'),
        minlength: $.validator.format('Пожалуйста, введите не меньше {0} символов.'),
        rangelength: $.validator.format(
          'Пожалуйста, введите значение длиной от {0} до {1} символов.'
        ),
        range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'),
        max: $.validator.format('Пожалуйста, введите число, меньшее или равное {0}.'),
        min: $.validator.format('Пожалуйста, введите число, большее или равное {0}.'),
      });
    },
    validateFormsConstructor: function() {
      var _this = this;

      var $forms = $('.js-validate-form:not(.is-validation-attached)');
      if ($forms.length === 0) return;
      // CONSTRUCTOR LIKE FIRST
      $forms.each(function(i, form) {
        var $form = $(form);

        var validationOptions = {
          errorPlacement: _this.data.validateErrorPlacement,
          highlight: _this.data.validateHighlight,
          unhighlight: _this.data.validateUnhighlight,
          submitHandler: _this.data.validateSubmitHandler,
          // rules to be set in html as well (merged props)
          rules: {
            email: {
              required: true,
              email: true,
              laxEmail: true,
            },
            phone: _this.data.masks.phone,
          },
          messages: {
            email: {
              required: 'Please enter email',
              email: 'Email format must be like name@site.com',
            },
            phone: {
              minlength: 'Phome form is invalid',
            },
          },
        };

        $form.validate(validationOptions);

        $form.addClass('is-validation-attached');
      });
    },
    validateFormsCustom: function() {
      var _this = this;
      var requestValidationObject = {
        errorPlacement: _this.data.validateErrorPlacement,
        highlight: _this.data.validateHighlight,
        unhighlight: _this.data.validateUnhighlight,
        submitHandler: _this.data.validateSubmitHandler,
        rules: {
          phone: _this.data.masks.phone,
        },
        messages: {
          phone: {
            required: 'Заполните это поле',
            minlength: 'Введите корректный телефон',
          },
        },
      };

      // call/init
      $('[js-validate-request]').validate(requestValidationObject);
      // $("[js-subscription-validation-footer]").validate(subscriptionValidationObject);
      // $("[js-subscription-validation-menu]").validate(subscriptionValidationObject);
    },
  };
})(jQuery, window.APP);

// - Допступные варианты валидации через html теги (`type`)

// required: 'Это поле необходимо заполнить.', // тег required
// remote: 'Пожалуйста, введите правильное значение.', // валидация через запрос к API
// email: 'Пожалуйста, введите корректный адрес электронной почты.', // type="email"
// url: 'Пожалуйста, введите корректный URL.', // type="url"
// date: 'Пожалуйста, введите корректную дату.', // type="date"
// dateISO: 'Пожалуйста, введите корректную дату в формате ISO.', // type="dateISO"
// number: 'Пожалуйста, введите число.', // type="number"
// digits: 'Пожалуйста, вводите только цифры.', // type="digits"
// // creditcard: 'Пожалуйста, введите правильный номер кредитной карты.', // тег creditcard - нужно подключение отдельного плагина
// equalTo: 'Пожалуйста, введите такое же значение ещё раз.', // equalTo="xxx"
// // extension: 'Пожалуйста, выберите файл с правильным расширением.', // extension="zip" - нужно подключение отдельного плагина
// maxlength: $.validator.format('Пожалуйста, введите не больше {0} символов.'), // maxlength="10"
// minlength: $.validator.format('Пожалуйста, введите не меньше {0} символов.'), // minlength="2"
// rangelength: $.validator.format(
// 	'Пожалуйста, введите значение длиной от {0} до {1} символов.',
// ), // rangelength="[2, 6]"
// range: $.validator.format('Пожалуйста, введите число от {0} до {1}.'), // range="[2,6]"
// max: $.validator.format('Пожалуйста, введите число, меньшее или равное {0}.'), // max="10"
// min: $.validator.format('Пожалуйста, введите число, большее или равное {0}.'), // min="2
