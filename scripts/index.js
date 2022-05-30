import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
// import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { FormValidator, formsData } from './FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
// const popupEditProfile = document.querySelector('#edit-profile-popup');
const formEditProfile = document.querySelector('.edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_descr');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const buttonAddCard = document.querySelector('.profile__add-button');
// const popupAddCard = document.querySelector('#add-foto-popup');
const formAddCard = document.querySelector('.add-foto');
const formAddCardButton = formAddCard.querySelector('.popup__add-button');

// const buttonClosePopup = document.querySelectorAll('.popup__close');
// const overlayClosePopup = document.querySelectorAll('.popup__bg');
// let popupActiveElement;

const placeNameInput = formAddCard.querySelector('.popup__input_type_mesto-name');
const placeUrlInput = formAddCard.querySelector('.popup__input_type_mesto-url');

// const cardsList = document.querySelector('.cards');
const forms = Array.from(document.querySelectorAll('.popup__form'));


// function renderCard(card) {
//     const newCard = new Card(card, '#card-template');
//     const cardElement = newCard.generateCard();
//     cardsList.prepend(cardElement);
// };

// initialCards.forEach(function(card){
//     renderCard(card);
// });



// инициализация section 
const cardsList = new Section(
    {
        data: initialCards,
        
        renderer: (card) => {
            const newCard = new Card(
                {
                    card: card, 
                    temlateSelector: '#card-template', 
                    handleCardClick: (place, url) => {
                        const imagePopup = new PopupWithImage('#foto-popup', card);
                        imagePopup.open()
                    }
                }
            );

            const cardElement = newCard.generateCard();
            cardsList.addItem(cardElement);
        },

        
    },

    '.cards'    
)
cardsList.renderItems();



// function handleCardClick(card){
//     const imagePopup = new PopupWithImage(
//         'foto-popup',
//         {place: card.place,
//          url: card.url
//         }
//     );
//     imagePopup.open()
// }














forms.forEach(function(form){
    const newForm = new FormValidator(formsData, form.name);
    newForm.activateValidation();
});

// function submitEditProfileForm (evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;

//     closePopup(popupActiveElement);
// };

// export function openPopup(popupActiveElement) {
//     popupActiveElement.classList.add("popup_active");
//     document.addEventListener('keydown', closePopupOnEscape)
// };

// function closePopup() {
//     document.querySelector('.popup_active').classList.remove("popup_active");
//     document.removeEventListener('keydown', closePopupOnEscape);
// };

// function closePopupOnEscape(event){
//     if (event.key === 'Escape'){
//         closePopup()
//     };
// };


// buttonAddCard.addEventListener('click', function () {
//     popupActiveElement = popupAddCard;
//     openPopup(popupActiveElement);
// });

const popupAddCard = new PopupWithForm(
    '#add-foto-popup',
    (values) => {
        values.place = values[0];
        values.url = values[1];
        const newCard = new Card(
            {
                card: values, 
                temlateSelector: '#card-template', 
                handleCardClick: (place, url) => {
                    const imagePopup = new PopupWithImage('#foto-popup', values);
                    imagePopup.open()
                }
            }
        );
        cardsList.addItem(newCard.generateCard());
    }
);
popupAddCard.setEventListeners();


buttonAddCard.addEventListener('click', function () {
    popupAddCard.open()
});



const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    (values) => {
        profileName.textContent = values[0];
        profileJob.textContent = values[1];
    }
);
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupEditProfile.open()
});



// buttonEditProfile.addEventListener('click', function () {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//     popupActiveElement = popupEditProfile;
//     openPopup(popupActiveElement);   
// });


// buttonClosePopup.forEach(function(item) {
//     item.addEventListener('click', function () {
//     closePopup();
//     });
// });

// overlayClosePopup.forEach(function(item) {
//     item.addEventListener('click', function () {
//     closePopup();
//     });
// });


// formAddCard.addEventListener('submit', function(evt){
//     evt.preventDefault();
//     const card = {};
//     card.place = placeNameInput.value;
//     card.url = placeUrlInput.value;
//     renderCard(card);
//     closePopup();
//     formAddCard.reset();
// });

// formEditProfile.addEventListener('submit', submitEditProfileForm);



