import React from 'react';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { notifyError_with_msg, notify_Success_msg } from '../Utils/Message'


class CreateCollege extends React.Component{
    constructor(props){
        super()
        this.state = {
            email : '',
            password : '',
            collegeName : ''
        }
    }

    onChangeInput = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        let { email, password, collegeName } = this.state;
        let data = { email, password, collegeName };
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/college`, values); 
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            notifyError_with_msg(data.err)
        }
        if(response.ok){
        notify_Success_msg("Successfully Added");
        }}
        catch(error){
            notifyError_with_msg('Cannot Add College') 
        }
    }

    render(){
        return(
            <div className="container is-fluid">
                <div id = 'addevent-div-id' className="notification">

                    <form onSubmit={this.onSubmit}>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                        <input  className="input" type="mail" required placeholder="Email" name='email' onChange={this.onChangeInput}></input>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                        <input  className="input" type="password" required placeholder="Password" name='password' onChange={this.onChangeInput}></input>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">College Name</label>
                        <div className="control">
                        <input  className="input" type="text" required placeholder="Name Of The College" name='collegeName' onChange={this.onChangeInput}></input>
                        </div>
                    </div>

                    <Button variant="outline-dark" type='submit'>Submit</Button>

                    </form>

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


export default connect(mapStatesToProps,null) (CreateCollege);

