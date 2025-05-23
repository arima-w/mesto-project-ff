const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
        authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987'
    }
}

const getUserName = () => {    
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}


const getInitialCards = () => { 
  return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers       
})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}

console.log(getInitialCards())

const getNewName =  (newName, newAbout) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: newName,
    about: newAbout
  })
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}

const getNewAvatar = (link)  => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    avatar: link
  })
  })
}


const getNewCard = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: newCardName,
    link: newCardLink
  })
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}

const deletCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987'
    }
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}


const settingLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987'
    }
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987'
    }
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}



export {getUserName, getInitialCards, getNewName, getNewCard, getNewAvatar, deletCard, settingLike, deleteLike};