import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

class Top extends React.Component{
    render(){
        return(
            <div>
            <div id="navbar">
                <ul id="nav">
                    <li><a className="a" href='https://www.google.com/'>Home</a></li>
                    <li><a  className="b" href='https://www.google.com/'>Profile</a></li>
                    <li><a className="c" href='https://www.google.com/'>Pricing</a></li>
                    <li id='sch'>Search..</li>
                </ul>
            </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Top/>, 
    document.getElementById('root')
);