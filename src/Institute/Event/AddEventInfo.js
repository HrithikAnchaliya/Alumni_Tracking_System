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

                <div className="box">
                
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Title" name='title' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Sub-Title</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="subtitle" name='subtitle' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                    <textarea  className="textarea"  placeholder="Description" name='description' onChange={this.props.onChange}  ></textarea>
                    </div>
                </div>


                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                    <   input  className="input" type='date' placeholder="Date" name='date' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Time</label>
                    <div className="control">
                    <   input  className="input" type='time' name='time'  onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Venue</label>
                    <div className="control">
                    <   input  className="input" placeholder="Venue" name='venue' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Address</label>
                    <div className="control">
                    <   input  className="input" placeholder="Address" name='address' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Country</label>
                    <div className="control">
                    <   input  className="input" placeholder="Country" name='country' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">State</label>
                    <div className="control">
                    <   input  className="input" placeholder="State"  name='state' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">City</label>
                    <div className="control">
                    <   input  className="input" placeholder="City"  name='city' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Year</label>
                    <div className="control">
                    <   input  className="input" placeholder="Year" type='number'  name='endYear' onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <button className="button is-black" disabled={submitted} type='submit' >Submit</button>

                </div>

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


