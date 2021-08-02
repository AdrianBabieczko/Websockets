let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

function login(event) {
    event.preventDefault();

    if (userNameInput.value !== '') {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
    else {
        alert('User name not valid!!');
    }
};

function sendMessage(event) {
    event.preventDefault();

    if (messageContentInput.value !== '') {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
    else {
        alert('Can not send empty message');
    }
};

function addMessage(author, content) {
    var li = document.createElement('li');

    li.appendChild(document.createTextNode(content));
    messagesList.appendChild(li);

};