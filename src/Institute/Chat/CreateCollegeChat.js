import React from 'react';
import { fetchByCategory } from './Utils/data'
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notify_Success_msg, notifyError_with_msg } from  '../Utils/Message'

class CreateCollegeChat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category : 'year',
            year : '',
            course : '',
            name : ''
        }
    }

    onChange = (event) => {
        if(event.target.name === 'year'){
            this.setState({ year : parseInt(event.target.value) });    
        }
        else this.setState({ [event.target.name] : event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let data = fetchByCategory(this.state);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
            const response = await fetch(`${base_url}/${this.props.user}/chatrooms`,values)
            const json = await response.json()
            console.log(json)
            if(!response.ok){
                notifyError_with_msg(json.err);
            }
            if(response.ok){
                notify_Success_msg("Successfully Created");
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unable To Create');
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <h5>Select The Type Of Room To Create</h5>
                <select required name='category' onChange={this.onChange}>
                        <option>Select Year</option>
                        <option value='year'>Year</option>
                        <option value='yearCourse'>Year and Course</option>
                        <option value='interest'>Interest Specific</option>
                </select>
                <br/>
                { (this.state.category === 'year') ? (
                <div>
                    <label>Year</label><br/>
                    <input name='year' onChange={this.onChange}></input>
                </div>) : (null)}
                <br/>
                { (this.state.category === 'yearCourse') ? (
                <div>
                    <label>Year</label><br/>
                    <input name='year' onChange={this.onChange}></input><br/>
                    <label>Course</label><br/>
                    <input name='course' onChange={this.onChange}></input>
                </div>) : (null)}
                <br/>
                { (this.state.category === 'interest') ? (
                <div>
                    <label>Interest Name</label><br/>
                    <input name='name' onChange={this.onChange}></input>
                </div>) : (null)}
                <button type='submit'>Create</button>
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


export default connect(mapStatesToProps,null) (CreateCollegeChat);