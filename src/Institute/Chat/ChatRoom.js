import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import { ChatFeed } from 'react-chat-ui'
import Spinner from 'react-bootstrap/Spinner'
import loadChat from './Utils/data'
import '../Style/toStyleChat.css'

class ChatRoom extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading : true,
            error : false,
            msgData : null,
            messages : [],
            message : null
        }
        this.loadMessage = this.loadMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount = async () => {
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/chatrooms/5eff17cd74b16f000407db87`, values);
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true})
            notifyError_with_msg(json._message);
        }console.log(json)
        if(response.ok){ 
            this.setState({ msgData : json, loading : false });
            this.loadMessage();
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true})
            notifyError_with_msg('Unable to Chat Data');
        }
    }    


    loadMessage = () => {
        if(!this.state.loading){
            let msg = loadChat(this.state.msgData);
            this.setState({messages : msg})
        }
    }   

    setMessage = (event) => {
        this.setState({ message : event.target.value})
    }

    sendMessage = (event) => {
        // in reactjs keyPress function refreshes the page
        event.preventDefault();
        if(this.state.message){
            // socket.emit('sendMessage', message, () => setMessage('') );
            console.log(this.state.message)
        }
        
    }


render(){
    // console.log(this.state.messages)
    let loading = this.state.loading
    let error = this.state.error
    return(
        <div>
                {!loading ? 
                (
                    <div className="container is-fluid">
                    <div className="notification"id="chatroom-div">
                        <ChatFeed
                        messages={this.state.messages}
                        showSenderName
                        bubblesCentered={false}
                        // JSON: Custom bubble styles
                        bubbleStyles={
                        {
                            text: {
                            fontSize: 25
                            },
                            chatbubble: {
                            borderRadius: 50,
                            padding: 20
                            }
                        }
                        }
                    />
                    <input 
                     type="text"
                     placeholder="Type a message..."
                     defaultValue={this.state.message}
                     onChange={this.setMessage}></input>
                    <button className="sendButton" onClick={this.sendMessage}>Send</button>
                  </div>
                  </div>
                ) : (
                    (!error) ? (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>) : (null)
                )
                }
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

export default connect(mapStatesToProps,null) (ChatRoom);