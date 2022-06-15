import '../pages/index.css';

import { Api } from '../components/Api.js';
import {
        buttonEditProfile, 
        nameInput, 
        jobInput, 
        buttonAddCard, 
        forms, 
        formEditProfile,
        buttonEditAvatar,
        formAddCard,
        formsData,
        formEditAvatar,
        } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
    headers: {
      authorization: 'a8aa5636-0a20-425d-9a78-90b6247fe762',
      'Content-Type': 'application/json'
    }
});

const cardsList = new Section(
    {
        renderer: (card, userId) => {            
            cardsList.addItem(createCard(card, userId));
        },
    },

    '.cards'    
);


Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then(([initialCards, info]) => {
        profileInfo.setUserInfo(info);

        cardsList.renderItems(initialCards.reverse(), info._id);
    })
    .catch(err => alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`));


const profileInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        infoSelector: '.profile__description',
        avatarSelector: '.profile__img'
    }
);


const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    ({name, info}) => {
        api.changeProfileInfo({name, about: info})
            .then((res) => {
                profileInfo.setUserInfo(res);                
                popupEditProfile.close();
                popupEditProfile.toggleButtonText('Сохранить');
            })
            .catch(err => {
                popupEditProfile.toggleButtonText(`${err}, Попробуйте еще раз`);
            });
    }
);
popupEditProfile.setEventListeners();




const popupEditAvatar = new PopupWithForm(
    '#edit-avatar-popup',
    ({name}) => {
        api.changeProfileAvatar({avatar: name})
        .then((res) => {
            profileInfo.setUserInfo(res);
            popupEditAvatar.close();
            popupEditAvatar.toggleButtonText('Сохранить');
        })
        .catch(err => {
            popupEditProfile.toggleButtonText(`${err}, Попробуйте еще раз`);
        });
    }
);
popupEditAvatar.setEventListeners();



const popupAddCard = new PopupWithForm(
    '#add-foto-popup',
    ({name, info}) => {
        api.createNewCard({name, link: info})
            .then((res) => {
                cardsList.addItem(createCard(res, profileInfo.userId));
                popupAddCard.close();
                popupAddCard.toggleButtonText('Создать');
            })
            .catch(err => {
                popupEditProfile.toggleButtonText(`${err}, Попробуйте еще раз`);
            });
    }
);
popupAddCard.setEventListeners();



const imagePopup = new PopupWithImage('#foto-popup');
imagePopup.setEventListeners();   

const formCard = new FormValidator(formsData, 'add-card');
formCard.activateValidation();

const formProfile = new FormValidator(formsData, 'edit-profile');
formProfile.activateValidation();

const formAvatar = new FormValidator(formsData, 'edit-avatar');
formAvatar.activateValidation();




const popupDeleteCard = new PopupDeleteCard(
    '#delete-card-popup',
    (newCard) => {
        api.deleteCard(newCard._id)
            .then(() => {
                newCard.remove();
                popupDeleteCard.close();
                popupDeleteCard.toggleButtonText('Да');
            })
            .catch(err => {
                popupEditProfile.toggleButtonText(`${err}, Попробуйте еще раз`);
            });
    }
);
popupDeleteCard.setEventListeners();


function createCard(data, userId){

    const newCard = new Card(
        {
            card: data, 
            userId: userId,
            temlateSelector: '#card-template', 
            handleCardClick: (name, link) => {
                imagePopup.open(name, link)
            },
            handleCardLike: (id, method) => {
                api.setCardLike(id, method)
                    .then((res) => {
                        newCard.setLikeCounter(res)
                    })
                    .catch(err => alert(`${err}, Попробуйте еще раз`));
            },
            handleCardDelete: (newCard) => {
                popupDeleteCard.open(popupDeleteCard.setCardtoDelete(newCard))
            },
        }
    );
    const cardElement = newCard.generateCard(data);
    
    return cardElement;
};




buttonAddCard.addEventListener('click', function () {
    formCard.resetValidation();

    popupAddCard.open();
});


buttonEditProfile.addEventListener('click', function () {
    formProfile.resetValidation();

    const { name, info } = profileInfo.getUserInfo();

    nameInput.value = name;
    jobInput.value = info;

    popupEditProfile.open();
});


buttonEditAvatar.addEventListener('click', function () {
    formAvatar.resetValidation();

    popupEditAvatar.open();
});
