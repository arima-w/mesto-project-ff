import {  settingLike, deleteLike } from "./api" 

function createCard(data, id, openPopupImage, like, handleDeleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const lacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const name = data.name;
  const link = data.link;
  const alt = lacesItem.querySelector('.card__title').textContent;
  
  const cardImage = lacesItem.querySelector('.card__image');
  const likeQuantit = lacesItem.querySelector('.card__like-quantity');
  const buttonDeletCard = lacesItem.querySelector('.card__delete-button'); 

  cardImage.src = link;
  lacesItem.querySelector('.card__title').textContent = name;
  cardImage.alt = `Пейзаж местности ${alt}`;

  cardImage.addEventListener('click', () => openPopupImage(name, link));
  

  if (data.owner._id !== id) {
    buttonDeletCard.setAttribute("style", "display: none;");
  }

  buttonDeletCard.addEventListener("click", () => {
    console.log(handleDeleteCard(data._id, lacesItem))
  });

  const likeButton = lacesItem.querySelector('.card__like-button');

  const isLiked = data.likes.some((like) => like._id === id);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeQuantit.textContent = data.likes.length;;

  likeButton.addEventListener('click', ()  => like(event, likeButton, data._id, likeQuantit))

  return lacesItem; 
}

function like(event, item, itemId, itemLike) {
  if (event.target.classList.contains('card__like-button_is-active')) {
      item.classList.remove('card__like-button_is-active');
      deleteLike(itemId)
      .then((res) => {
        itemLike.textContent = res.likes.length;
      })
      
    } else {
      item.classList.add('card__like-button_is-active');
      settingLike(itemId)
      .then((res) => {
        itemLike.textContent = res.likes.length;
      })
    }
}

export { createCard, like };