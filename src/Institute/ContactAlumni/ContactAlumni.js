import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import getData from './Utils/data'
import { connect } from 'react-redux'
import { notify_Success_msg, notifyError_with_msg } from  '../Utils/Message'
import { base_url } from '../../Endpoint/endpoint';


class ContactALumni extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            subject : '',
            message : '',
            eventName : '',
            date : '',
            time : '',
            venue : '',
            category : 'inviteMail',
            onFocus : 'custom-email'
        }

        this.changeFocus = this.changeFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeFocus = (event) => {
        this.setState({ onFocus : event.target.id })
    }

    onChange = (event) => {
        this.setState({
        [event.target.name] : event.target.value
    })}

    onSubmit = async (e) => {
        e.preventDefault();
        let _id = this.props.location.aboutProps.profile_id || '5e9b016b9a27f700049c5593' ;
        let data = getData(this.state);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/email?_id=${_id}`, values);
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            notifyError_with_msg(data.err)
        }
        if(response.ok){
        notify_Success_msg("Successfully Done");
        }}
        catch(error){
            notifyError_with_msg('Cannot Send Mail') 
        }
    }

    render(){
        let onFocus = this.state.onFocus
        // console.log(this.props.location.aboutProps.profile_id)
        return(
            <div>
                <div>

                <article id='filter-element'className="panel is-primary">
                <p id='search-filter-element' className="panel-heading">
                    Contact
                </p>

                <p className="panel-tabs">
                   <Link id='custom-email' onClick={this.changeFocus} className={(onFocus === 'custom-email')? ('is-active') : ('not-active')}>Custom Email</Link>

                   <Link id='invite-alumni' onClick={this.changeFocus} className={(onFocus === 'invite-alumni')? ('is-active') : ('not-active')}>Invite Alumni</Link>
                </p>

                <div className="panel-block">
                <form  onSubmit={this.onSubmit}>
                    {  (this.state.onFocus === 'custom-email') ? 
                    (<div>
                    <p className="control has-icons-left">
                    <input onChange={this.onChange} id='focus-on-search' value = {this.state.subject} name = "subject" className="input is-primary" type="text" placeholder="Subject"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>

                    <p className="control has-icons-left">
                    <textarea className='textarea' onChange={this.onChange} id='focus-on-search' value = {this.state.message} name = "message"  type="text" placeholder="Message"></textarea>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>

                    </div>) : (null)}
                    
                    { (this.state.onFocus === 'invite-alumni') ? 
                    (<div>

                    <p className="control has-icons-left">
                    <input onChange={this.onChange} id='focus-on-search' value = {this.state.eventName} name = "eventName" className="input is-primary" type="text" placeholder="Event Name"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>

                    <p className="control has-icons-left">
                    <input onChange={this.onChange} id='focus-on-search' value = {this.state.date} name = "date" className="input is-primary" type="date" placeholder="Date"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>

                    <p className="control has-icons-left">
                    <input onChange={this.onChange} id='focus-on-search' value = {this.state.time} name = "time" className="input is-primary" type="time" placeholder="Time"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>

                    <p className="control has-icons-left">
                    <input onChange={this.onChange} id='focus-on-search' value = {this.state.venue} name = "venue" className="input is-primary" type="text" placeholder="Venue"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>
                    </div>) : (null)}

                    <Button variant="outline-primary" id='search-submit-button' type='submit'>Submit</Button>
                    </form>
                    </div>
                </article> 

                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user : state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (ContactALumni);