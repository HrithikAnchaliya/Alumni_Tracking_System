import React from 'react';
import './style.css';
// import {Card} from 'react-bootstrap';
import 'bulma/css/bulma.css'
export default class Profilecard extends React.Component{
    render(){
        return(
            <div style={{width:'290px' , height:'600px'}}>
            <div class="card">
            <div class="card-image">
            <figure class="image is-4by3">
            <image src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
            </figure>
            </div>
            <div class="card-content">
            <div class="media">
            <div class="media-left">
            <figure class="image is-48x48">
            <image src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
            </figure>
            </div>
            <div class="media-content">
            <p class="title is-4">{this.props.name}</p>
            <p class="subtitle is-6">{this.props.website}</p>
            </div>
            </div>

            <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br/>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
            </div>
            </div>
            
            </div>
        );
    }
}

