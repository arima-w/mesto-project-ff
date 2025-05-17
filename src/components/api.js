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

const getNewName =  (newName, newAbout) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '5151a2e3-585b-4d32-8fd2-2442e5bc5987',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: 'Maaas',
    about: 'Wasss'
  })
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}

console.log(getNewName())


export {getUserName, getInitialCards};