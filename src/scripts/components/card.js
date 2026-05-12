const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

const getLikeButton = (cardElement) => {
  return cardElement.querySelector(".card__like-button");
};

const getLikeCount = (cardElement) => {
  return cardElement.querySelector(".card__like-count");
};

const isLikedByUser = (likes, userID) => {
  return likes.some((user) => user._id === userID);
};

export const isCardLiked = (cardElement) => {
  return getLikeButton(cardElement).classList.contains("card__like-button_is-active");
};

export const updateCardLikes = (cardElement, likes, userID) => {
  const likeButton = getLikeButton(cardElement);
  const likeCount = getLikeCount(cardElement);

  likeButton.classList.toggle(
    "card__like-button_is-active",
    isLikedByUser(likes, userID)
  );
  likeCount.textContent = likes.length;
};

export const removeCardElement = (cardElement) => {
  cardElement.remove();
};

export const createCardElement = (
  data,
  userID,
  { onPreviewPicture, onLikeIcon, onDeleteCard, onInfoClick }
) => {
  const cardElement = getTemplate();
  const likeButton = getLikeButton(cardElement);
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const cardImage = cardElement.querySelector(".card__image");
  const infoButton = cardElement.querySelector(".card__control-button_type_info");


  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  updateCardLikes(cardElement, data.likes, userID);

  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(cardElement, data._id));
  }

  if (data.owner._id !== userID) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => onDeleteCard(cardElement, data._id));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: data.name, link: data.link}));
  }

  if (onInfoClick) {
    infoButton.addEventListener('click', () => onInfoClick(data._id));
  }

  return cardElement;
};
