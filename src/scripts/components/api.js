const config = {
  baseUrl: import.meta.env.DEV
    ? "/api/v1/apf-cohort-202"
    : "https://mesto.nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "756d4d8d-96a3-4566-823d-ed5462304c29",
    "Content-Type": "application/json",
  },
};

const REQUEST_TIMEOUT = 10000;

/* Проверяем, успешно ли выполнен запрос, и отклоняем промис в случае ошибки. */
const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = (path, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  return fetch(`${config.baseUrl}${path}`, {
    ...options,
    headers: config.headers,
    signal: controller.signal,
  })
    .then(getResponseData)
    .catch((err) => {
      if (err.name === "AbortError") {
        return Promise.reject(
          `Ошибка: сервер не ответил за ${REQUEST_TIMEOUT / 1000} сек.`
        );
      }

      return Promise.reject(err);
    })
    .finally(() => {
      clearTimeout(timeoutId);
    });
};

/* GET запрос о пользователе с сервера*/
export const getUserInfo = () => {
  return request("/users/me");
};

/* GET запрос о карточках*/
export const getCardList = () => {
    return request("/cards");
};

/* PATCH запрос на обновление данных пользователя */
export const editUserInfo = ({name, about}) => {
    return request("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
            name,
            about,
        }),
    });
};

/* PATCH запрос на обновление аватара пользователя */
export const editUserAvatar = (avatar) => {
    return request("/users/me/avatar", {
        method: "PATCH",
        body: JSON.stringify({ avatar }),
    });
};

/* POST запрос на добавление новой карточки */
export const addNewCard = ({name, link}) => {
    return request("/cards", {
        method: "POST",
        body: JSON.stringify({
            name,
            link,
        }),
    });
};

/* DELETE запрос на удаление карточки */
export const deleteCardReq = (cardId) => {
    return request(`/cards/${cardId}`, {
        method: "DELETE",
    });
};

/* PUT запрос на изменение лайка */
export const likeCardReq = (cardId, isLiked) => {
    return request(`/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
    });
};
