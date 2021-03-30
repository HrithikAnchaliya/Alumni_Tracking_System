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
                <div className="container is-fluid">
                    <div id = 'addCollegeChat-div-id' className="notification">
                <form onSubmit={this.onSubmit}>

                <div className='box'>

                <div className="field">
                    <label className="label">Select The Type Of Room To Create</label>
                    <div className="control">
                        <div className="select">
                        <select required name='category' onChange={this.onChange}>
                            <option>Choose</option>
                            <option value='year'>Year</option>
                            <option value='yearCourse'>Year and Course</option>
                            <option value='interest'>Interest Specific</option>
                        </select>
                        </div>
                    </div>
                </div>

                { (this.state.category === 'year') ? (

                <div className="field">
                    <label className="label">Year</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Year" name='year' onChange={this.onChange} ></input>
                    </div>
                </div>
                
                ) : (null)}
                { (this.state.category === 'yearCourse') ? (

                <div>

                <div className="field">
                    <label className="label">Year</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Year" name='year' onChange={this.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Course</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Course" name='course' onChange={this.onChange} ></input>
                    </div>
                </div>

                </div>

                ) : (null)}
                { (this.state.category === 'interest') ? (

                <div className="field">
                    <label className="label">Interest Specific Name</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Interest Specific Name" name='name' onChange={this.onChange} ></input>
                    </div>
                </div>

                ) : (null)}
                
                <button className="button is-black" type='submit' >Submit</button>

                </div>

                </form>
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


export default connect(mapStatesToProps,null) (CreateCollegeChat);