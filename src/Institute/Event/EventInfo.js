import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'


class EventInfo extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                attended : false
            }
            this.toAttend = this.toAttend.bind(this);
        }

    async toAttend(){
        let locationId = this.props.eventId
        const values = {
            method : "POST",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/events/attend/${locationId}`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({
            attended : true
        })
        }
        catch(error){
            console.log(error)
        }
    }


    render(){
        let toDisable = this.state.attended
        return(
            <div>
                <div>
                     <div>
                    <h1>{this.props.title}</h1>
                    <span>
                        <span>{this.props.venue}</span>
                        <br/>
                    <span>{this.props.time} <br/> {this.props.date}</span>
                    </span>
                </div>
                <div>
                    <div>
                    <p>
                       <br/>
                        </p>
                        <p>
                       <strong>{this.props.subtitle}</strong>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
        <strong>Date : </strong>  <span>{this.props.date}</span>
                        </p>
                        <p>
        <strong>Time : </strong>   <span>{this.props.time}</span>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Location</strong>
                        </p>
                        <span>{this.props.address} <br/> {this.props.city}</span>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Spaeker</strong><br/>
                       <span>Organised By : {this.props.organiser}</span>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Description</strong><br/>
                        </p>
                        <p>
                       <br/>
                        </p>
                        <p>
                       <strong>Speaker-Bio</strong>
                        </p>
                        <br/>
                        {(this.props.user === 'alumni') ? (
                        <button disabled={toDisable} onClick={this.toAttend} type='button'>Wanna Attend, Click Me!!</button>) : (null)
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user: state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (EventInfo);