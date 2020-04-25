import React from 'react';
import 'bulma/css/bulma.css';

export default class InterviewPageInfo extends React.Component{
    render(){
        return(
            <div>
                <div id='addjobcontainer' className="container is-fluid">
                    <div className="notification">
                        <hr/>
                <h5>{this.props.company}</h5>
                <span><strong>Title : </strong>{this.props.title}</span><br/>
                        <span><strong>Industry : </strong>{this.props.industry}</span>
                        <hr/>
                        <h5>Description</h5>
                        <p><span>{this.props.description}</span></p>
                        <br/>
                        <span><h5>Difficulty Level : </h5><span>{this.props.difficulty}</span></span>
                        <br/>
                        <br/>
                        <h5>Topics : </h5>
                        <ul>
                        {this.props.topics.map((item,index) => <li key={index}>{item}</li>)}
                        </ul>
                        <h5>Feedback : </h5>
                        <p><span>{this.props.feedback}</span></p>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}
