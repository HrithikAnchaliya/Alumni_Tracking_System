import React from 'react';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <div className="container is-fluid">
                <div className="notification">
                    <span><span>Add Events</span>
                    <Link to='/addevent'>Add-Event</Link></span>
                    <br/>
                    <span><span>Add Funds</span>
                    <Link to='/addfund'>Add-Funds</Link></span>
                    <br/>
                    <span><span>Add Newletter</span>
                    <Link to='/addnewsletter'>Add-Newsletter</Link></span>
                </div>
                </div>
            </div>
        )
    }
}