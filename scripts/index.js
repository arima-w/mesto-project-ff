const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;


function createCard(data, openPopupImage, like) {
    const lacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    const name = data.name;
    const link = data.link;
    const alt = lacesItem.querySelector('.card__title').textContent;
    const likeButton = lacesItem.querySelector('.card__like-button');

    lacesItem.querySelector('.card__image').src = link;
    lacesItem.querySelector('.card__title').textContent = name;
    lacesItem.querySelector('.card__image').alt = `Пейзаж местности ${alt}`;

    lacesItem.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(lacesItem));
    lacesItem.querySelector('.card__image').addEventListener('click', () => openPopupImage(name, link));
    lacesItem.querySelector('.card__like-button').addEventListener('click', () => like(likeButton))

    return lacesItem;
}

function handleDeleteCard(item) {
    item.remove();
}

function renderCard(card) {
    placesList.append(card);
}

for (let i = 0; i < initialCards.length; i++) {
    renderCard(createCard(initialCards[i], openPopupImage, like));
}




const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popopEdit = document.querySelector('.popup_type_edit');

const closePopupEdit = popopEdit.querySelector('.popup__close');
const closePopupNewCard = popupNewCard.querySelector('.popup__close');



function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => openPopup(popopEdit));
closePopupEdit.addEventListener('click', () => closePopup(popopEdit));

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));
closePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));



const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;


function handleFormSubmit(evt) {
    evt.preventDefault();
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = formEditName.value;
    profileDescription.textContent = formEditDescription.value;

    closePopup(popopEdit);

    formEditName.value = '';
    formEditDescription.value = '';
}

formEdit.addEventListener('submit', handleFormSubmit)



const formNewPlace = document.forms['new-place'];
const formCardName = formNewPlace.elements['place-name'];
const formCardLink = formNewPlace.elements.link;

function renderNewCard(card) {
    placesList.prepend(card);
}

function handleNewCard(evt) {
    
    evt.preventDefault();

    const newCard = {
        name: formCardName.value,
        link: formCardLink.value
    }

    renderNewCard(createCard(newCard, openPopupImage, like));
    
    formCardName.value = '';
    formCardLink.value = '';

    closePopup(popupNewCard)
}

formNewPlace.addEventListener('submit', handleNewCard)


function openPopupImage(name, link) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const closePopupImage = popupTypeImage.querySelector('.popup__close');

    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupText = popupTypeImage.querySelector('.popup__caption');
    
    popupImage.src = link;
    popupText.textContent = name;
    popupImage.alt = name;
    openPopup(popupTypeImage);

    closePopupImage.addEventListener('click', () => closePopup(popupTypeImage))
}

function like(item) {
    item.classList.toggle('card__like-button_is-active');
}