import React from 'react';
import Append from './Utils/data'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'


class AddEventInfo extends React.Component{

    onSubmit = async (e) => {
        e.preventDefault();
        let data = Append(this.props.value);
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
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const data = await response.json();
        console.log(data)
        // this.setState({ funds : data, loading : false })
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
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
                    <button type='submit' >Submit</button>
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