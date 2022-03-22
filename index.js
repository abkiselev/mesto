let editProfile = document.querySelector('.edit-button');
let addFoto = document.querySelector('.add-button');
let like = document.querySelectorAll('.like');
let closePopup = document.querySelector('.popup__close');
let savePopup = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('form');
let nameInput = document.querySelector('.input-name');
let jobInput = document.querySelector('.input-descr');


editProfile.addEventListener('click', function () {
    popup.classList.add("popup_active");
});

closePopup.addEventListener('click', function () {
    popup.classList.remove("popup_active");
});


like.forEach(function(like) {
    like.addEventListener('click', function () {
        like.classList.toggle("like_active");
    })
});


function formSubmitHandler (evt) {
    evt.preventDefault();

        nameInput = nameInput.value;
        jobInput = jobInput.value;

        let profileName = document.querySelector('.profile__name');
        let profileJob = document.querySelector('.profile__description');

        profileName.textContent = nameInput;
        profileJob.textContent = jobInput;
}

formElement.addEventListener('submit', formSubmitHandler); 

savePopup.addEventListener('click', function () {
    popup.classList.remove("popup_active");
});

