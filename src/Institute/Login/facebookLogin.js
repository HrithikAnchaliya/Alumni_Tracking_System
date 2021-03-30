import React from 'react';
import '../Style/toStyleLogin.css'
import Add_token from '../../Redux/action/addtoken'
import { connect } from 'react-redux'
import { Serialize }from './Utils/data';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { notifyError_with_msg } from '../Utils/Message'

class Facebookbutton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            error : false,
            loading:true
          }

        this.onClick = this.onClick.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook = async (response) => {
        const { accessToken, userID } = response;
        console.log(response)
        let {  user } = this.state 
        this.setState({ loading : true });
        const data = { accessToken, userID } 
            const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        }
        try{
        let storeToken = ''
        const response = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/facebookLogin`,values)
        const json = await response.json()
        if(!response.ok){
            this.setState({ loading : false });
            notifyError_with_msg(json.err)
        }
        if(response.ok){
        for (var pair of response.headers.entries()) {
            if(pair[0] === 'x-auth'){ storeToken = pair[1]; break}}
        if(user === 'faculty'){user = 'college'}
        Serialize(storeToken,user);
        await this.props.addtoken();
        this.props.Redirect();
        }}
        catch(error){
            console.log(error)
            this.setState({ loading : false });
            notifyError_with_msg("User Should be Registered Before Using Facebook Login")
        }
    }


    onClick=(event)=>{
        this.setState({
            [event.target.name]: event.target.value,
            loading:false
          });

    }

    render(){
        let { loading } = this.state
        return(
            <div>
                <form>
                <label>Please select who you are</label>
                    <select  id='Login-Select-facebook' name='user' onChange={this.onClick}>
                        <option value=''></option>
                        <option value='alumni'>Alumni</option>
                        <option value='student'>Student</option>
                        <option value='admin'>Admin</option>
                        <option value='college'>College</option>
                        <option value='faculty'>Faculty</option>
                    </select>     
                <br/><br/>
                <FacebookLogin
                appId="739261673534719"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile, email"
                callback={this.responseFacebook}
                render={renderProps => (
                    <button id='Submit-button' type='button' disabled={loading} onClick={renderProps.onClick}>Facebook Login</button>
                )}
                />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addtoken : () => dispatch(Add_token())
    }
}

export default connect(null,mapDispatchToProps) (Facebookbutton);
