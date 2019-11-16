'use strict';
(function () {
  // Форма открытие и закртытие //
  var uploadImgOverlay = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var closeFile = document.querySelector('#upload-cancel');
  // Масштабирование Фотографий //
  var buttonScaleSmaller = document.querySelector('.scale__control--smaller');
  var buttonScaleBigger = document.querySelector('.scale__control--bigger');
  var controlValueScale = document.querySelector('.scale__control--value');
  var previewImageElement = document.querySelector('.img-upload__preview img');

  // Обьекты //
  var STEP = 25;
  var FOOL = 100;
  var PIN_LEFT_EXTREME_POSITION = 0;
  var PERCENTAGE = 100;

  // Перемещение ползунка и эффект  //

  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelLineElement = document.querySelector('.effect-level__line');


  var onUploadImgOverlayEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      if (evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description')) {
        return;
      }
      closeFile();
    }
  };


  uploadFile.addEventListener('change', function () {
    uploadImgOverlay.classList.remove('hidden');
  });


  closeFile.addEventListener('click', function () {
    uploadImgOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadImgOverlayEscPress);
  });

  //  получить интенсивность в зависимости от положения ползунка
  var getEffectIntensity = function () {
    return effectLevelPinElement.offsetLeft / effectLevelLineElement.clientWidth;
  };

  //  увеличить масштаб
  var scaleUp = function () {
    if (parseInt(controlValueScale.value, 10) < FOOL) {
      controlValueScale.value = parseInt(controlValueScale.value, 10) + STEP + '%';
    }
  };

  //  уменьшить масштаб
  var scaleDown = function () {
    if (parseInt(controlValueScale.value, 10) > STEP) {
      controlValueScale.value = parseInt(controlValueScale.value, 10) - STEP + '%';
    }
  };

  //  применить масштаб к превью-картинке
  var setScaleToPreviewImage = function () {
    previewImageElement.style.transform = 'scale(' + parseInt(controlValueScale.value, 10) / 100 + ')';
  };

  buttonScaleSmaller.addEventListener('click', function () {
    scaleDown();
    setScaleToPreviewImage();
  });

  buttonScaleBigger.addEventListener('click', function () {
    scaleUp();
    setScaleToPreviewImage();
  });

  //  обработка изменения положения ползунка интенсивности эффекта
  var startX = 0;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    var pinNewPosition = effectLevelPinElement.offsetLeft - shiftX;

    if (pinNewPosition < PIN_LEFT_EXTREME_POSITION || pinNewPosition > effectLevelLineElement.clientWidth) {
      return;
} else {
      effectLevelPinElement.style.left = pinNewPosition + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    effectLevelValueElement.value = Math.round(getEffectIntensity() * PERCENTAGE);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousemove', onMouseUp);
};

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startX = evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();