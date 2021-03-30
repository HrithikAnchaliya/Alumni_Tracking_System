import React from 'react';
import 'bulma/css/bulma.css';
import {
    Link
  } from "react-router-dom";


export default class Interviewcard extends React.Component{
    render(){
        console.log(this.props.topic)
        return(
            <div>
            <div id='interview'>
                <div style={{width:'320px'}}className="card" id="interview-card">
                <header style={{width:'320px',height:'55px'}} className="card-header" >
                <p className=" is-centered card-header-title" id="companyName-interview">
                {this.props.company}
                </p>
                </header>
                <div className="card-content" id="interview-card-content">
                <div className="content">
               <strong>Title:   </strong>{this.props.title}<br/>
               <strong>Industry :   </strong>{this.props.industry}<br/>
               <strong>Difficulty   :    </strong>{this.props.difficulty}<br/>
               {this.props.topic.map((item,index) => <a key={index} href="http://www.google.com"> #{item} </a>)}
                <br/>
                </div>
                </div>
                <footer style={{width:'320px',height:'50px'}} className="card-footer">
                <Link style={{"textDecoration":'none'}} className="card-footer-item" to={`/interviews/${this.props.id}`}>Link</Link>
        
                </footer>
                </div>
            </div>
            </div>
        );
    }
}