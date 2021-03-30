import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { notify_Success, notifyError_with_msg } from  '../Utils/Message'

class CreateChat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        this.setState({ name : event.target.value })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let data = {name : this.state.name};
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/chatrooms/`, values);
        const json = await response.json();
        if (!response.ok) {
            notifyError_with_msg(json.err);
        }console.log(json)
        if(response.ok){ 
            notify_Success("Chatroom")
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unable To Create Chatroom');
        }
    }


    render(){
        return(
            <div>
                 <div className="container is-fluid">
                    <div className="notification">
                        <form onSubmit={this.onSubmit}>
                        <h4>Enter The Name Of The Chatroom You Wanna Create.</h4>
                        <br/>
                       <input name='name' onChange={this.onChange}></input>
                       <br/>
                       <button type='submit'>Submit</button>
                       </form>
                    </div>
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


export default connect(mapStatesToProps,null) (CreateChat);