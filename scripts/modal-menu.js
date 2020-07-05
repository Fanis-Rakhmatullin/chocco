const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.modal-menu__close');
const modal = document.querySelector('.modal-menu');
const links = document.querySelectorAll('modal-menu__link');



hamburger.addEventListener('click', function(evt) {
  evt.preventDefault;
  modal.style.display = 'block';
})

modal.addEventListener('click', function(evt) {
  modal.style.display = 'none';
})