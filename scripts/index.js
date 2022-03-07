// находим попап
let formElement = document.querySelector('.popup');
// находим форму
let formContent = formElement.querySelector('.popup__content');
// находим поля формы
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_job');
// находим кнопку изменить
let editButton = document.querySelector('.profile__edit-button');
// находим кнопку закрыть
let closeButton = document.querySelector('.popup__close');
// находим кнопку сохранить
let saveButton = document.querySelector('.popup__save');
// находим элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileContent = document.querySelector('.profile__content');


// добавляем модификатор, если попап закрыт, удаляем - если открыт
function togglePopup() {
  formElement.classList.toggle('popup_opened');
}

// открываем попап с внесением в поля значений из профиля
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
  togglePopup();
}


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    // отменяем стандартную отправку формы
    evt.preventDefault();

    // получаем значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // вставляем новые значения с помощью textContent
    profileName.textContent = name;
    profileContent.textContent = job;
    togglePopup();
}


// закрываем попап в случае клика вне формы
function closeOutForm(event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }

}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formContent.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик к форме для случая клика вне формы
formElement.addEventListener('click', closeOutForm);
// Прикрепляем обработчик к кнопке изменить
editButton.addEventListener('click', openPopup);
// Прикрепляем обработчик к кнопке закрыть
closeButton.addEventListener('click', togglePopup);
