import React from 'react';
import Card from 'react-bootstrap/Card';
import {
  Link
} from "react-router-dom";

export default class Eventcard extends React.Component{
    render(){
        let date_convert = new Date(this.props.date)
        let date = date_convert.toDateString()
        return(
            <div>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{this.props.time}</Card.Subtitle>
            <Card.Text>{this.props.subtitle}</Card.Text>
            <Link to={`/events/${this.props.id}`}>Card Link</Link>
            </Card.Body>
            </Card>
        </div>
        );
    }
}
