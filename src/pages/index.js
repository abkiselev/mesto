import '../pages/index.css';

import {
        buttonEditProfile, 
        nameInput, 
        jobInput, 
        buttonAddCard, 
        forms, 
        formEditProfile,
        formAddCard,
        formsData,
        } from '../utils/constants.js';

import { initialCards } from '../utils/cards.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';




const cardsList = new Section(
    {
        data: initialCards,        
        renderer: (card) => {            
            cardsList.addItem(createCard(card));
        },
    },

    '.cards'    
)
cardsList.renderItems();


const popupAddCard = new PopupWithForm(
    '#add-foto-popup',
    (data) => {
        cardsList.addItem(createCard({place: data.name, url: data.info}));
        popupAddCard.close();
    }
);
popupAddCard.setEventListeners();


const profileInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        infoSelector: '.profile__description'
    }
);


const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    ({name, info}) => {
        profileInfo.setUserInfo({name, info});
        popupEditProfile.close();
    }
);
popupEditProfile.setEventListeners();

const imagePopup = new PopupWithImage('#foto-popup');

const formCard = new FormValidator(formsData, 'add-card');
formCard.activateValidation();

const formProfile = new FormValidator(formsData, 'edit-profile');
formProfile.activateValidation();


function createCard(data){

    const newCard = new Card(
        {
            card: data, 
            temlateSelector: '#card-template', 
            handleCardClick: (place = data.name, url = data.info) => {
                imagePopup.open(place, url)
            }
        }
    );

    const cardElement = newCard.generateCard();
    return cardElement;
};


buttonAddCard.addEventListener('click', function () {
    formAddCard.querySelectorAll('.popup__input').forEach((field) => {
        formCard.hideError(field)
    });

    formCard.disableSubmitButton();

    popupAddCard.open();
});


buttonEditProfile.addEventListener('click', function () {
    
    formEditProfile.querySelectorAll('.popup__input').forEach((field) => {
        formProfile.hideError(field)
    });

    formProfile.disableSubmitButton();

    nameInput.value = profileInfo.getUserInfo().name;
    jobInput.value = profileInfo.getUserInfo().info;

    popupEditProfile.open();
});

