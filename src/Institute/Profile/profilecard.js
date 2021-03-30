import React from 'react';
import './style.css';
// import {Card} from 'react-bootstrap';
import 'bulma/css/bulma.css'

export default class Profilecard extends React.Component{
    render(){
        return(
            <div style={{width:'290px' , height:'600px'}}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                        <image src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                <image src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{this.props.name}</p>
                                <p className="subtitle is-6">{this.props.website}</p>
                            </div>
                        </div>

                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris. <a href="http://localhost:3000/">@bulmaio</a>.
                            <a href="http://localhost:3000/">#css</a> <a href="http://localhost:3000/">#responsive</a>
                            <br/>
                            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                </div>
            
            </div>
        );
    }
}

