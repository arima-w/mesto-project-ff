// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки 1

// @todo: Функция удаления карточки 

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

function card(link, name) {
    const lacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    lacesItem.querySelector('.card__image').src = link;
    lacesItem.querySelector('.card__title').textContent = name;

    placesList.append(lacesItem);
    
    lacesItem.querySelector('.card__delete-button').addEventListener('click', function () {
        lacesItem.remove();
    });
}

for (let i = 0; i < initialCards.length; i++) {
    card(initialCards[i].link, initialCards[i].name);
}