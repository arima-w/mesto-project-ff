function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', ESCclose); 
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', ESCclose)
}


function ESCclose(evt) {
    if (evt.keyCode == 27) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

function closePopupOverlay(event, item) {
    if (event.target === item) {
        closePopup(item);
    }
}

export {openPopup, closePopup, ESCclose, closePopupOverlay};