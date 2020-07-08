import React from 'react';
import './Style/InputStyle.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="formChat">
    <input
      className="inputChat"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={setMessage}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;