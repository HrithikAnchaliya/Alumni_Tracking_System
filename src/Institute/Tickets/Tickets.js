import React from 'react';
import {  base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import TicketCard from './TicketCard';

class Tickets extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tickets:null,
            loading:true,
            error:false
        }
    }

    componentDidMount = async () => {
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/tickets`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({ tickets:json, loading : false })
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg('Unable to Fetch');
        }
    }

    render(){
        console.log(this.state.tickets);
        return(
            <div>
                <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {!this.state.loading ? 
                (
                    <div>{this.state.tickets.map((item,number) => <TicketCard key={number} title={item.title} sub={item.subTitle} id={item._id}/>)}</div>
                ) : (
                    (!this.state.error) ? (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>) : (null)
                )
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
        user : state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (Tickets);