import React from 'react';
import '../Style/toStyleLogin.css'
import Add_token from '../../Redux/action/addtoken'
import { connect } from 'react-redux'
import { Serialize }from './Utils/data';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class Facebookbutton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            error : false,
            loading:true
          }

        // this.onChangefunc = this.onChangefunc.bind(this);
        // this.officiallogin = this.officiallogin.bind(this);
        // this.redirect = this.redirect.bind(this);
        this.onClick = this.onClick.bind(this);
    }


    responseFacebook = async (response) => {
        // e.preventDefault();
        const { accessToken, userID } = response;
        const {  user } = this.state 
        const data = { accessToken, userID } 
            const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/facebookLogin`,values)
        const json = await response.json()
        if(!response.ok){
            throw new Error(response.status); // 404
        }
        let storeToken = json.user.tokens[0].token;
        let storeUser = this.state.user;
        Serialize(storeToken,storeUser);
        await this.props.addtoken();
        this.props.Redirect();
        }
        catch(error){
            console.log(error)
            this.setState({
                error : true
                // loading:true
            });
            
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
                    </select>     
                <br/><br/>
                <FacebookLogin
                appId="890313481439468"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile, email"
                callback={this.responseFacebook}
                render={renderProps => (
                    <button type='button' disabled={loading} onClick={renderProps.onClick}>Facebook Login</button>
                )}
                />
                </form>
            </div>
        );
    }
}

// const mapStatesToProps = state => {
//     return{
//         Auth : state.Auth_state
//     }
// }

const mapDispatchToProps = dispatch => {
    return{
        addtoken : () => dispatch(Add_token())
    }
}

export default connect(null,mapDispatchToProps) (Facebookbutton);
