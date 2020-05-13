import React, { Component } from 'react';
import { view, store } from '@risingstack/react-easy-state';
const messageState = store({
  message: '',
  username: '',
  usernameEntered: false,
});
import state from './store.js';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('connect', (data) => {
  socket.emit('get_id', (data) => {
    state.id = data;
  });
});
socket.on('add_mess', (data) => {
  state.messages.push(data);
});
function ChatForm(props) {
  function setName() {
    messageState.username = event.target.value;
  }
  function writeMessage() {
    messageState.message = event.target.value;
  }
  function submitMessage() {
    if (!/^\s+$/.test(messageState.message) && messageState.message !== '') {
      if (
        !/^\s+$/.test(messageState.username) &&
        messageState.username !== ''
      ) {
        socket.emit('set_name', messageState.username);
        messageState.usernameEntered = true;
      }
      socket.emit('new_message', messageState.message, (data) => {
        console.log(data);
      });
      messageState.message = '';
    }
  }
  return (
    <form class="message-form">
      <input
        type="text"
        value={messageState.username}
        onChange={setName}
        type="text"
        placeholder="Введите имя"
        className="message-form__name"
        disabled={messageState.usernameEntered}
      />
      <input
        value={messageState.message}
        onChange={writeMessage}
        type="text"
        placeholder="Введите сообщение"
        className="message-form__text"
      />
      <button onClick={submitMessage} className="message-form__button">
        Отправить
      </button>
    </form>
  );
}
export default view(ChatForm);
