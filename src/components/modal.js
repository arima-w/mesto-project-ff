function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}


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

function ESCclose(evt) {
    if (evt.keyCode == 27) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

function closePopupOverlay(event, ww) {
    if (event.target === ww) {
        closePopup(ww);
    }
}

export {openPopup, closePopup, ESCclose, openPopupImage, closePopupOverlay};