import React from 'react';
import Append from './Utils/data'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { notify_Success, notifyError, notifyError_with_msg } from  '../Utils/Message'

class AddEventInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitted : false
    
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitted : true})
        let data = Append(this.props.value);
        console.log(data);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`${base_url}/college/events`, values);  //Only College can Post
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            this.setState({ submitted : false})
            notifyError_with_msg(data._message)
        }
        if(response.ok){
        console.log(data)
        notify_Success();
        }}
        catch(error){
            this.setState({ submitted : false})
            notifyError('event');
        }
    }


    render(){
        let submitted = this.state.submitted
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <h5>Title</h5>
                    <input name='title' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>SubTile</h5>
                    <input name='subtitle' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Description</h5>
                    <input name='description' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Date</h5>
                    <input type='date' name='date' value='2000-03-16' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Time</h5>
                    <input type='time' name='time'  onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Venue</h5>
                    <input  name='venue' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Address</h5>
                    <input  name='address' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Country</h5>
                    <input  name='country' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>state</h5>
                    <input  name='state' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>city</h5>
                    <input  name='city' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Year</h5>
                    <input type='number' name='endYear' onChange={this.props.onChange} ></input>
                    <br/>
                    <h5>Send Email</h5>
                    <select onChange={this.props.forEmail} name='sendEmail'>
                    <option value=''>Select Which</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                    </select>
                    <br/>
                    <br/>
                    <button disabled={submitted} type='submit' >Submit</button>
                </form>
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


export default connect(mapStatesToProps,null) (AddEventInfo);