const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
        authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987'
    }
}

const handleResponse = res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

const getUserName = () => {    
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
})
    .then(handleResponse) 
}


const getInitialCards = () => { 
  return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers       
})
    .then(handleResponse) 
}



const updateUSerInfo =  (newName, newAbout) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: newName,
    about: newAbout
  })
  })
  .then(handleResponse) 
}

const updateUserAvatar = (link)  => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    avatar: link
  })
  })
}


const createNewCard = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: newCardName,
    link: newCardLink
  })
  })
  .then(handleResponse) 
}

const deletCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
}


const settingLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
}

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(handleResponse)
}



export {getUserName, getInitialCards, updateUSerInfo, createNewCard, updateUserAvatar, deletCard, settingLike, deleteLike};