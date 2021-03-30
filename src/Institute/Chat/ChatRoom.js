import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import { ChatFeed } from 'react-chat-ui'
import Spinner from 'react-bootstrap/Spinner'
import loadChat, { pushToChat, pushUserChat } from './Utils/data'
import io from 'socket.io-client';
import '../Style/toStyleChat.css'

const ENDPOINT = base_url;


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
        const chatRoomId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/chatrooms/${chatRoomId}`, values);
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true})
            notifyError_with_msg(json.err);
        }console.log(json)
        if(response.ok){ 
            this.setState({ msgData : json, loading : false });
            this.loadMessage();
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true})
            notifyError_with_msg('Unable To Fetch Chat Data');
        }
    }    


    loadMessage = () => {
        let token = this.props.token;
        const chatRoomId = this.props.computedMatch.params.id;
        if(!this.state.loading){
            let msg = loadChat(this.state.msgData);
            this.setState({messages : msg});
            this.socket = io(ENDPOINT);
            this.socket.emit('join', {chatRoomId,token}, (error) => {
                if(error){
                    notifyError_with_msg('Unable to connect to socket');
                }
        });
            this.socket.on('messageToGroup', (message) => {
                let newMsg = pushToChat(message);
                let totalMessages = this.state.messages;
                totalMessages.push(newMsg);
                this.setState({ messages : totalMessages })
            });
    } 
}

    componentWillUnmount(){
        if(this.socket !== undefined){
        this.socket.disconnect();
        this.socket.off(() => {
            console.log("socket is off")
        });
    }}


    setMessage = (event) => {
        this.setState({ message : event.target.value})
    }

    sendMessage = (event) => {
        event.preventDefault();
        if(this.state.message){
            this.socket.emit('messageToGroup', { message : this.state.message }, (error) => {
                if(error){
                    notifyError_with_msg('Unable To Emit From Socket');
                }});
            let userMsg = pushUserChat(this.state.message);
            let totalMessages = this.state.messages;
            totalMessages.push(userMsg);
            this.setState({ messages : totalMessages, message: '' })
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
                     value={this.state.message}
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