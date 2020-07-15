import React from 'react';
import {
    Link
  } from "react-router-dom";

const RoomCard = (props) => {
    return(
            <div className="card">
                <div className="card-content">
                    <p className="title">
                    {props.name}
                    </p>
                </div>
                <footer className="card-footer">
                    <p className="card-footer-item">
                    <span>
                    <Link to={`/chatroom/${props.id}`}>Chat</Link>
                    </span>
                    </p>
                </footer>
            </div>
    )
}

export default RoomCard;