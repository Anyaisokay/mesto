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

// находим галерею с карточками
let content = document.querySelector('.content');
let cardsContainer = content.querySelector('.cards__grid');
// находим попап добавления карточки
let addFormElement = document.querySelector('.popup-add');
// находим форму добавления карточки
let addFormContent = addFormElement.querySelector('.popup-add__content');
// находим кнопку добавить
let addButton = document.querySelector('.profile__add-button');
// находим кнопку закрыть форму добавления карточки
let addCloseButton = document.querySelector('.popup-add__close');

// находим попап просмотра картинки карточки
let imageFormElement = document.querySelector('.popup-image');
let cardImage = imageFormElement.querySelector('.popup-image__pic');
let cardTitle = imageFormElement.querySelector('.popup-image__title');
let imageCloseButton = imageFormElement.querySelector('.popup-image__close');


// открываем попап с внесением в поля значений из профиля
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
  formElement.classList.add('popup_opened');
}

// закрываем попап

function closePopup() {
  formElement.classList.remove('popup_opened');
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

    closePopup();
}


// закрываем попап в случае клика вне формы
function closeOutForm(event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }

}



// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formContent.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик к форме для случая клика вне формы
formElement.addEventListener('click', closeOutForm);
// Прикрепляем обработчик к кнопке изменить
editButton.addEventListener('click', openPopup);
// Прикрепляем обработчик к кнопке закрыть
closeButton.addEventListener('click', closePopup);


// открываем попап добавления карточки
function openAddPopup() {
  addFormElement.classList.add('popup-add_opened');
}
// закрываем попап добавления карточки
function closeAddPopup() {
  addFormElement.classList.remove('popup-add_opened');
}

function addFormSubmitHandler (evt) {
  // отменяем стандартную отправку формы
  evt.preventDefault();

  let titleCard = addFormElement.querySelector('.popup__field_type_title');
  let linkCard = addFormElement.querySelector('.popup__field_type_link');

  prependAddCards(addCard(titleCard.value, linkCard.value));
  titleCard.value = '';
  linkCard.value = '';
  closeAddPopup();
}

// прикрепляем обработчик к кнопке добавить
addButton.addEventListener('click', openAddPopup);
// прикрепляем обработчик к кнопке закрыть форму добавления карточки
addCloseButton.addEventListener('click', closeAddPopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
addFormElement.addEventListener('submit', addFormSubmitHandler);


const initialCards = [
  {
    title: 'Симеиз',
    link: './images/simeis.jpg'
  },
  {
    title: 'Никола-Ленивец',
    link: './images/nicola-lenivets.jpg'
  },
  {
    title: 'Сулакский каньон',
    link: './images/sulak.jpg'
  },
  {
    title: 'Дербент',
    link: './images/derbent.jpg'
  },
  {
    title: 'Ай-Петри',
    link: './images/ai-petri.jpg'
  },
  {
    title: 'Курайская степь',
    link: './images/kuraiskaya.jpg'
  }
];

// функция добавления карточки
function addCard(titleValue, linkValue) {
// клонируем шаблон карточки
let cardTemplate = document.querySelector('#card-template').content;
let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
let cardPic = cardElement.querySelector('.card__pic');

cardElement.querySelector('.card__title').textContent = titleValue;
cardPic.src = linkValue;
cardPic.alt = titleValue;
// находим кнопку удалить
let deleteCardButton = cardElement.querySelector('.card__delete');
// прикрепляем обработчик к кнопке удвлить
deleteCardButton.addEventListener('click', deleteCard);
// находим кнопку лайка
let likeCardButton = cardElement.querySelector('.card__like');
likeCardButton.addEventListener('click', likeCard);

cardPic.addEventListener('click', () => viewImage(titleValue, linkValue));
return cardElement;

}



function prependAddCards(addCard) {
  cardsContainer.prepend(addCard);
}

// функция вывода массива карточек
function generateCards() {
  initialCards.forEach(function(item) {
   prependAddCards(addCard(item.title, item.link));
  });
}

generateCards();

// функция удаления карточки
function deleteCard(event) {
  event.target.closest('.card').remove();

}

// функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle('card__like_active');
}

// открываем попап просмотра картинки карточки
function openImagePopup() {
 imageFormElement.classList.add('popup-image_opened');
}

// закрываем попап просмотра картинки карточки
function closeImagePopup() {
  imageFormElement.classList.remove('popup-image_opened');
}

// функция открытия окна просмотра картинки карточки
function viewImage(titleValue, linkValue) {
  cardTitle.textContent = titleValue;
  cardImage.src = linkValue;
  cardImage.alt = titleValue;

  openImagePopup();

}
// прикрепляем обработчик к кнопке закрыть попап просмотра картинки
imageCloseButton.addEventListener('click', closeImagePopup);
