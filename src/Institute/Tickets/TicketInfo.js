import React from 'react';
import { connect } from 'react-redux'
import 'bulma/css/bulma.css';


class TicketInfo extends React.Component{
    constructor(props){
        super(props)

        this.toPost = this.toPost.bind(this);
    }

    async toPost(e){
        e.preventDefault();
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
            const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/tickets',values)
            if (!response.ok) {
                throw new Error(response.status); // 404
            }
            const json = await response.json()
            console.log(json)
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        console.log(this.toChange)
        const { description } = this.props.values;

        return(
            <div>
                <div className="container">
                <div className="notification">
                <form 
                onSubmit={this.toPost}>
                <h5>Title</h5>
                <select required name="title"  onChange={this.props.toChange}>
                    <option value =''>select title</option>
                    <option value ='Marksheet'>Marksheet</option>
                    <option value = 'TC / Related Docs'>TC / Related Docs</option>
                    <option value ='Other Issues'>Other Issues</option>
                </select>
                <br/>
                <h5>Sub - Title</h5>
                <select required name="subtitle"  onChange={this.props.toChange}>
                    <option value =''>select title</option>
                    <option value = 'Marksheets/other documents'>Marksheets/other documents</option>
                    <option value = 'Marksheet - Lost'>Marksheet - Lost</option>
                    <option value = 'TC - Apply'>TC - Apply</option>
                    <option value = 'Other Issues'>Other Issues</option>
                </select>
                <br/>
                <h5>Description</h5>
                <textarea  name="description" required value = {description} onChange={this.props.toChange} placeholder="More about the Issue"></textarea>
                <br/>
                <br/>
                <button type='submit'>Submit</button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (TicketInfo);