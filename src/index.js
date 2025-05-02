import { initialCards, createCard, handleDeleteCard, displayLike } from './components/cards.js';
import { openPopup, closePopup, ESCclose, closePopupOverlay } from './components/modal.js'
import './pages/index.css';

const placesList = document.querySelector('.places__list');


function renderCard(card) {
    placesList.append(card);
}


initialCards.forEach( function (item) {
    renderCard(createCard(item, openPopupImage, displayLike))
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

function formEditSubmit(evt) {

    evt.preventDefault();

    profileTitle.textContent = formEditName.value;
    profileDescription.textContent = formEditDescription.value;

    closePopup(popopEdit);

    formEditName.value = '';
    formEditDescription.value = '';
}

formEdit.addEventListener('submit', formEditSubmit)



const popupTypeImage = document.querySelector('.popup_type_image');
const closePopupImage = popupTypeImage.querySelector('.popup__close');

function openPopupImage(name, link) {
  
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupText = popupTypeImage.querySelector('.popup__caption');
    
    popupImage.src = link;
    popupText.textContent = name;
    popupImage.alt = name;
    openPopup(popupTypeImage);
}

closePopupImage.addEventListener('click', () => closePopup(popupTypeImage))







const formNewPlace = document.forms['new-place'];
const formCardName = formNewPlace.elements['place-name'];
const formCardLink = formNewPlace.elements.link;

function renderNewCard(card) {
    placesList.prepend(card);
}

function formNewPlaceSubmit(evt) {
    
    evt.preventDefault();

    const newCard = {
        name: formCardName.value,
        link: formCardLink.value
    }

    renderNewCard(createCard(newCard, openPopupImage, displayLike));
    
    formCardName.value = '';
    formCardLink.value = '';

    closePopup(popupNewCard)
}

formNewPlace.addEventListener('submit', formNewPlaceSubmit)


popupNewCard.addEventListener("mousedown", () => closePopupOverlay(event, popupNewCard));

popopEdit.addEventListener("mousedown", () => closePopupOverlay(event, popopEdit));

popupTypeImage.addEventListener("mousedown", () => closePopupOverlay(event, popupTypeImage));