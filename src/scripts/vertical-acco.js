(function () {
// Функция измеряющая необходимую ширину.
// Возвращает объект с шириной для классов .textContent и .textContainer
const measureWidth = (item) => {
  // reqItemWidth - необходимая ширина для контента одного
  // элемента аккордиона.
  let reqItemWidth = 0;

  // Определяет ширину экрана.
  const screenWidth = $(window).width();
  const list = item.closest('.range__list');
  const items = $('.range__item')

  const titleBlocks = list.find('.range__title-link');
  const titleWidth = titleBlocks.width();

  const isTablet = window.matchMedia('(max-width: 768px)').matches;
  const isPhone = window.matchMedia('(max-width: 480px)').matches;

  const textContainer = item.find('.range__container');
  const paddingLeft = parseInt(textContainer.css('padding-left'));
  const paddingRight = parseInt(textContainer.css('padding-right'));

  // Положение элемента которые нужно открыть.
  // От этого зависит насколько его будем сдвигать.
  const itemNumber = items.index(item) + 1;

  // Для телефонов код отличается, т.к. необходимо сдвинуть 
  // еще и весь range__item. content и container раскрываются до упора.
  if (isPhone) {
    reqItemWidth = screenWidth - titleWidth;
    let left = titleWidth * (titleBlocks.length - itemNumber);
    item.css({ "left": left });
  }
  else if (isTablet) {
    reqItemWidth = screenWidth - titleWidth * titleBlocks.length;
  }
  else {
    // Тернарный оператор для того, чтобы при небольшой ширине
    // экрана окно раскрывалось не на все 500px, а так чтобы не закрывать
    // слово "Меню"
    reqItemWidth = ((screenWidth * 0.7) - titleWidth * titleBlocks.length) > 500
      ? 500
      : (screenWidth * 0.7) - titleWidth * titleBlocks.length;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight,
  }
}

// Функция закрывающая все элементы. Задает ширину 0
// и убирает класс 'active'
const closeEveryAccoItem = list => {
  const items = list.find('.range__item');
  const content = list.find('.range__content');

  // Специально для варианта анимации на телефонах. Требуется обнулить
  // сдвиг слева.
  items.css({ "left": 0 });

  items.removeClass('active');
  content.width(0);
}

// Функция открывающая элемент. 
// Задает ширину измеренную функцией measureWidth.
const openAccoItem = (item) => {
  const content = item.find('.range__content');
  const reqWidth = measureWidth(item);
  const textBlock = item.find('.range__container')

  item.addClass('active')

  content.width(reqWidth.container);

  // Ширина задается также контейнеру с текстом
  // для того, чтобы текст не прыгал при расширении/сжатии.
  textBlock.width(reqWidth.textContainer);
}


// ОБработчик событий на клику по названию
$('.range__title-link').on('click', (e) => {
  e.preventDefault();
  const target = $(e.currentTarget);
  const item = target.closest('.range__item');
  const content = item.find('.range__content');
  const container = content.find('.range__container');
  const list = $('.range__list');
  const isOpened = item.hasClass('active')

  if (isOpened) {
    closeEveryAccoItem(list);
  }
  else {
    closeEveryAccoItem(list);
    openAccoItem(item);
  }
})

// Обработчик событий по клику на кнопку закрыть "Х"
$('.range__close').on('click', (e) => {
  e.preventDefault();
  closeEveryAccoItem($('.range__list'));
})

}());