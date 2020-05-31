import React from 'react';



export default class Standardform extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            education_input : []
        }

        this.Addfield = this.Addfield.bind(this);
        this.Deletefield = this.Deletefield.bind(this);
    }

    toGoNext = () => {
        this.props.goNext();
    }

    toGoBack = () => {
        this.props.goBack();
    }

    Addfield = () => {
        const field = this.state.education_input;
        const size = field.length + 1;
        field.push(size)
        this.setState({
            education_input : field
        })
    }

    Deletefield = () => {
        const field = this.state.education_input;
        field.pop()
        this.setState({
            education_input : field
        })
    }

    render(){
        const { email, password, mobileNumber, facebook, linkedin, skills } = this.props.values
        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
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
                    <br/>
                    <h6>Facebook Link</h6>
                    <input name= 'facebook' onChange={this.props.handlechg}  defaultValue={facebook} type='text'></input>
                    <h6>Linkedin</h6>
                    <input name='linkedin'type='text'  onChange={this.props.handlechg}  defaultValue={linkedin} ></input>
                    </div>
                    <br/>
                    <br/>
                    <h6>Skills</h6>
                    <textarea name='skills' onChange={this.props.handlechg}  defaultValue={skills}  placeholder='Input your skills one by one with " , " to seperate them'></textarea>
                    <br/>
                    <br/>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toGoNext} type='button'>Next</button>
                </form>
                    </div>
                </div>
            </div>
        )
    }
}
  