import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import MessageList from './messageList.js';
import ChatForm from './chatForm.js';
function Chat(props) {
  return (
    <div className="chat">
      <MessageList />
      <ChatForm />
    </div>
  );
}
export default view(Chat);
