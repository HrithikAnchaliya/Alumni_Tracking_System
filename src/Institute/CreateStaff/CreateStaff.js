import React from 'react';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { base_url } from './../../Endpoint/endpoint';
import { notifyError_with_msg, notify_Success_msg } from  '../Utils/Message'

class CreateStaff extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            facultyName : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }
    
    onSubmit = async () => {
        let { email, facultyName } = this.state
        let data =  { email, facultyName }
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        let response = await fetch(`${base_url}/${this.props.user}/faculty`,values)
        let json = await response.json();
        if(!response.ok){
            notifyError_with_msg(json.err);
        }
        if(response.ok){
            notify_Success_msg("Successfully Created");
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg("Unsuccessful To Create");
        }
    }


    render(){
        return(
            <div className="container is-fluid">
                <div id = 'addCollegeChat-div-id' className="notification">

                    <div className='box'>

                    <div className="field">
                        <label className="label">Faculty Name</label>
                        <div className="control">
                        <input  className="input" type="text" required placeholder="Name" name='facultyName' onChange={this.onChange}></input>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                        <input  className="input" type="mail" required placeholder="Email" name='email' onChange={this.onChange}></input>
                        </div>
                    </div>

                    <Button variant="outline-dark"  onClick={this.onSubmit} type='button'>Submit</Button>

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


export default connect(mapStatesToProps,null) (CreateStaff);
