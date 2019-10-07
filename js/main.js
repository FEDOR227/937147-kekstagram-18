'use strict';
var PHOTOS_DESCRIPTION = 25;
var NAMES = ['Артем', 'Настя', 'Леля', 'Паша', 'Света', 'Андрей', 'Марина'];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо.'];

var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generatePhotoDesc = function (index) {
  return {
    url: 'photos/' + (index + 1) + '.jpg',
    description: 'Случайная фотография',
    likes: getRandomInRange(15, 200),
    comments: generateCommentsArray()
  };
};

var generateCommentsArray = function () {
  var comments = [];
  var commentsCount = getRandomInRange(1, 5);
  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: getRandomElement(COMMENTS),
      name: getRandomElement(NAMES)
    });
  }

  return comments;
};

var generatePhotosArray = function () {
  var photos = [];
  for (var i = 0; i < PHOTOS_DESCRIPTION; i++) {
    photos.push(generatePhotoDesc(i));
  }

  return photos;
};

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__comments').textContent = photo.comments.message;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;

  return photoElement;
};

var renderPhotosToDOM = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesElement.appendChild(fragment);
};

var init = function () {
  renderPhotosToDOM(generatePhotosArray());
};

init();
