import React from 'react';
import {  base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
// import TicketCard from './TicketCard';
import { Link } from "react-router-dom";


class Tickets extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tickets:null,
            loading:true,
            error:false,
            status: 'all'
        };

        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    getDate(date){
        var updatedDate = new Date(date);
        return updatedDate.getDate() + '/' + (updatedDate.getMonth()+1) + '/' + updatedDate.getFullYear()
    }

    onChangeStatus(event){
        this.setState({
            status: event.target.value
        });
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
                    // <div>{this.state.tickets.map((item,number) => <TicketCard key={number} title={item.title} sub={item.subTitle} id={item._id}/>)}</div>
                    <div>

                        <table 
                            is-striped
                            is-bordered
                            is-narrow
                            is-hoverable
                            className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Sub Title</th>
                                    <th>Raised By</th>
                                    <th>Date</th>
                                    <th>
                                        <select
                                            onChange={this.onChangeStatus}    
                                        >
                                            <option value='all'>All</option>
                                            <option value='open'>Open</option>
                                            <option value='onProgress'>On Progress</option>
                                            <option value='closed'>Closed</option>
                                        </select>
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.tickets.map((ticket) => {
                                        if ( !(this.state.status === 'all' || this.state.status === ticket.status) ){
                                            // eslint-disable-next-line
                                            return;
                                        }

                                        var spanClassName;
                                        switch (ticket.status) {
                                            case "open":
                                                spanClassName = "tag is-rounded is-success is-small"
                                                break;
                                            case "onProgress":
                                                spanClassName = "tag is-rounded is-warning is-small"
                                                break;
                                            case "closed":
                                                spanClassName = "tag is-rounded is-danger is-small" 
                                                break; 
                                            default :
                                                spanClassName = "tag is-rounded is-small"                                 
                                        };

                                        return (
                                            <tr>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.subTitle}</td>
                                                <td>
                                                    <Link to={`/profile/${ticket.postedBy._id}`}>
                                                        {ticket.postedBy.firstName + " " + ticket.postedBy.lastName} 
                                                    </Link>
                                                </td>
                                                <td>{ this.getDate(ticket.createdAt) }</td>
                                                <td>
                                                    <span className={spanClassName}>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/tickets/${ticket._id}`}>
                                                        Link
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>

                        </table>
                        


                    </div>
                
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