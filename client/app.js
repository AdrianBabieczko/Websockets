let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({author, content}) => addMessage(author, content));

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

    let messageContent = messageContentInput.value;

    if (messageContent !== '') {
        addMessage(userName, messageContent);
        socket.emit('message', {author: userName, content: messageContent});
        messageContentInput.value = '';
    }
    else {
        alert('Can not send empty message');
    }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');

    const messageAuthor = document.createElement('h3');
    messageAuthor.classList.add('message__author');

    if (author == userName) {
        message.classList.add('message--self');
        messageAuthor.textContent = 'You';
    }
    else {
        messageAuthor.textContent = author;
    }

    const messageContent = document.createElement('div');
    messageContent.classList.add('message__content');
    messageContent.textContent = content;

    message.appendChild(messageAuthor);
    message.appendChild(messageContent);

    messagesList.appendChild(message);
};