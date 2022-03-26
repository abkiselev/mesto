let editProfile = document.querySelector('.profile__edit-button');
let addFoto = document.querySelector('.add-button');
let like = document.querySelectorAll('.like');
let closePopup = document.querySelector('.popup__close');
let savePopup = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_descr');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


editProfile.addEventListener('click', function () {
    popup.classList.add("popup_active");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

closePopup.addEventListener('click', function () {
    popup.classList.remove("popup_active");
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 

savePopup.addEventListener('click', function () {
    popup.classList.remove("popup_active");
});


like.forEach(function(like) {
    like.addEventListener('click', function () {
        like.classList.toggle("like_active");
    })
});
