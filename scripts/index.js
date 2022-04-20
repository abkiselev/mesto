const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#edit-profile-popup');
const formEditProfile = document.querySelector('.edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_descr');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#add-foto-popup');
const formAddCard = document.querySelector('.add-foto');
const formAddCardButton = formAddCard.querySelector('.popup__add-button');

const popup = document.querySelectorAll('.popup');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const overlayClosePopup = document.querySelectorAll('.popup__bg');
let popupActiveElement;

const cardTemplateContent = cardTemplate.querySelector('.card');

const popupWithFoto = document.querySelector('#foto-popup');
const popupFotoImg = popupWithFoto.querySelector('.popup__img');
const popupFotoName = popupWithFoto.querySelector('.popup__text');

const placeNameInput = formAddCard.querySelector('.popup__input_type_mesto-name');
const placeUrlInput = formAddCard.querySelector('.popup__input_type_mesto-url');

const cardData = {};


function createCard (cardData) {
    const card = cardTemplateContent.cloneNode(true);
    const cardName = card.querySelector('.card__title');
    const cardImg = card.querySelector('.card__img');
    const cardLike = card.querySelector('.card__like-button');
    const cardTrashButton = card.querySelector('.card__trash-button');
    
    cardName.textContent = cardData.place;
    cardImg.src = cardData.url;
    cardImg.alt = cardData.place;
    cardLike.addEventListener('click', likeCard);

    cardTrashButton.addEventListener('click', function () {
        card.remove();
    });

    cardImg.addEventListener('click', function () {
        popupFotoImg.src = cardData.url;
        popupFotoName.textContent = cardData.place;
        popupFotoImg.alt = cardData.place;
        popupActiveElement = popupWithFoto;
        openPopup(popupActiveElement);  
    });

    return card;    
};



function renderCard (evt) {
    evt.preventDefault();
    cardData.place = placeNameInput.value;
    cardData.url = placeUrlInput.value;
    
    cardsList.prepend(createCard(cardData));

    formAddCard.reset();

    formAddCardButton.setAttribute('disabled', '');
    formAddCardButton.classList.add('popup__button_disabled');

    closePopup(popupActiveElement);
};


function renderInitialCards (item) {
    item.forEach (function (item) {        
        cardsList.prepend(createCard(item));
    });
};

renderInitialCards(initialCards);


function submitEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupActiveElement);
}

function likeCard() {
    this.classList.toggle("card__like-button_active");
};

function openPopup(popupActiveElement) {
    popupActiveElement.classList.add("popup_active");
    document.addEventListener('keydown', closePopupOnEscape)
};

function closePopup(popupActiveElement) {
    popupActiveElement.classList.remove("popup_active");
    document.removeEventListener('keydown', closePopupOnEscape);
};

function closePopupOnEscape(event){
    if (event.key === 'Escape'){
        closePopup(popupActiveElement)
    };
};



buttonAddCard.addEventListener('click', function () {
    popupActiveElement = popupAddCard;
    openPopup(popupActiveElement);
});

buttonEditProfile.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupActiveElement = popupEditProfile;
    openPopup(popupActiveElement);   
});


buttonClosePopup.forEach(function(item) {
    item.addEventListener('click', function () {
    closePopup(popupActiveElement);
    });
});

overlayClosePopup.forEach(function(item) {
    item.addEventListener('click', function () {
    closePopup(popupActiveElement);
    });
});


formAddCard.addEventListener('submit', renderCard);

formEditProfile.addEventListener('submit', submitEditProfileForm);



