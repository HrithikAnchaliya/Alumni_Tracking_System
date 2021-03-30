import React from 'react';
import Button from 'react-bootstrap/Button'


export default class Standardform extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            education_input : []
        }

        this.Addfield = this.Addfield.bind(this);
        this.Deletefield = this.Deletefield.bind(this);
    }

    toGoNext = (event) => {
        event.preventDefault()
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
                    <div id='workForm-register-div' className="notification">
                <form onSubmit={this.toGoNext}>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input" required type='mail' onChange={this.props.handlechg} name='email' defaultValue={email}></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                    <input className="input" type='password' onChange={this.props.handlechg} name='password' defaultValue={password}></input>
                    </div>
                </div> 

                <div className="field">
                    <label className="label">Mobile Number</label>
                    <div className="control">
                    <input className="input" type="number" step="1" pattern="\d+"  onChange={this.props.number}  defaultValue={mobileNumber} name='mobileNumber'></input>
                    </div>
                </div>

                <label>Social Media Profiles</label>

                <div className="field">
                    <label className="label">Facebook Link</label>
                    <div className="control">
                    <input className="input" name= 'facebook' onChange={this.props.handlechg}  defaultValue={facebook} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Linkedin Link</label>
                    <div className="control">
                    <input className="input" name='linkedin'type='text'  onChange={this.props.handlechg}  defaultValue={linkedin} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Skills</label>
                    <div className="control">
                    <textarea className="textarea"  name='skills' onChange={this.props.handlechg}  defaultValue={skills}  placeholder='Use Comma To Seperate Them' ></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <Button variant="outline-dark" onClick={this.toGoBack} type='button'>Back</Button>
                    </div>
                    <div class="control">
                        <Button type='submit' variant="outline-dark">Next</Button>
                    </div>
                </div>

                </form>
                    </div>
                </div>
            </div>
        )
    }
}
  