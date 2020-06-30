import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import { toast } from 'react-toastify';


class AddFundInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            success : false,
            error:false
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
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
        if (!response.ok) {
            throw new Error(response.status); // 404
        }
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            this.setState({ success : true })
        }
        if(this.state.success){
            this.notify();
        }
        }
        catch(error){
            console.log(error)
            this.setState({ error : true });
            if(this.state.error){
                this.notifyError();
            }
        }
    }

    notify = () => toast.dark('Successfully Added!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    notifyError = () => toast.error('Adding Fund Was Unsuccessful', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


    render(){
        console.log(this.props.value)
        let { title, subtitle, description, totalRaised, totalRequired } = this.props.value;
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <h5>Title</h5>
                <input value={title} onChange={this.props.onChange} name='title'></input>
                <br/>
                <h5>Subtitle</h5>
                <input value={subtitle} onChange={this.props.onChange} name='subtitle'></input>
                <br/>
                <h5>Description</h5>
                <textarea value={description} onChange={this.props.onChange} name='description'></textarea>
                <br/>
                <h5>Total-Raised</h5>
                <input value={totalRaised} type='number' onChange={this.props.onChange} name='totalRaised'></input>
                <br/>
                <h5>Total-Required</h5>
                <input value={totalRequired} type='number' onChange={this.props.onChange} name='totalRequired'></input>
                <br/>
                <br/>
                <button type='submit'>Submit</button>
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