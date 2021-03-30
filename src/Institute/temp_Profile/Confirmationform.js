import React from 'react';
import { combine } from './Utills/data'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { base_url} from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'


class Confirmationform extends React.Component{
    constructor (props) {
        super(props)

        this.state = {
            submitted : false,
            redirect : false
        }

        this.toFetch = this.toFetch.bind(this)
      }


    toGoBack = () => {
        this.props.goBack();
    }


    async toFetch() {
        this.setState({ submitted : true })
        let combined = combine(this.props.values);
        console.log(combined);
        const values = {
            method : "PATCH",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token,
            },
            body : JSON.stringify(combined)
        }
        console.log(values)
        try{
            const response = await fetch(`${base_url}/${this.props.user}/profile`,values);
            const json = await response.json()
            if(!response.ok) {
                notifyError_with_msg(json._message);
                this.setState({ submitted : false })
            }
            if(response.ok){
            console.log(json)
            this.setState({ redirect : true })
        }}
        catch(error){
            console.log(error)
            this.setState({ submitted : false })
            notifyError_with_msg("Can't Submit");
        }
    }



    render(){
        console.log(this.props.values)
        let submitted = this.state.submitted
        let Redirects = this.state.redirect;
        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                <div>
                    <h5>Are you sure u wanna do this ?</h5>
                    <p>You can go back and check again if the information given is right</p>
                </div>
                <br/>
                <div>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toFetch} disabled={submitted} type='button'>Submit</button>
                </div>
                </div>
                </div>
                    { (Redirects) ? (
                        <Redirect to='/user' /> ) : (null)
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


export default connect(mapStatesToProps,null) (Confirmationform);