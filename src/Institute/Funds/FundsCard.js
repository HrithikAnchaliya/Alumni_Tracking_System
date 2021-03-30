import React from 'react';
import Card from 'react-bootstrap/Card';
import {
  Link
} from "react-router-dom";

export default class Fundscard extends React.Component{
    render(){
        return(
            <div id='fund-card-div' >
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Total Raised</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{this.props.Raised}</Card.Subtitle>
            <Card.Text>{this.props.subtitle}</Card.Text>
            <Link to={`/funds/${this.props.id}`}>Card Link</Link>
            </Card.Body>
            </Card>
        </div>
        );
    }
}
