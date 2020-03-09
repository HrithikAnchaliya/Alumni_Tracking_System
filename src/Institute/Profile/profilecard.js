import React from 'react';
import './style.css';
import {Card} from 'react-bootstrap';
export default class Profilecard extends React.Component{
    render(){
        return(
            <div>
                <Card style={{ width: '12rem' }}>
                <Card.Img style={{height:'12rem'}}variant="top" src="http://tineye.com/images/widgets/mona.jpg" />
                <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Text>{this.props.website}</Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
              
            </div>
        );
    }
}

