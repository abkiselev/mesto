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
        renderer: (card) => {            
            cardsList.addItem(createCard(card));
        },
    },

    '.cards'    
);

const initialCards = new Promise((resolve, reject) => {
    return resolve(api.getInitialCards())
})

initialCards.then((cards) => {
    // cardsList.data = cards;
    cardsList.renderItems(cards);
})

// cardsList.renderItems();



const profileInfo = new Promise((resolve, reject) => {
    return resolve(api.getProfileInfo())
})

profileInfo.then((info) => {
    profileInfo2.setUserInfo(info)
    profileInfo2.setUserAvatar(info)
})

const profileInfo2 = new UserInfo(
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
        profileInfo2.setUserInfo({name, about: info});
        popupEditProfile.close();
    }
);
popupEditProfile.setEventListeners();




const popupEditAvatar = new PopupWithForm(
    '#edit-avatar-popup',
    ({name}) => {
        profileInfo2.setUserAvatar({avatar: name});
        api.changeProfileAvatar({avatar: name});
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
        cardsList.addItem(createCard({name, link: info}));
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




// const popupDeleteCard = new PopupDeleteCard(
//     '#delete-card-popup',
//     (data) => {
//         // cardsList.addItem(createCard({place: data.name, url: data.info}));
//         data.remove()
//         popupDeleteCard.close();
//     }
// );
// popupDeleteCard.setEventListeners();


function createCard(data){

    const newCard = new Card(
        {
            card: data, 
            temlateSelector: '#card-template', 
            handleCardClick: (name = data.name, link = data.info) => {
                imagePopup.open(place, url)
            },
            handleCardLike: (id) => {
                api.setCardLike(id)
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

    nameInput.value = profileInfo2.getUserInfo().name;
    jobInput.value = profileInfo2.getUserInfo().info;

    popupEditProfile.open();
});


buttonEditAvatar.addEventListener('click', function () {
    formAvatar.hideError(formEditAvatar.querySelector('.popup__input'))

    formAvatar.disableSubmitButton();

    popupEditAvatar.open();
});
