import React from 'react';
import 'bulma/css/bulma.css';

export default class JobPageInfo extends React.Component{
    render(){
        return(
            <div>
                <div id='addjobcontainer' className="container is-fluid">
                    <div  id='jobpage-div-id' className="notification">
                        <hr/>
                 <h5 id='font-change'>{this.props.company}</h5>
                <span id='span-font-change'><strong id='other-font-change'>As a : </strong>{this.props.title}</span><br/>
                        <span id='span-font-change'><strong id='other-font-change'>Industry : </strong>{this.props.industry}</span><br/>
                        <span id='span-font-change'><strong id='other-font-change'>Type : </strong>{this.props.type}</span><br/>
                        <span id='span-font-change'><strong id='other-font-change'>City : </strong>{this.props.city}</span>
                        <hr/>
                        <h5 id='font-change'>Description</h5>
                <strong id='span-font-change'>{this.props.description}</strong>
                        <br/>
                        <br/>
                        <span><h5  id='font-change-id'>Experience Level : </h5><span id='span-font-change'>{this.props.experience}</span></span>
                        <br/>
                        <br/>
                        <h5  id='font-change-id'>Salary Offered : </h5><span id='span-font-change'>{this.props.salary}</span>
                        <br/>
                        <br/>
                        <h5  id='font-change-id'>Skills Required : </h5>
                        <ul>
                        {this.props.skills.map((item,index) => <li id='span-font-change' key={index}>{item}</li>)}
                        </ul>
                        <h5  id='font-change-id'>Qualifications : </h5>
                        <ul>
                        {this.props.qualification.map((item,index) => <li id='span-font-change' key={index}>{item}</li>)}
                        </ul>
                        <h5  id='font-change-id'>External Link : </h5><span><a href={this.props.link}>Link</a></span>
                    </div>
                </div>
            </div>
        )
    }
}