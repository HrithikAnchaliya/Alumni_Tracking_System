import React from 'react';
import Attendees from './Attendees'
import { connect } from 'react-redux'
import EventInfo from './EventInfo'
import { base_url } from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from  '../Utils/Message'


class Eventpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {                                     
            loading: true,
            posts : null,
            jsonPosts : null,
            error : false
            }

            this.toArray = this.toArray.bind(this);
        }          
    
       async componentDidMount(){
        let eventId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/events/${eventId}`, values);
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(json._message);    
        }
        if(response.ok){
        console.log(json)
        this.setState({ jsonPosts : json })
        this.toArray()
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('Unsuccessful to fetch');
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.jsonPosts.event.attendees.length !== 0)              
        {
            const stateall = this.state.jsonPosts.event.attendees;
            console.log(stateall)
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
        }
        this.setState({
            posts : dataarray,
            loading : false
        })
    }


    render(){
        let eventId = this.props.computedMatch.params.id
        console.log(eventId)
        return(
            <div id='event-first-div'>
                {this.state.loading || !this.state.posts ? 
                ((!this.state.error) ? (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>) : (null)
                ) : 
                (
                    <div>
                    <EventInfo
                        title={this.state.jsonPosts.event.title}
                        subtitle={this.state.jsonPosts.event.subtitle}
                        venue={this.state.jsonPosts.event.venue}
                        time={this.state.jsonPosts.event.time} date={this.state.jsonPosts.event.date}
                        organiser={this.state.jsonPosts.event.organiserType}
                        address={this.state.jsonPosts.event.location.address}
                        city={this.state.jsonPosts.event.location.city}
                        eventId = {eventId}
                    />
                        <div className="container is-fluid">
                        <div className=' notification event-detail-div'>
                            {(this.state.jsonPosts.event.attendees.length !== 0) ? 
                                (
                            <div>
                                <p>
                                <strong>People Who Are Gonna Attend This Event</strong><br/>
                                <div> {this.state.posts.map((item,number) => 
                                <Attendees key={number} id={item._id} name={item.firstName} />
                                )} </div>
                                </p>
                            </div>
                            ) : ( null )}
                        </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user:state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (Eventpage);
