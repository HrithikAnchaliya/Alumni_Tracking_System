import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { notify_Success, notifyError, notifyError_with_msg } from  '../Utils/Message'


class AddFundInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitted : false
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ submitted : true })
        let data = this.props.value;
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`${base_url}/college/funds`, values);  //Only College can Post
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data._message);
        }
        if(response.ok){
        console.log(data)
        notify_Success();
        }}
        catch(error){
            console.log(error)
            this.setState({ submitted : false });
            (error) ? (notifyError_with_msg(error)) : (notifyError('fund'))
            
            
        }
    }


    render(){
        console.log(this.props.value)
        let submitted = this.state.submitted;
        let { title, subtitle, description, totalRaised, totalRequired } = this.props.value;
        return(
            <div>
                <form onSubmit={this.onSubmit}>

                <div className='box'>

                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Title" value={title} onChange={this.props.onChange} name='title'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Subtitle</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Subtitle" value={subtitle} onChange={this.props.onChange} name='subtitle'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                    <textarea  className="textarea" type="text" placeholder="Description" value={description} onChange={this.props.onChange} name='description'></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Total-Raised</label>
                    <div className="control">
                    <input  className="input" placeholder="Total-Raised"  value={totalRaised} type='number' onChange={this.props.onChange} name='totalRaised'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Total-Required</label>
                    <div className="control">
                    <input  className="input" placeholder="Total-Required"   value={totalRequired} type='number' onChange={this.props.onChange} name='totalRequired'></input>
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


export default connect(mapStatesToProps,null) (AddFundInfo);