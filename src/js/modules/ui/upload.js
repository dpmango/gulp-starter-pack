//////////
// Upload
//////////
(function ($, APP) {
  APP.Plugins.Upload = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
    },
    eventListeners: function () {
      const _this = this;
      _document
        .on('change', '.js-ui-upload', function (e) {
          const $container = $(this);
          const res = _this.handleUpload(e, $container);
          _this.setInfoPlugin(res, $container);
        })
        .on('click', '.js-upload-close', function () {
          const $container = $(this).closest('.js-ui-upload');
          _this.resetUploader($container);
        })
        .on('click', '.ui-upload.have-error', function () {
          const $container = $(this).closest('.js-ui-upload');
          _this.resetUploader($container);
        });
    },
    setFileReaderValue: function (resReader) {
      // i.e. get Image thumbnail
      console.log({ resReader: resReader });
    },
    setInfoPlugin: function (res, $container, data) {
      const $trigger = $container.find('.ui-upload__trigger');
      const $info = $container.find('.ui-upload__info');
      const $name = $info.find('.ui-upload__name');

      $trigger.hide();

      if (res.error) {
        $container.addClass('have-error');
        $name.text(res.error);
      } else {
        $container.addClass('have-file');
        $name.text(res.file.name);
      }
    },
    resetUploader: function ($container) {
      const $trigger = $container.find('.ui-upload__trigger');
      const $info = $container.find('.ui-upload__info');
      const $name = $info.find('.ui-upload__name');
      const $input = $container.find('input');
      const $btn = $container.data('upload-btn') ? $($container.data('upload-btn')) : false;

      $trigger.fadeIn();
      $container.removeClass('have-file').removeClass('have-error');
      $name.text('');
      $input.val('');
      $btn.attr('disabled', true);
    },
    handleUpload: function (e, $container) {
      const _this = this;
      const files = e.target.files;

      let res = {
        error: undefined,
        file: undefined,
      };

      let data = {
        mime: $container.data('allowed-mime'),
        maxSize: $container.data('max-size'),
        includeReader: $container.data('include-reader'),
        uploadBtn: $container.data('upload-btn'),
      };

      if (files && files[0]) {
        const file = files[0];
        res.file = file;

        // limit mime
        if (data.mime) {
          const mimeType = file.type ? file.type.split('/')[0] : undefined;

          if (data.mime.split(', ').indexOf(mimeType) === -1) {
            res.error = 'Неверный формат файла';
            return res;
          }
        }

        // limit size
        if (data.maxSize) {
          const bytesToMegaBytes = (bytes) => {
            if (bytes === 0) return null;
            const k = 1024;
            return Math.round((bytes / (k * k)) * 1e2) / 1e2;
          };

          const sizeInMb = bytesToMegaBytes(file.size);

          if (sizeInMb > parseInt(data.maxSize, 10)) {
            res.error = 'Файл привышает допустимый лимит';
            return res;
          }
        }

        // file reader (i.e. media)
        if (data.includeReader) {
          var reader = new FileReader();
          reader.onload = (ev) => {
            _this.setFileReaderValue(ev.target.result);
            return res;
          };
          reader.readAsDataURL(file);
        }

        // uploadBtn
        if (data.uploadBtn) {
          const $btn = $(data.uploadBtn);
          if ($btn.length > 0) {
            if (!res.error) {
              $btn.attr('disabled', false);
            } else {
              $btn.attr('disabled', true);
            }
          }
        }

        return res;
      }
    },
  };
})(jQuery, window.APP);
