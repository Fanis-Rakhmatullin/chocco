// Функция задает контейнеру такую же высоту, как у блока с контентом,
// таким образом "открывая" его. Навешивает класс 'opened' на открытый контейнер.

const openItem = item => {
  const container = item.closest('.team__item');
  const contentBlock = container.find('.team__desc');
  const textBlock = contentBlock.find('.team__desc-block');
  const reqHeight = textBlock.height();

  container.addClass('opened')

  contentBlock.height(reqHeight);
}

// Функция закрывает все контейнеры. Задает высоту 0.
// Снимает класс 'opened'

const closeEveryItem = container => {
  const items = container.find('.team__desc');
  const itemContainer = container.find('.team__item');

  itemContainer.removeClass('opened')
  items.height(0);
}

// Обработчик событий: при клике на закрытый контейнер открывает его
// и закрывает все остальные. При клике на открытый - закрывает.

$('.team__name').on('click', function (e) {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest('.team__item');

  if (elemContainer.hasClass('opened')) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
})