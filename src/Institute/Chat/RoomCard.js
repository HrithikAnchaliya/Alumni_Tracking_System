import React from 'react';
import {
    Link
  } from "react-router-dom";
import '../Style/toStyleChat.css'

const RoomCard = (props) => {
    return(
            <div className="card" id='chat-card'>
                <div className="card-content">
                    <p className="title">
                    {props.name}
                    </p>
                </div>
                <footer className="card-footer" id='chat-card-footer'>
                    <p className="card-footer-item">
                    <span>
                    <Link to={`/chat/${props.id}`}>Chat</Link>
                    </span>
                    </p>
                </footer>
            </div>
    )
}

export default RoomCard;