import React from 'react';
import { connect } from 'react-redux'
import 'bulma/css/bulma.css';
import { base_url } from '../../Endpoint/endpoint'
import Interviews from './Utils/data' 
import { notify_Success, notifyError, notifyError_with_msg } from  '../Utils/Message'

class AddInterviewInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            success : false,
            error : false
        }
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
            if(!response.ok){
                notifyError_with_msg(json._message)
            }
            if(response.ok){
            this.setState({ success : true })
            notify_Success();
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError('experience');
            
        }
    }
    
    render(){

        const {  difficulty, description, toTopics,feedback } = this.props.values
        return(
            <div>

            <form onSubmit={this.toPost}>

            <div className='box'> 

                <div className="field">
                    <label className="label">Company</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Company"required name="company"  onChange={this.props.onChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Work - Title</label>
                    <div className="control">
                        <div className="select">
                        <select required name="workTitle"  onChange={this.props.onChange}>
                            <option value="">select Title</option>
                            <option value="front end dev">Front-End Developer</option>
                            <option value="back end dev">Back-End Developer</option>
                            <option value="software dev">Software Developer</option>
                            <option value="database management">Database Management</option>
                            <option value="software security">Software Security</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Industry</label>
                    <div className="control">
                        <div className="select">
                        <select required name="industry"  onChange={this.props.onChange}>
                            <option value="">select Industry</option>
                            <option value="IT">IT</option>
                            <option value="automobile">Automobile</option>
                            <option value="bio tech">Bio - Tech</option>
                            <option value="Film">Film</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Difficulty</label>
                    <div className="control">
                    <input  className="input" required name='difficulty' type='number' placeholder='Range is from 1 to 5' onChange={this.props.onChange} value={difficulty}></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                    <textarea  className="textarea" type="text" placeholder='Description' required name="description"  value={description} onChange={this.props.onChange}></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Topics</label>
                    <div className="control">
                    <textarea  className="textarea" type="text" name="toTopics"  value={toTopics} onChange={this.props.onChange} placeholder='Use comma to sepreate them'></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Feedback</label>
                    <div className="control">
                    <textarea  className="textarea" type="text" name="feedback" placeholder='Feedback' value={feedback} onChange={this.props.onChange}></textarea>
                    </div>
                </div>

                <button className="button is-black"  type='submit' >Submit</button>

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