const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 


const cardsList = document.querySelector('.fotos');
const cardTemplate = document.querySelector('#card-template').content;

let editProfileButton = document.querySelector('.profile__edit-button');
let editProfilePopup = document.querySelector('#edit-profile-popup');
let formElement = document.querySelector('.edit-profile');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_descr');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

let addCardButton = document.querySelector('.profile__add-button');
let popupToAddCard = document.querySelector('#add-foto-popup');
let addCardForm = document.querySelector('.add-foto');

let popupWithFoto = document.querySelector('#foto-popup');

let popup = document.querySelectorAll('.popup');
let closePopup = document.querySelectorAll('.popup__close, .popup__bg');



function renderinitialCards (i) {
    i.forEach (function (item) {
        const newCard = cardTemplate.querySelector('.fotos__card').cloneNode(true);
        
        newCard.querySelector('.fotos__title').textContent = item.name;
        newCard.querySelector('.fotos__img').src = item.link;
        newCard.querySelector('.fotos__img').alt = item.name;
        newCard.querySelector('.fotos__like-button').addEventListener('click', function (e) {
            e.target.classList.toggle("fotos__like-button_active");
        });

        newCard.querySelector('.fotos__img').addEventListener('click', function () {
            popupWithFoto.querySelector('.popup__img').src = item.link;
            popupWithFoto.querySelector('.popup__text').textContent = item.name;
            popupWithFoto.querySelector('.popup__img').alt = item.name;
            popupWithFoto.classList.add("popup_active");
        });
    
        newCard.querySelector('.fotos__trash-button').addEventListener('click', function (e) {
            newCard.remove();
            initialCards.splice(initialCards.findIndex(item => item.link == e.link, 1));
        });
        
        cardsList.insertBefore(newCard, cardsList.firstChild);
    });
};

renderinitialCards (initialCards);




function addNewCard (evt) {  
    evt.preventDefault();
    const place = document.querySelector('.popup__input_type_mesto-name').value;
    const url = document.querySelector('.popup__input_type_mesto-url').value;
  
    initialCards.push({name:place, link:url});

    const newCard = cardTemplate.querySelector('.fotos__card').cloneNode(true);

    newCard.querySelector('.fotos__title').textContent = place;
    newCard.querySelector('.fotos__img').src = url;
    newCard.querySelector('.fotos__img').alt = place;
    newCard.querySelector('.fotos__like-button').addEventListener('click', function (e) {
        e.target.classList.toggle("fotos__like-button_active");
    });

    newCard.querySelector('.fotos__img').addEventListener('click', function () {
        popupWithFoto.querySelector('.popup__img').src = url;
        popupWithFoto.querySelector('.popup__text').textContent = place;
        popupWithFoto.querySelector('.popup__img').alt = place;
        popupWithFoto.classList.add("popup_active");
    });
    
    newCard.querySelector('.fotos__trash-button').addEventListener('click', function (e) {
        newCard.remove();
        initialCards.splice(initialCards.findIndex(item => item.link == url, 1));
    });

    cardsList.insertBefore(newCard, cardsList.firstChild);

    popupToAddCard.classList.remove("popup_active");
};


addCardForm.addEventListener('submit', addNewCard);




editProfileButton.addEventListener('click', function () {
    editProfilePopup.classList.add("popup_active");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

addCardButton.addEventListener('click', function () {
    popupToAddCard.classList.add("popup_active");
});

closePopup.forEach(function(item) {
    item.addEventListener('click', function () {
        popup.forEach(function(i) {
        i.classList.remove("popup_active");
        })
    })
});


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    editProfilePopup.classList.remove("popup_active");
}

formElement.addEventListener('submit', formSubmitHandler); 