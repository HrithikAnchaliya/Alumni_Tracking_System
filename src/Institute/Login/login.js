import React from 'react';


export default class Login extends React.Component{
    render(){
        return(
            <div>
            
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

            </div>
            </div>
        );
    }
}
