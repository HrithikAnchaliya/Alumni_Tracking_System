import React from 'react';
import 'bulma/css/bulma.css';
import './style.css';
// import Jobs from './jobs.js';


export default class Addjobs extends React.Component{
    render(){

        let pageurl = null;
        pageurl = window.location.href;
        console.log(pageurl);
        return(
            <div>
                <div id='addjobcontainer' className="container is-fluid">
                <div className="notification">

                </div>
                </div>
            </div>
        );
    }
}
