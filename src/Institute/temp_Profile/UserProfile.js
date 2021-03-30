import React from 'react';
import UserInfo from './UserInfo';
import { connect } from 'react-redux' 
import {  base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import Spinner from 'react-bootstrap/Spinner'

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all : '',
            loading : true,
            error  : false
        }
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/profile`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({
            all : json,
            loading : false    
        })
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg("Unable to fetch");
        }
    }


    render(){
        return(
            <div>
                { this.state.loading || !this.state.all ?
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : (
                    <div>
                        <UserInfo
                        json={this.state.all}/> 
                    </div>
                ) }

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


export default connect(mapStatesToProps,null) (UserProfile);