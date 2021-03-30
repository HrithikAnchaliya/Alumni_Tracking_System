import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

const TicketCard = (props) => {
    return(
        <div>
            <Card
                bg="dark"
                text='white'
                style={{ width: '18rem' }}
                className="mb-2">

                <Card.Header>Ticket</Card.Header>
                <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.sub}
                </Card.Text>
                <Link to={`/tickets/${props.id}`}>Link</Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TicketCard; 