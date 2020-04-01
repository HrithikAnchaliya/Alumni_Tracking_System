import React from 'react';
import 'bulma/css/bulma.css';
import './style.css';

export default class Jobs extends React.Component{
    render(){
        return(
            <div id='job'>
                <div style={{width:'320px'}}class="card">
                <header style={{width:'320px',height:'55px'}} class="card-header" >
                <p class=" is-centered card-header-title">
                Jobs Module
                </p>
                <a href="http://localhost:3000/" class="card-header-icon" aria-label="more options">
                <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
                </header>
                <div class="card-content">
                <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="http://localhost:3000/">@bulmaio</a>. <a href="http://localhost:3000/">#css</a> <a href="http://localhost:3000/">#responsive</a>
                <br/>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
                </div>
                <footer style={{width:'320px',height:'50px'}} class="card-footer">
                <a href="http://localhost:3000/" style={{"text-decoration":'none'}}class="card-footer-item">Link</a>
        
                </footer>
                </div>
            </div>
        );
    }
}