import React from 'react';
import { connect } from 'react-redux'
import Auth_True from '../../Redux/action/actions'
import Add_token from '../../Redux/action/addtoken'
import Remove_token from '../../Redux/action/removetoken'
import {
    Link
  } from "react-router-dom";




class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password: ''
          }

        this.onChangefunc = this.onChangefunc.bind(this);
        this.officiallogin = this.officiallogin.bind(this);
        this.officiallogoff = this.officiallogoff.bind(this);
    }

    onChangefunc = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
      }

      

    // log_in = () => {
    //     const serialized = JSON.stringify(true)
    //     window.localStorage.setItem('Auth_state' , serialized )
    //     this.props.change_state_true()
    // }

    // log_off = () => {
    //     window.localStorage.removeItem('Auth_state')
    //     this.props.change_state_true()
    // }

    async officiallogoff(){
        const deserialized_token = JSON.parse( window.localStorage.getItem('Auth_token'));
        const values = {
            method : "delete",
            headers : {
                'x-auth' : deserialized_token
            }
        }
        try{
        await fetch('https://alumni-backend-app.herokuapp.com/alumni/logout',values)
        window.localStorage.removeItem('Auth_state')
        window.localStorage.removeItem('Auth_token')
        this.props.removetoken();
        }
        catch(error){
            console.log(error)
        }
    }


    async officiallogin(e){
        e.preventDefault();
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(this.state)
        }
        try{
        const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/login',values)
        const json = await response.json()
        console.log(json.user.tokens[0].token)
        const serialized_token =  JSON.stringify(json.user.tokens[0].token)
        const serialized_auth = JSON.stringify(true)
        window.localStorage.setItem('Auth_state' , serialized_auth )
        window.localStorage.setItem('Auth_token' , serialized_token )
        this.props.addtoken();
        }
        catch(error){
            console.log(error)
        }

    }

    render(){
        console.log(this.props.Auth)
        return(
            <div>
            <h5>Login Or Sign-up</h5>
            <h5>To Unlock the Essential Features of this App</h5>
            <br/>
            <div className='LoginDiv'>
                <form id='loginform' onSubmit={this.officiallogin}>
                    <h2>login</h2>
                    <label>E-Mail</label>
                    <input className="mailinput" type='text' name='email' value={this.state.email} onChange={this.onChangefunc}/>  
                    <br/>
                    <label>Password</label>
                    <input className="passinput" type='password' name='password' value={this.state.password} onChange={this.onChangefunc}/>
                    <br/>
                    <button type='submit'>submit</button>
                </form>
                    <div>
                    <input type="radio" id="user" name="Student" value="Student"></input>
                    <label for="user">Student</label>
                    <br/>
                    <input type="radio" id="user1" name="Alumni" value="Alumni"></input>
                    <label for="user1">Alumni</label>
                    </div>
                    <br/>
                    <button onClick={this.officiallogoff} type='button'>Log-off</button>
                    <br/>

                    <br/>
                    <button type='button'><Link to='/register'>Register</Link></button>
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
        addtoken : () => dispatch(Add_token()),
        removetoken : () => dispatch(Remove_token())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps) (Login);
