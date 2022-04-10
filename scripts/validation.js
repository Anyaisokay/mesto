const selectorList  = {
  // форма
  formSelector: '.popup__content',
  // поля формы
  inputSelector: '.popup__field',
  // span с сообщением об ошибке
  spanError: 'popup__field_type_error',
  // модификатор для поля с ошибкой
  inputErrorActive: 'popup__field-error_active',
  // кнопка формы
  submitButton: '.popup__button',
  // модификатор неактивной кнопки
  inactiveButton: 'popup__button_inactive'
};

// функция добавления класса с ошибкой
function showInputError(formElement, inputElement, inputErrorActive, spanError, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorActive);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(spanError);
};

// функция удаления класса с ошибкой
function hideInputError(formElement, inputElement, inputErrorActive, spanError) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorActive);
  errorElement.classList.remove(spanError);
  errorElement.textContent = '';
}

// функция проверки валидности поля
function isValid(formElement, inputElement, {inputErrorActive, spanError}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement,  inputErrorActive, spanError, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorActive, spanError);
  }
}

// функция, изменяющая состояние кнопки
function toggleSubmitButtonState(formElement, submitButton, inactiveButton) {
  const checkValid = formElement.checkValidity();
  const formButton = formElement.querySelector(submitButton);
  if (checkValid) {
    formButton.classList.remove(inactiveButton);
    formButton.disabled = false;
  } else {
    formButton.classList.add(inactiveButton);
    formButton.disabled = true;
  }
}

// функция, добавляющая полям формы обработчики
function setEventListeners(formElement, {inputSelector, submitButton, inactiveButton, spanError, inputErrorActive}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, {inputSelector, submitButton, inactiveButton, spanError, inputErrorActive});
      toggleSubmitButtonState(formElement, submitButton, inactiveButton);
    });
  });
}

// функция, добавляющая всем формам обработчик
function enableValidation({formSelector, inputSelector, spanError, inputErrorActive, submitButton, inactiveButton}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, {inputSelector, spanError, inputErrorActive, submitButton, inactiveButton} );
  });
}

enableValidation(selectorList);





