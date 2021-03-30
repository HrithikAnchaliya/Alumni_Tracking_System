import React from 'react';
import 'bulma/css/bulma.css';
import './style.css';
import {
    Link
  } from "react-router-dom";


export default class Jobcard extends React.Component{
    render(){
        return(
            <div>
            <div id='job'>
                <div className="card" id='card-job'>
                <header style={{width:'auto',height:'55px'}} className="card-header" > {/* before auto it was 320px */}
                <p className=" is-centered card-header-title" id="job-company-name">
                {this.props.company}
                </p>
                </header>
                <div className="card-content" id="job-card-content">
                <div className="content">
               <strong>As a :   </strong>{this.props.title}<br/>
               <strong>Industry :   </strong>{this.props.industry}<br/>
               <strong>For :   </strong>{this.props.for}<br/>
               <strong>Salary :   </strong>{this.props.salary}<br/>
               {this.props.skills.length !== 0 ? (this.props.skills.map((skill, index) => (
                   <a key={index} href="http://www.google.com">#{skill}</a>
               ))) : (null)}
                <br/>
                </div>
                </div>
                <footer id='footer-card' className="card-footer"> 
                <Link style={{"textDecoration":'none'}} className="card-footer-item" to={`/jobs/${this.props.id}`}>Link</Link>
                </footer>
                </div>
            </div>
            </div>
        );
    }
}