import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import '../Style/toStyleEvent.css';
import { notifyError_with_msg } from  '../Utils/Message'
import Button from 'react-bootstrap/Button'

class EventInfo extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                attended : false,
                error : false
            }
            this.toAttend = this.toAttend.bind(this);
        }

    async toAttend(){
        let locationId = this.props.eventId
        const values = {
            method : "POST",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/events/attend/${locationId}`, values);
        console.log(response)
        if (!response.ok) {
            notifyError_with_msg('Unsuccessful');
        }
        if(response.ok){
        const json = await response.json();
        console.log(json)
        this.setState({
            attended : true
        })
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('Unsuccessful');
        }
    }

    
    render(){
        let toDisable = this.state.attended
        let date_convert = new Date(this.props.date)
        let date = date_convert.toDateString()
        return(
            <div id='event-first-div'> 
                <div className="container is-fluid event-top-div">
                <div className=' notification event-header'>
                    <h1 id='event-title'>{this.props.title}</h1>
                </div>
                </div>
                <div className="container is-fluid">
                <div className=' notification event-sec-div'>
                {(this.props.user === 'alumni') ? (
                        <Button variant="outline-primary" className='attend-button' disabled={toDisable} onClick={this.toAttend} type='button'>Wanna Attend, Click Me!!</Button>) : (null)
                    }
                    <span>
                        <span>{this.props.venue}</span>
                            <br/>
                        <span>{this.props.time}</span><br/>
                        <span>{date}</span>
                    </span>
                </div>
                </div>  
                <br/>
                <div>
                <div className="container is-fluid">
                <div className=' notification event-detail-div'>
                        <p>
                        <strong>Subtitle</strong><br/>
                       <span>{this.props.subtitle}</span>
                        </p>
                        <br/>
                        <p>
                       <strong>Description</strong><br/>
                        </p>
                        <br/>
                        <p>
                        <strong>Organised by</strong><br/>
                       <span>{this.props.organiser}</span>
                        </p>
                </div>
                </div>
                <br/>
                <div className="container is-fluid">
                <div className=' notification event-detail-div'>
                        <p>
                        <strong>Date</strong><br/>
                        <span>{date}</span>
                        </p>
                        <p>
                        <strong>Time</strong><br/>
                        <span>{this.props.time}</span>
                        </p>
                        <p>
                        <strong>Location</strong><br/>
                        <span>{this.props.address} <br/> {this.props.city}</span>
                        </p>
                </div>
                </div>
                </div>
                <br/>
        </div>
        );
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user: state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (EventInfo);