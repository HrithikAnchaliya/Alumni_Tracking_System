import React from 'react';
import { connect } from 'react-redux'
import { notifyError_with_msg, notify_Success } from  '../Utils/Message'

class Addnewsletter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            newsletter : '',
            loading : false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (event) => {
        this.setState({
            newsletter :  event.target.files[0]
    })}

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading : true})
        const { newsletter } = this.state;
        if(newsletter.type === "application/pdf"){
            console.log("Uploading")
            let data = new FormData()
            data.append('newsletter', newsletter)
            const values = {
                method : "POST",
                body : data,
                headers : {
                    'x-auth' : this.props.token,
                }
            }
            try{
            const response = await fetch('https://alumni-backend-app.herokuapp.com/college/newsletters',values)
            const json = await response.json()
            if(!response.ok){
                notifyError_with_msg('Something Went Down ..');
                this.setState({loading : false})
            }
            if(response.ok){
            console.log(json)
            notify_Success();
            }}
            catch(error){
                console.log(error)
                notifyError_with_msg('Unsuccessful to Post')
                this.setState({loading : false})
            }
        }
        else {
            notifyError_with_msg('Maybe try uploading a pdf');
            this.setState({loading : false})}
    }

    render(){
        let loading = this.state.loading;
        return(
            <div>
                <div className="container">
                    <div className="notification">
                    <form onSubmit={this.onSubmit}>
                    <h5>Input a file</h5><br/>
                    <input required name = 'file' onChange={this.onChange}  type='file'></input>
                    <br/>
                    <br/>
                    <button disabled={loading} type='submit'>Submit</button>
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
        user:state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (Addnewsletter);