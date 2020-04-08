import React from 'react';
import { connect } from 'react-redux'
import Auth_True from '../../Redux/action/actionstrue'


class Login extends React.Component{
    render(){
        console.log(this.props.Auth)
        return(
            <div>
            <h5>Login Or Sign-up</h5>
            <h5>To Unlock the Essential Features of this App</h5>
            <br/>
            <div className='LoginDiv'>
                <form id='loginform'>
                    <h2>login</h2>
                    <label>E-Mail</label>
                    <input className="mailinput" type='text' name='MailInput'/>  
                    <br/>
                    <label>Password</label>
                    <input className="passinput" type='password' name='PassInput'/>
                    <br/>
                    <button type='submit'>submit</button>
                </form>

                <form id='loginform'>
                    <h2>Sign up</h2>
                    <label>Name</label>
                    <input className="nameinput" type='text' name='nameInput'/> 
                    <br/>
                    <label>Last Name</label>
                    <input className="lastinput" type='text' name='lastInput'/> 
                    <br/>
                    <label>E-Mail</label>
                    <input className="mailinput" type='text' name='MailInput'/>  
                    <br/>
                    <label>Password</label>
                    <input className="passinput" type='password' name='PassInput'/>
                    <br/>
                    <button type='submit'>submit</button>
                </form>
                <br/>
                <div>
                <h3>{this.props.Auth}</h3>
                <button onClick={this.props.change_state_true}>Set True</button>
                <button onClick={this.props.change_state_false}>Set False</button>
                </div>
            </div>
            </div>
        );
    }
}

const mapStatesToProps = state => {
    return{
        Auth : state.Auth_State
    }
}

const mapDispatchToProps = dispatch => {
    return{
        change_state_true : () => dispatch(Auth_True('True')),
        change_state_false : () => dispatch(Auth_True('False'))
       
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(Login);
