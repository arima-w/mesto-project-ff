import { renderCard, createCard, displayLike, removeLike } from './components/cards.js';
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js'
import { enableValidation } from './components/validation.js'
import { getUserName, getInitialCards, getNewName, getNewCard, getNewAvatar } from './components/api.js'
import './pages/index.css';

enableValidation()

const userName = document.querySelector('.profile__title');
const userAbout = document.querySelector('.profile__description');
const avatarr = document.querySelector('.profile__image');

function renderUserProfile ({ name, about, avatar}) {
    userName.textContent = name;
    userAbout.textContent = about;
    avatarr.style.backgroundImage = `url(${avatar})`;
}

Promise.all([getUserName(), getInitialCards()])
    .then(([user, cards]) => {
        renderUserProfile(user);
        cards.forEach((card) => {
            renderCard(createCard(card, openPopupImage, displayLike, removeLike));
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

closePopupEdit.addEventListener('click', () => closePopup(popopEdit));

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));
closePopupNewCard.addEventListener('click', () => closePopup(popupNewCard));

const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements.name;
const formEditDescription = formEdit.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function submitFormEdit(evt) { 

    evt.preventDefault();

    getNewName(formEditName.value, formEditDescription.value)

    closePopup(popopEdit);

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

function submitNewFormCard(evt) {
    evt.preventDefault();

    const name = formCardName.value;
    const link = formCardLink.value;

    getNewCard(name, link)

    formCardName.value = '';
    formCardLink.value = '';

    closePopup(popupNewCard)
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

    getNewAvatar(link)

    closePopup(popopNewAvatar)
}

formAvatar.addEventListener('submit', submitFormNewAvatar)

const popupDeletCard = document.querySelector('.popup_type_delete-card');

popupNewCard.addEventListener("mousedown", () => closePopupOverlay(event, popupNewCard));

popopEdit.addEventListener("mousedown", () => closePopupOverlay(event, popopEdit));

popupTypeImage.addEventListener("mousedown", () => closePopupOverlay(event, popupTypeImage));

popopNewAvatar.addEventListener("mousedown", () => closePopupOverlay(event, popopNewAvatar));

popupDeletCard.addEventListener("mousedown", () => closePopupOverlay(event, popupDeletCard));