import React from 'react';
import { connect } from 'react-redux'
import Facebookbutton from './facebookLogin';
import Add_token from '../../Redux/action/addtoken'
import { Link, Redirect } from "react-router-dom";
import { Serialize }from './Utils/data';
import '../Style/toStyleLogin.css'
import { notifyError_with_msg } from  '../Utils/Message'
import 'bulma/css/bulma.css';


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password: '',
            user:'',
            redirect : false,
            error : false,
            loading:false
          }

        this.onChangefunc = this.onChangefunc.bind(this);
        this.officiallogin = this.officiallogin.bind(this);
        this.redirect = this.redirect.bind(this);
    }


    onChangefunc = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    
    async officiallogin(e){
        e.preventDefault();
        this.setState({ loading:true })
        let { email , password, user } = this.state
        const data = { email , password } 
            const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        }
        try{    
        let storeToken = ''
        const response = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/login`,values)
        const json = await response.json()
        if(!response.ok){
            notifyError_with_msg(json.err);
            this.setState({ loading : false })
        }
        if(response.ok){
        for (var pair of response.headers.entries()) {
            if(pair[0] === 'x-auth'){ storeToken = pair[1]; break}}
        if(user === 'faculty'){user = 'college'}
        Serialize(storeToken,user);
        await this.props.addtoken();
        this.redirect();
        }
        }
        catch(error){
            console.log(error)
            this.setState({ loading:false });
            notifyError_with_msg('Check your Password, Email and User');
            
        }

    }

    redirect = () => {
        if(this.props.Auth){
            this.setState({
                redirect : true
            })
        }
    }


    render(){
        let loading = this.state.loading
        return( 
            <div>
                <br/>
                <br/>
            <div className="container" id='Login-contain-1'>
            <div className="notification" id='Login-container'>
            <br/>
            <div className='LoginDiv'>
                <form id='loginform' onSubmit={this.officiallogin}>
                    <h2>Login</h2>
                    <br/>
                    <div>
                    <label>E-Mail</label>
                    <input required className="div-input" type='email' name='email' value={this.state.email} onChange={this.onChangefunc}/>
                    </div>
                    <br/> 
                    <div> 
                    <label>Password</label>
                    <input required className="div-input" type='password' name='password' value={this.state.password} onChange={this.onChangefunc}/>
                    </div>
                    <br/>
                    <div>
                    <label>Please select who you are</label>
                    <select required id='Login-Select' name='user' onChange={this.onChangefunc}>
                        <option value=''></option>
                        <option value='alumni'>Alumni</option>
                        <option value='student'>Student</option>
                        <option value='admin'>Admin</option>
                        <option value='college'>College</option>
                        <option value='faculty'>Faculty</option>
                    </select>
                    </div>
                    <br/>
                    <br/>
                    <button id='Submit-button' disabled={loading} type='submit'>submit</button>
                </form>
                <br/>
                <h6 className='division-to-login' id='login-span-text'>  or  </h6>
                <div id='facebook-flex'>
                <Facebookbutton Redirect={this.redirect}/>
                </div>
                <br/>
                <h6 id='login-span-text'>Or , You can</h6>
                <br/>
                    <button id='button1'><Link id='button-link' to='/register'>Register</Link></button>
                <br/>
                <br/>
                <br/>
                {
                    (this.state.redirect) ? ( <Redirect to="/dashboard"/> ) : (null)
                }
            </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapStatesToProps = state => {
    return{
        Auth : state.Auth_state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addtoken : () => dispatch(Add_token())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps) (Login);
