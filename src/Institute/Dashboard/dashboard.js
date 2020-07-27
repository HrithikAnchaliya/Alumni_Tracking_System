import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import {Line} from 'react-chartjs-2';
import split from './Utils/data';
import '../Style/toStyleChart.css'




class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all:null,
            loading:true,
            data:null,
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
        const response = await fetch(`${base_url}/${this.props.user}/stats`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({ all : json})
        }}
        catch(error){
            notifyError_with_msg('Unable to Fetch');
        }
    }


    render(){
        return(
            <div>
                <div className="container is-fluid">
                <div className="notification">
                    <span><span>Add Events</span>
                    <Link to='/addevent'>Add-Event</Link></span>
                    <br/>
                    <span><span>Add Funds</span>
                    <Link to='/addfund'>Add-Funds</Link></span>
                    <br/>
                    <span><span>Add Newletter</span>
                    <Link to='/addnewsletter'>Add-Newsletter</Link></span>
                </div>
                </div>
                {(this.state.all !== null) ? ( 
                <div id='alumni-chart'>
                <Line
                data={split(this.state.all.alumni, 'Alumni')}
                options={{
                    title:{
                    display:true,
                    text:'No of Alumni Joined',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                /></div>) : (null)}
               
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


export default connect(mapStatesToProps,null) (Dashboard);
