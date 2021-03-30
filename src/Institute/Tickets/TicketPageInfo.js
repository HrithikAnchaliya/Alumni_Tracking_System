import React from 'react';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg, notify_Success_msg } from  '../Utils/Message'

class TicketPageInfo extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                close : false,
                message: ''
            }
            this.toPost = this.toPost.bind(this);
            this.onMessageChange = this.onMessageChange.bind(this);
        }   

    onMessageChange(event) {
        this.setState({
            message: event.target.value
        });
        console.log(this.state);
    }

    async toPost(event){
        let data = {"status" : event.target.id, "message": this.state.message}
        let TicketId = this.props.ticket._id
        const values = {
            method : "PATCH",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token,
            },
            body : JSON.stringify(data)
        }
        console.log(values);
        try{
        const response = await fetch(`${base_url}/${this.props.user}/tickets/${TicketId}`, values);
        console.log(response)
        if (!response.ok) {
            notifyError_with_msg(response.error._message);
        }
        if(response.ok){
        const json = await response.json();
        console.log(json)
        this.setState({ close : true })
        notify_Success_msg(`Ticket updated successfully.`)
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unsuccessful');
        }
    }

    render(){
        let { status, title, subTitle, description, postedBy } = this.props.ticket
        let toDisable = this.state.close
        return(
            <div>
                    <div className="container is-fluid">
                        <div id='background-white' className="notification">
                        <span>
                        <label>{postedBy.firstName}</label>
                            <br/>
                        <label>{postedBy.lastName}</label>
                        <br/>
                        <span>{status}</span><br/>
                    </span>
                        </div>
                    </div>

                 <div className="container is-fluid">
                    <div  id='background-white' className="notification">
                        <p>
                        <strong id='tickatpage-id'>Title</strong><br/>
                       <label>{title}</label>
                        </p>
                        <p>
                        <strong id='tickatpage-id'>Subtitle</strong><br/>
                       <label>{subTitle}</label>
                        </p>
                        <p>
                       <strong id='tickatpage-id'>Description</strong><br/>
                       <label>{description}</label>
                        </p>
                        <br/>

                        <div className="field">
                            <div className="control">
                                <textarea 
                                    className="textarea is-hovered"
                                    placeholder="Enter message if you want to send mail."
                                    onChange={this.onMessageChange}
                                    >  
                                </textarea>
                            </div>
                        </div>

                        {((this.props.user === 'college') ) ? (
                            
                            <div class="field is-grouped">
                                <div class="control">
                                <Button variant="outline-dark" id='closed'  onClick={this.toPost} type='button'>Close Ticket</Button>
                                </div>
                                <div class="control">
                                <Button variant="outline-dark" id='onProgress' disabled={toDisable} onClick={this.toPost} type='button'>Set Ticket To On-Progress</Button>
                                </div>
                            </div>

                        ) : (null)
                        
                        }
                    </div>
                 </div>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user: state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (TicketPageInfo);