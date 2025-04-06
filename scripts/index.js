// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки 1

// @todo: Функция удаления карточки 

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;


function createCard(data) {
    const lacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    lacesItem.querySelector('.card__image').src = data.link;
    lacesItem.querySelector('.card__title').textContent = data.name;
    lacesItem.querySelector('.card__image').alt = `Пейзаж местности ${lacesItem.querySelector('.card__title').textContent}`;

    lacesItem.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(lacesItem));

    return lacesItem;
}

function handleDeleteCard(item) {
    item.remove();
}

function renderCard(card) {
    placesList.append(card);
}

for (let i = 0; i < initialCards.length; i++) {
    renderCard(createCard(initialCards[i]));
}