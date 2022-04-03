// находим попап формы изменения профиля
const profilePopup = document.querySelector(".popup_type_profile");
// находим форму изменения профиля
const profileForm = document.querySelector('form[name="profile-form"]');
// находим поля формы изменения профиля
const nameInput = profilePopup.querySelector(".popup__field_type_name");
const jobInput = profilePopup.querySelector(".popup__field_type_job");
// находим кнопку изменить профиль
const editButton = document.querySelector(".profile__edit-button");
// находим кнопку закрыть форму изменения профиля
const closeProfileButton = profilePopup.querySelector(".popup__close");
// находим элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileContent = document.querySelector(".profile__content");

// находим галерею с карточками
const content = document.querySelector(".content");
const cardsContainer = content.querySelector(".cards__grid");
// находим попап формы добавления карточки
const cardPopup = document.querySelector(".popup_type_card");
// находим форму добавления карточки
const cardForm = document.querySelector('form[name="card-form"]');
// находим кнопку добавить карточку
const addButton = document.querySelector(".profile__add-button");

// находим поля формы карточки
const titleCardInput = cardPopup.querySelector(".popup__field_type_title");
const linkCardInput = cardPopup.querySelector(".popup__field_type_link");
// находим кнопку закрыть форму добавления карточки
const closeCardButton = cardPopup.querySelector(".popup__close");

// находим шаблон карточки
const cardTemplate = document.querySelector("#card-template").content;

// находим попап просмотра картинки карточки
const imagePopup = document.querySelector(".popup_type_image");
const cardImage = imagePopup.querySelector(".popup__pic");
const cardDescript = imagePopup.querySelector(".popup__description");
const closeImageButton = imagePopup.querySelector(".popup__close");

// открываем попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// закрываем попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// функция вставки в поля значений из профиля
function insertProfileData(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

// функция вставки новых значений в поля с помощью textContent
function insertNewProfileData(name, job) {
  profileName.textContent = name;
  profileContent.textContent = job;
}

// функция открытия попапа формы изменения профиля
function openProfilePopup() {
  insertProfileData(profileName.textContent, profileContent.textContent);
  openPopup(profilePopup);
}

// обработчик «отправки» формы
function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  insertNewProfileData(nameInput.value, jobInput.value);
  evt.currentTarget.reset();
  closePopup(profilePopup);
}

// закрываем попап в случае клика вне формы
function closeOutForm(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// открываем попап формы добавления карточки
function openCardPopup() {
  openPopup(cardPopup);
}

// обработчик «отправки» формы
function cardFormSubmitHandler(evt) {
  evt.preventDefault();

  prependAddCards(addCard(titleCardInput.value, linkCardInput.value));
  evt.currentTarget.reset();
  closeAddPopup(cardPopup);
}

// функция добавления карточки
function addCard(titleValue, linkValue) {
  // клонируем шаблон карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__pic");

  cardElement.querySelector(".card__title").textContent = titleValue;
  cardImage.src = linkValue;
  cardImage.alt = titleValue;

  // прикрепляем обработчик к кнопке удалить
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", deleteCard);
  // прикрепляем обработчик к кнопке лайка
  cardElement.querySelector(".card__like").addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => viewImage(titleValue, linkValue));
  return cardElement;
}

// функция добавления новой карточки в начало контейнера
function prependAddCards(addCard) {
  cardsContainer.prepend(addCard);
}

// функция вывода массива карточек
function generateCards() {
  initialCards.forEach(function (item) {
    prependAddCards(addCard(item.title, item.link));
  });
}

generateCards();

// функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}

// функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle("card__like_active");
}

// функция открытия окна просмотра картинки карточки
function viewImage(titleValue, linkValue) {
  cardDescript.textContent = titleValue;
  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  openPopup(imagePopup);
}

// прикрепляем обработчик отправки формы изменения профиля
profileForm.addEventListener("submit", profileFormSubmitHandler);
// прикрепляем обработчик отправки формы изменения профиля
cardForm.addEventListener("submit", cardFormSubmitHandler);
// прикрепляем обработчик к попапу для случая клика вне формы
profilePopup.addEventListener("click", closeOutForm);
cardPopup.addEventListener("click", closeOutForm);
imagePopup.addEventListener("click", closeOutForm);
// прикрепляем обработчик к кнопке изменить
editButton.addEventListener("click", openProfilePopup);
// прикрепляем обработчик к кнопке добавить
addButton.addEventListener("click", openCardPopup);
// прикрепляем обработчик к кнопке закрыть форму изменения профиля
closeProfileButton.addEventListener("click", () => closePopup(profilePopup));
// прикрепляем обработчик к кнопке закрыть форму добавления карточки
closeCardButton.addEventListener("click", () => closePopup(cardPopup));
// прикрепляем обработчик к кнопке закрыть попап просмотра картинки
closeImageButton.addEventListener("click", () => closePopup(imagePopup));
