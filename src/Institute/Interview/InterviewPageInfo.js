import React from 'react';
import 'bulma/css/bulma.css';

export default class InterviewPageInfo extends React.Component{
    render(){
        return(
            <div id='interview-div'>
                <div className="container is-fluid">
                    <div className="notification interview-first-div">
                        <h2 id='interview-title'>{this.props.company}</h2>
                        <span><strong>Title : </strong>{this.props.title}</span><br/>
                        <span><strong>Industry : </strong>{this.props.industry}</span>
                    </div>
                </div>
                <br/>
                <div className="container is-fluid">
                    <div className="notification interview-first-div">
                        <p>
                        <strong>Description</strong><br/>
                        <span>{this.props.description}</span>
                        </p>
                        <p>
                        <strong>Difficulty Level</strong><br/>
                        <span>{this.props.difficulty}</span>
                        </p>
                        <p>
                        <strong>Topics</strong>
                        <ul>
                        {this.props.topics.map((item,index) => <span><li key={index}>#{item}</li></span>)}
                        </ul>
                        </p>
                        <p>
                        <strong>Feedback</strong><br/>
                        <span>{this.props.feedback}</span>
                        </p>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}
