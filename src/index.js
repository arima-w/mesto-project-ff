import {  createCard, like } from './components/cards.js';
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js'
import { enableValidation } from './components/validation.js'
import { getUserName, getInitialCards, updateUSerInfo, createNewCard, updateUserAvatar, deletCard } from './components/api.js'
import './pages/index.css';

const placesList = document.querySelector('.places__list');

function renderCard(card) {
  placesList.prepend(card);
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const avatarr = document.querySelector('.profile__image');

function renderUserProfile ({ name, about, avatar}) {
    userName.textContent = name;
    userAbout.textContent = about;
    avatarr.style.backgroundImage = `url(${avatar})`;
}

let userId;

Promise.all([getUserName(), getInitialCards()])
    .then(([user, cards]) => {
        userId = user._id
        renderUserProfile(user);
        cards.forEach((card) => {
            renderCard(createCard(card, userId, openPopupImage, like, handleDeleteCard));
        });
    })
    .catch((error) => {
        console.log('Ошибка при загрузке:', error);
    })

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popopEdit = document.querySelector('.popup_type_edit');

const closePopupEdit = popopEdit.querySelector('.popup__close');
const closePopupNewCard = popupNewCard.querySelector('.popup__close');


profileEditButton.addEventListener('click', () => {
    formEditName.value = profileTitle.textContent;
    formEditDescription.value =profileDescription.textContent;
    openPopup(popopEdit);
});



const popupDeletCard = document.querySelector('.popup_type_delete-card');
const popupDeletCardButton = popupDeletCard.querySelector('.popup__button');
const closePopupDeleteCard = popupDeletCard.querySelector('.popup__close');

let cardForDelete = {}
const handleDeleteCard = (cardId, cardElement) => {
    cardForDelete = {
        id: cardId,
        cardElement
    }
    openPopup(popupDeletCard)
}

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
 if (!cardForDelete.cardElement) return;

  deletCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closePopup(popupDeletCard);
      cardForDelete = {};
    })
    .catch((err) => {
        console.log(err);
    })
};

popupDeletCardButton.addEventListener('click', () => handleDeleteCardSubmit(event))

closePopupDeleteCard.addEventListener('click', () => closePopup(popupDeletCard))









closePopupEdit.addEventListener('click', () => closePopup(popopEdit));

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));
closePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));

const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditSubmitButton = formEdit.querySelector('button[type="submit"]');

function submitFormEdit(evt) { 
    evt.preventDefault();

    const originalText = formEditSubmitButton.textContent;
  
    formEditSubmitButton.textContent = 'Сохранение...';
    formEditSubmitButton.disabled = true;
  
    updateUSerInfo(formEditName.value, formEditDescription.value)
    .then(() => {
        profileTitle.textContent = formEditName.value,
        profileDescription.textContent = formEditDescription.value,
        closePopup(popopEdit);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        formEditSubmitButton.textContent = originalText;
        formEditSubmitButton.disabled = false; 
    });

}

formEdit.addEventListener('submit', submitFormEdit)









const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupImage = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupText = popupTypeImage.querySelector('.popup__caption');

function openPopupImage(name, link) {
    
    popupImage.src = link;
    popupText.textContent = name;
    popupImage.alt = name;
    openPopup(popupTypeImage);
}

closePopupImage.addEventListener('click', () => closePopup(popupTypeImage))

const formNewPlace = document.forms['new-place'];
const formCardName = formNewPlace.elements['place-name'];
const formCardLink = formNewPlace.elements.link;
const formNewPlaceSubmitButton = formNewPlace.querySelector('button[type="submit"]');

function submitNewFormCard(evt) {
    evt.preventDefault();
  
    const originalText = formNewPlaceSubmitButton.textContent;
  
    formNewPlaceSubmitButton.textContent = 'Сохранение...';
    formNewPlaceSubmitButton.disabled = true; 
  
    const name = formCardName.value;
    const link = formCardLink.value;
  
    createNewCard(name, link)
    .then((res) => {
        console.log(createCard(res, userId, openPopupImage, like, handleDeleteCard))
        renderCard(createCard(res, userId, openPopupImage, like, handleDeleteCard))
        formCardName.value = "";
        formCardLink.value = "";
        closePopup(popupNewCard);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    })
    .finally(() => {
        formNewPlaceSubmitButton.textContent = originalText;
        formNewPlaceSubmitButton.disabled = false;
    });
}

formNewPlace.addEventListener('submit', submitNewFormCard)

const buttonNewAvatar = document.querySelector('.profile__image');
const popopNewAvatar = document.querySelector('.popup_type_new-avatar');
const closePopupNewAvatar = popopNewAvatar.querySelector('.popup__close');

buttonNewAvatar.addEventListener('click', () => openPopup(popopNewAvatar));
closePopupNewAvatar.addEventListener('click', () => closePopup(popopNewAvatar));

const formAvatar = document.forms['edit-avatar'];
const formAvatarLink = formAvatar.elements['description'];

function submitFormNewAvatar(evt) {
    evt.preventDefault();

    const link = formAvatarLink.value

    updateUserAvatar(link)

    closePopup(popopNewAvatar)
}

formAvatar.addEventListener('submit', submitFormNewAvatar)

popupNewCard.addEventListener("mousedown", () => closePopupOverlay(event, popupNewCard));

popopEdit.addEventListener("mousedown", () => closePopupOverlay(event, popopEdit));

popupTypeImage.addEventListener("mousedown", () => closePopupOverlay(event, popupTypeImage));

popopNewAvatar.addEventListener("mousedown", () => closePopupOverlay(event, popopNewAvatar));

popupDeletCard.addEventListener("mousedown", () => closePopupOverlay(event, popupDeletCard));

export {cardForDelete, handleDeleteCard};