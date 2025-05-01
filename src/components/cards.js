const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


function createCard(data, openPopupImage, like) {
  const cardTemplate = document.querySelector('#card-template').content;
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
  lacesItem.querySelector('.card__like-button').addEventListener('click', () => displayLike(likeButton))

  return lacesItem;
}

function handleDeleteCard(item) {
  item.remove();
}

function displayLike(item) {
  item.classList.toggle('card__like-button_is-active');
}


export {initialCards, createCard, handleDeleteCard, displayLike}