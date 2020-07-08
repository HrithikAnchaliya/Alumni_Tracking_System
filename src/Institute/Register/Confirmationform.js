import React from 'react';
import { combine } from './Utills/data'
import { notifyError_with_msg, notify_Success } from '../Utils/Message'


export default class Confirmationform extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            submitted : false
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
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(combined)
        }
        console.log(values)
        try{
            let user = this.props.values.user
            const response = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/register`,values)
            const json = await response.json()
            if(!response.ok){
                this.setState({ submitted : false })
                notifyError_with_msg(json._message);
            }
            if(response.ok){
            console.log(json)
            notify_Success()
        }}
        catch(error){
            console.log(error)
            this.setState({ submitted : false })
            notifyError_with_msg("Can't Register")
        }
    }



    render(){
        console.log(this.props.values)
        let submitted = this.state.submitted

        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                <div>
                    <h5>Are you sure u wanna register</h5>
                    <p>You can go back and check again if the information given is right</p>
                </div>
                <br/>
                <div>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toFetch} disabled={submitted} type='button'>Submit</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}