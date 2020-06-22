import React from 'react';
import Attendees from './Attendees'
import { connect } from 'react-redux'
import EventInfo from './EventInfo'
import { base_url } from '../../Endpoint/endpoint'

class Eventpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {                                     
            loading: true,
            posts : null,
            jsonPosts : null
            }

            this.toArray = this.toArray.bind(this);
        }          
    
       async componentDidMount(){
        let locationId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/events/${locationId}`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({
            jsonPosts : json })
        this.toArray()
        }
        catch(error){
            console.log(error)
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.jsonPosts)              
        {
            const stateall = this.state.jsonPosts.event.attendees;
            console.log(stateall)
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray[0].firstName)
            this.setState({
                posts : dataarray,
                loading : false
            })
        }
    }

    render(){
        let eventId = this.props.computedMatch.params.id
        console.log(eventId)
        return(
            <div>
                {this.state.loading || !this.state.posts ? 
                (<h1>Loading ..</h1>) : 
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
                        <div>
                            {this.state.jsonPosts.event.attendees[0] ? 
                                (
                            <div>
                                <br/>
                                <h5>People who are gonna attend this event</h5>
                                <br/>
                                <div> {this.state.posts.map((item,number) => 
                                <Attendees key={number} id={item._id} name={item.firstName} />
                                )} </div>
                            </div>
                            ) : ( null )}
                                <br/>
                                <br/>
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
