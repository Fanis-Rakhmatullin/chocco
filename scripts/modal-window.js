// Используется библиотека fancybox для вызова модального окна с результатом 
// отправки формы. Успех/неудача в случайном порядке - так настроен сервер.
 

// Функция валидатор. Если строка не заполнена или заполнена пробелами 
// выделяет строку розовым border (навешивает класс "inpur-error")
// Возвращает true/false. 
const validateFields = (form, fieldsArr) => {
  fieldsArr.forEach((field) => {
    field.removeClass('input-error');
    if (field.val().trim() == '') {
      field.addClass('input-error')
    };
  })

  const errorFields = form.find('.input-error');

  return errorFields.length == 0;
}

 // Обработчик событий отправки формы.
$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $('#modal');
  const content = modal.find('.modal__content');

  modal.removeClass('error-modal');

  // [name, phone, comment, to] -- обязательные для заполнения поля.

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    })

    //  Очищает форму в случае успеха.
    request.done(data => {
      content.text(data.message);
      $('.form__input').val('');
    })

    request.fail(data => {
      content.text(data.responseJSON.message);
      modal.addClass('error-modal');
    })
      // Вызов модального окна с сообщением об успехе/ошибке. Библиотека fancybox.
    request.always(() => {
      $.fancybox.open({
        src: '#modal',
        type: 'inline',
        smallBtn: false,
        toolbar: false
      })
    })
  }
})

      // Обработчик событий для закрытия модального окна по клику на кнопку.
$('.js-submit-btn').click(e => {
  e.preventDefault();

  $.fancybox.close()
})