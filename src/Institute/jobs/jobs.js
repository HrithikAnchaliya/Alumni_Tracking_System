import React from 'react';
import 'bulma/css/bulma.css';
import './style.css';

export default class Jobs extends React.Component{
    render(){
        return(
            <div id='job'>
                <div style={{width:'320px'}}className="card">
                <header style={{width:'320px',height:'55px'}} className="card-header" >
                <p className=" is-centered card-header-title">
                Jobs Module
                </p>
                <a href="http://localhost:3000/" className="card-header-icon" aria-label="more options">
                <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
                </header>
                <div className="card-content">
                <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="http://localhost:3000/">@bulmaio</a>. <a href="http://localhost:3000/">#css</a> <a href="http://localhost:3000/">#responsive</a>
                <br/>
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
                </div>
                <footer style={{width:'320px',height:'50px'}} className="card-footer">
                <a href="http://localhost:3000/" style={{"textDecoration":'none'}}className="card-footer-item">Link</a>
        
                </footer>
                </div>
            </div>
        );
    }
}