import React from 'react';
import { connect } from 'react-redux'
import Auth_True from '../../Redux/action/actions'
import Add_token from '../../Redux/action/addtoken'
import { Link, Redirect } from "react-router-dom";
import 'bulma/css/bulma.css';


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password: '',
            redirect : false
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
        const { email , password } = this.state
        const data = { email , password } 
            const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        }
        try{
        const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/login',values)
        const json = await response.json()
        if(response.ok){
        console.log(json.user.tokens[0].token)
        const serialized_token =  JSON.stringify(json.user.tokens[0].token)
        const serialized_auth = JSON.stringify(true)
        window.localStorage.setItem('Auth_state' , serialized_auth )
        window.localStorage.setItem('Auth_token' , serialized_token )
        await this.props.addtoken();
        this.redirect();
        }}
        catch(error){
            console.log(error)
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
        console.log(this.props.Auth)
        return(
            <div>
                <br/>
                <br/>
            <div className="container">
            <div className="notification">
            <h5>Login Or Sign-up</h5>
            <h5>To Unlock the Essential Features of this App</h5>
            <br/>
            <div className='LoginDiv'>
                <form id='loginform' onSubmit={this.officiallogin}>
                    <h2>Login</h2>
                    <label>E-Mail</label>
                    <br/>
                    <input required className="mailinput" type='text' name='email' value={this.state.email} onChange={this.onChangefunc}/>  
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input required className="passinput" type='password' name='password' value={this.state.password} onChange={this.onChangefunc}/>
                    <br/>
                    <br/>
                    <button type='submit'>submit</button>
                </form>
                <br/>
                <span>Or , You can</span>
                <br/>
                <br/>
                    <button type='button'><Link to='/register'>Register</Link></button>
                <br/>
                <br/>
                <br/>
                <div>
                {
                    (this.props.Auth) ? (
                    <h5>The Login is : True</h5>
                    ) : (
                        <h5>The Login is : False</h5>
                    )
                }

                </div>
                {
                    (this.state.redirect) ? (
                        <Redirect to="/"/>
                    ) : (
                        null
                    )
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
        change_state_true : () => dispatch(Auth_True()),
        addtoken : () => dispatch(Add_token())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps) (Login);
