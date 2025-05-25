import { closePopup, openPopup } from "./modal";
import { deletCard, settingLike, deleteLike } from "./api" 
import { cardForDelete, handleDeleteCard } from "../index.js"

const placesList = document.querySelector('.places__list');

function renderCard(card) {
  placesList.append(card);
}

function createCard(data, openPopupImage, displayLike, removeLike, handleDeleteCard) {
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
  

  if (data.owner._id !== 'c4b0220006002880d4c77b4f') {
    buttonDeletCard.setAttribute("style", "display: none;");
  }

  buttonDeletCard.addEventListener("click", () => {
    console.log(handleDeleteCard(data._id, lacesItem))
  });


















  const likeButton = lacesItem.querySelector('.card__like-button');

  const isLiked = data.likes.some((like) => like._id === "c4b0220006002880d4c77b4f");
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeQuantit.textContent = data.likes.length;;

  likeButton.addEventListener('click', function(event) {
    if (event.target.classList.contains('card__like-button_is-active')) {
      removeLike(likeButton, data._id, likeQuantit);
    } else {
      displayLike(likeButton, data._id, likeQuantit);
    }

  })

  return lacesItem; 
}

function displayLike(item, itemId, itemLike) {
  item.classList.add('card__like-button_is-active');
  settingLike(itemId);
  const quantityLike = Number(itemLike.textContent) + 1;
  itemLike.textContent = quantityLike;
} 

function removeLike(item, itemId, itemLike) {
  item.classList.remove('card__like-button_is-active');
  deleteLike(itemId);
  const quantityLike = Number(itemLike.textContent) - 1;
  itemLike.textContent = quantityLike;
}

export {renderCard, createCard, displayLike, removeLike};