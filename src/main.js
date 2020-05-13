import './css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './js/chat.js';

ReactDOM.render(<Chat />, document.getElementById('root'));
window.onsubmit = function () {
  return false;
};
