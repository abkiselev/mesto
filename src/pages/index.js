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

// import { initialCards } from '../utils/cards.js';
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
        // data: initialCards,        
        renderer: (card, userId) => {            
            cardsList.addItem(createCard(card, userId));
        },
    },

    '.cards'    
);

// api.getInitialCards()    
//     .then((cards) => {
//         return cards;
//     })
//     .then((cards) => {
//         api.getProfileInfo();
//     })
//     .then((cards) => {
//         cardsList.renderItems(cards.reverse());
//     })

Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then((res) => {
        console.log(res);
        profileInfo.setUserInfo(res[1]);
        profileInfo.setUserAvatar(res[1]);
        profileInfo.getUserId(res[1]);

        cardsList.renderItems(res[0].reverse(), res[1]._id);
    })


const profileInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        infoSelector: '.profile__description',
        avatarSelector: '.profile__img'
    }
);

// api.getProfileInfo()
//     .then((res) =>{
//         profileInfo.setUserInfo(res);
//         profileInfo.setUserAvatar(res);
//         profileInfo.getUserId(res);
//     })


const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    ({name, info}) => {
        api.changeProfileInfo({name, about: info})
            .then((res) => {
                profileInfo.setUserInfo(res);
                popupEditProfile.toggleButtonText();
            })
        
        popupEditProfile.close();
        
    }
);
popupEditProfile.setEventListeners();




const popupEditAvatar = new PopupWithForm(
    '#edit-avatar-popup',
    ({name}) => {
        api.changeProfileAvatar({avatar: name})
        .then((res) => {
            profileInfo.setUserAvatar(res);
            popupEditAvatar.toggleButtonText();
        })

        popupEditAvatar.close();
    }
);
popupEditAvatar.setEventListeners();






// console.log(api.getProfileInfo())

// const cardsList = new Section(
//     {
//         data: initialCards,        
//         renderer: (card) => {            
//             cardsList.addItem(createCard(card));
//         },
//     },

//     '.cards'    
// )
// cardsList.renderItems();


const popupAddCard = new PopupWithForm(
    '#add-foto-popup',
    ({name, info}) => {
        api.createNewCard({name, link: info})
            .then((res) => {
                cardsList.addItem(createCard(res, profileInfo.userId));
                
            })
            
        popupAddCard.close();
        
    }
);
popupAddCard.setEventListeners();







const imagePopup = new PopupWithImage('#foto-popup');

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
                popupDeleteCard.toggleButtonText();
            })

        popupDeleteCard.close();
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
            handleCardLike: (id) => {
                api.setCardLike(id)
            },
            handleCardDelete: (newCard) => {
                popupDeleteCard.open(newCard)
            },
        }
    );
        // console.log(newCard)
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


buttonEditAvatar.addEventListener('click', function () {
    formAvatar.hideError(formEditAvatar.querySelector('.popup__input'))

    formAvatar.disableSubmitButton();

    popupEditAvatar.open();
});
