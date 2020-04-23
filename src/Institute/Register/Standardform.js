import React from 'react';



export default class Standardform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    toGoBack = () => {
        this.props.goBack();
    }

    render(){
        const { email, password, mobileNumber, facebook, linkedin, skills } = this.props.values
        return(
            <div>
                <form>
                    <h6>Email</h6>
                    <input type='mail' onChange={this.props.handlechg} name='email' defaultValue={email} ></input>
                    <br/>
                    <br/>
                    <h6>Password</h6>
                    <input type='password' onChange={this.props.handlechg} name='password' defaultValue={password} ></input>
                    <br/>
                    <br/>
                    <h6>Mobile Number</h6>
                    <input  type="number" step="1" pattern="\d+"  onChange={this.props.number}  defaultValue={mobileNumber} name='mobileNumber'></input>
                    <br/>
                    <br/>
                    <div>
                    <h5>Social Profile</h5>
                    <h7>Facebook Link</h7>
                    <input name= 'facebook' onChange={this.props.handlechg}  defaultValue={facebook} type='text'></input>
                    <h7>Linkedin</h7>
                    <input name='linkedin'type='text'  onChange={this.props.handlechg}  defaultValue={linkedin} ></input>
                    </div>
                    <br/>
                    <br/>
                    <h7>Skills</h7>
                    <br/>
                    <textarea name='skills' onChange={this.props.handlechg}  defaultValue={skills}  placeholder='Input your skills one by one with " , " to seperate them'></textarea>
                    <br/>
                    <br/>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toGoNext} type='button'>Next</button>
                </form>
            </div>
        )
    }
}
