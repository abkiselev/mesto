import '../pages/index.css';

import { initialCards } from '../components/cards.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator, formsData } from '../components/FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_descr');

const buttonAddCard = document.querySelector('.profile__add-button');

const forms = Array.from(document.querySelectorAll('.popup__form'));


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


const profileInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        infoSelector: '.profile__description'
    }
);


const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    (values) => {
        profileInfo.setUserInfo(values)
    }
);
popupEditProfile.setEventListeners();



forms.forEach(function(form){
    const newForm = new FormValidator(formsData, form.name);
    newForm.activateValidation();
});


buttonAddCard.addEventListener('click', function () {
    popupAddCard.open()
});

buttonEditProfile.addEventListener('click', function () {
    nameInput.value = profileInfo.getUserInfo().name;
    jobInput.value = profileInfo.getUserInfo().info;
    popupEditProfile.open()
});


