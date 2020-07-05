const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$('.arrow-left').on('click', () => {
  slider.goToPrevSlide();
})

$('.arrow-right').on('click', () => {
  slider.goToNextSlide();
})