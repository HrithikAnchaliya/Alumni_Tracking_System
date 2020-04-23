import React from 'react';
import 'bulma/css/bulma.css';

export default class JobPageInfo extends React.Component{
    render(){
        return(
            <div>
                <div id='addjobcontainer' className="container is-fluid">
                    <div className="notification">
                        <hr/>
                <h5>{this.props.company}</h5>
                <span><strong>As a : </strong>{this.props.title}</span><br/>
                        <span><strong>Industry : </strong>{this.props.industry}</span><br/>
                        <span><strong>Type : </strong>{this.props.type}</span><br/>
                        <span><strong>City : </strong>{this.props.city}</span>
                        <hr/>
                        <h5>Description</h5>
                <span>{this.props.description}</span>
                        <br/>
                        <br/>
                        <span><h5>Experience Level : </h5><span>{this.props.experience}</span></span>
                        <br/>
                        <br/>
                        <h5>Salary Offered : </h5><span>{this.props.salary}</span>
                        <br/>
                        <br/>
                        <h5>Skills Required : </h5>
                        <ul>
                        {this.props.skills.map((item,index) => <li key={index}>{item}</li>)}
                        </ul>
                        <h5>Qualifications : </h5>
                        <ul>
                        {this.props.qualification.map((item,index) => <li key={index}>{item}</li>)}
                        </ul>
                        <h5>External Link : </h5><span><a href={this.props.link}>Link</a></span>
                    </div>
                </div>
            </div>
        )
    }
}