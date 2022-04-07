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

const popup = document.querySelectorAll('.popup');
const buttonsClosePopup = document.querySelectorAll('.popup__close, .popup__bg');

const cardTemplateContent = cardTemplate.querySelector('.card');

const popupWithFoto = document.querySelector('#foto-popup');
const popupFotoImg = popupWithFoto.querySelector('.popup__img');
const popupFotoName = popupWithFoto.querySelector('.popup__text');

const placeNameInput = formAddCard.querySelector('.popup__input_type_mesto-name');
const placeUrlInput = formAddCard.querySelector('.popup__input_type_mesto-url');


function createCard (place, url) {
    const card = cardTemplateContent.cloneNode(true);
    const cardName = card.querySelector('.card__title');
    const cardImg = card.querySelector('.card__img');
    const cardLike = card.querySelector('.card__like-button');
    const cardTrashButton = card.querySelector('.card__trash-button');
    
    cardName.textContent = place;
    cardImg.src = url;
    cardImg.alt = place;
    cardLike.addEventListener('click', function (e) {
        e.target.classList.toggle("card__like-button_active");
    });

    cardTrashButton.addEventListener('click', function () {
        card.remove();
    });

    cardImg.addEventListener('click', function () {
        popupFotoImg.src = url;
        popupFotoName.textContent = place;
        popupFotoImg.alt = place;
        popupWithFoto.classList.add("popup_active");
    });

    return card;    
};


function renderCard (evt) {
    evt.preventDefault();
    const place = placeNameInput.value;
    const url = placeUrlInput.value;
    
    cardsList.prepend(createCard(place, url));

    closePopup();
};

formAddCard.addEventListener('submit', renderCard);


function renderinitialCards (item) {
    item.forEach (function (item) {
        const place = item.name;
        const url = item.link;
        
        cardsList.prepend(createCard(place, url));
    });
};

renderinitialCards(initialCards);


function submitEditprofileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupEditProfile.classList.remove("popup_active");
}

formEditProfile.addEventListener('submit', submitEditprofileForm);


function closePopup () {
    popup.forEach(function(i) {
        i.classList.remove("popup_active");
    })
};



buttonEditProfile.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupEditProfile.classList.add("popup_active");    
});

buttonAddCard.addEventListener('click', function () {
    popupAddCard.classList.add("popup_active");
});


buttonsClosePopup.forEach(function(item) {
    item.addEventListener('click', closePopup);
});


