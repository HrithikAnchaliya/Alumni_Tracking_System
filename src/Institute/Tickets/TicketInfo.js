import React from 'react';
import { connect } from 'react-redux'
import 'bulma/css/bulma.css';
import {  base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg, notify_Success } from '../Utils/Message'


class TicketInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitted : false
        }
        this.toPost = this.toPost.bind(this);
    }

    async toPost(e){
        e.preventDefault();
        this.setState({ submitted : true})
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(this.props.values)
        }
        console.log(values)
        try{
            const response = await fetch(`${base_url}/${this.props.user}/tickets`,values)
            const json = await response.json()
            if (!response.ok) {
                this.setState({ submitted : true})
                notifyError_with_msg(json._message)
            }
            if(response.ok){
            console.log(json)
            notify_Success();
        }}
        catch(error){
            console.log(error)
            this.setState({ submitted : true})
            notifyError_with_msg("Unsuccessful to Submit")
        }
    }

    render(){
        console.log(this.toChange)
        const { description } = this.props.values;
        let submitted = this.state.submitted
        return(
            <div>

                <form onSubmit={this.toPost}>

                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <div className="select">
                        <select  required name="title"  onChange={this.props.toChange}>
                            <option value =''>select title</option>
                            <option value ='Marksheet'>Marksheet</option>
                            <option value = 'TC / Related Docs'>TC / Related Docs</option>
                            <option value ='Other Issues'>Other Issues</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Sub - Title</label>
                    <div className="control">
                        <div className="select">
                        <select  required name="subTitle"  onChange={this.props.toChange}>
                            <option value =''>select title</option>
                            <option value = 'Marksheets/other documents'>Marksheets/other documents</option>
                            <option value = 'Marksheet - Lost'>Marksheet - Lost</option>
                            <option value = 'TC - Apply'>TC - Apply</option>
                            <option value = 'Other Issues'>Other Issues</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                    <textarea  className="textarea" type="text" name="description" required value = {description} onChange={this.props.toChange} placeholder="More about the Issue"></textarea>
                    </div>
                </div>

                <button className="button is-black" type='submit' disabled={submitted} >Submit</button>

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


export default connect(mapStatesToProps,null) (TicketInfo);