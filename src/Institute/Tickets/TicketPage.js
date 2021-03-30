import React from 'react'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import TicketPageInfo from './TicketPageInfo'
import { notifyError_with_msg } from  '../Utils/Message'


class TicketPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ticket : '',
            loading : true,
            error : false
        }
    }

    componentDidMount = async () => {
        let TicketId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/tickets/${TicketId}`, values);
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(data.err);
        }
        if(response.ok){
        console.log(data)
        this.setState({ ticket : data, loading : false })
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('Unsuccessful To Fetch');
        }
    }

    render(){
        let loading = this.state.loading
        return(
            <div>
                 <div className="container is-fluid">
                <div id='raiseticket-div-id' className="notification">
                { (!loading) ? (
                    <TicketPageInfo ticket={this.state.ticket}/>) : 
                    (
                        (!this.state.error) ? (
                            <div id='Loading-id'>
                            <Spinner  animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                            </Spinner>
                            </div>) : (null)
                    )}
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


export default connect(mapStatesToProps,null) (TicketPage);