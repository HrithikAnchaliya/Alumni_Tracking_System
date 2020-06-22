import React from 'react';
import { connect } from 'react-redux'
import 'bulma/css/bulma.css';
import { base_url } from '../../Endpoint/endpoint'
import Interviews from './Utils/data' 

class AddInterviewInfo extends React.Component{
    constructor(props){
        super(props)
    
        this.toPost = this.toPost.bind(this);
        }

    async toPost(event){
        event.preventDefault();
        const state = this.props.values;
        let data = Interviews(state);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        console.log(values)
        try{
            const response = await fetch(`${base_url}/${this.props.user}/interviews`,values)
            const json = await response.json()
            console.log(json)
        }
        catch(error){
            console.log(error)
        }
    }
    
    render(){

        const {  difficulty, description, toTopics,feedback } = this.props.values
        return(
            <div>
            <form onSubmit={this.toPost}>
                <div id='addjobcontainer' className="container is-fluid">
                <div className="notification">
                <h5>Company</h5>
                    <select required name="company"  onChange={this.props.onChange}>
                        <option value="">Select Company</option>
                        <option value="microsoft">Microsoft</option>
                        <option value="google">Google</option>
                        <option value="hcl">HCL</option>
                        <option value="msi">MSI</option>
                    </select>
                    <br/>
                    <h5>Work - Title</h5>
                    <select required name="workTitle"  onChange={this.props.onChange}>
                        <option value="">select Title</option>
                        <option value="front end dev">Front-End Developer</option>
                        <option value="back end dev">Back-End Developer</option>
                        <option value="software dev">Software Developer</option>
                        <option value="database management">Database Management</option>
                        <option value="software security">Software Security</option>
                    </select>
                    <br/>
                    <h5>Industry</h5>
                    <select required name="industry"  onChange={this.props.onChange}>
                        <option value="">select Industry</option>
                        <option value="IT">IT</option>
                        <option value="automobile">Automobile</option>
                        <option value="bio tech">Bio - Tech</option>
                        <option value="Film">Film</option>
                    </select>
                    <br/>
                    <h5>Difficulty</h5> 
                        <input required name='difficulty' type='number' placeholder='Range is from 1 to 5' onChange={this.props.onChange} value={difficulty}></input>
                    <br/>
                    <h5>Description</h5>
                    <textarea required name="description"  value={description} onChange={this.props.onChange} ></textarea>
                    <br/>
                    <h5>Topics</h5>
                    <textarea required name="toTopics"  value={toTopics} onChange={this.props.onChange} placeholder='Use comma to sepreate them'></textarea>
                    <br/>
                    <h5>Feedback</h5>
                    <textarea required name="feedback"  value={feedback} onChange={this.props.onChange} ></textarea>
                    <br/>
                    <button type='submit'>Submit</button>
                </div>
                </div>
            </form>
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user: state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (AddInterviewInfo);