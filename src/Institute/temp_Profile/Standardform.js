import React from 'react';
import update from 'immutability-helper';


export default class Standardform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    toGoBack = () => {
        this.props.goBack();
    }

    forSkills = (event) => {
        const data = this.props.values.data;
        let values = event.target.value;
        let skills_Array = values.split(',')
        let innerArray = update(data, {skills : { $set : skills_Array}})
        this.props.setData(innerArray);
    }

    forSocialProfile = (event) => {
        const data = this.props.values.data;
        let innerArray = update(data, {socialProfiles: {[event.target.name]: { $set : event.target.value}}});
        this.props.setData(innerArray);
    }

    render(){
        const { email, password, mobileNumber, socialProfiles, skills } = this.props.values.data;
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
                    <input  type="number" step="1" pattern="\d+"  onChange={this.props.handlechg}  defaultValue={mobileNumber} name='mobileNumber'></input>
                    <br/>
                    <br/>
                    <div>
                    <h5>Social Profile</h5>
                    <br/>
                    <h6>Facebook Link</h6>
                    <input name= 'facebook' onChange={this.forSocialProfile}  defaultValue={socialProfiles.facebook} type='text'></input>
                    <h6>Linkedin</h6>
                    <input name='linkedin'type='text'  onChange={this.forSocialProfile}  defaultValue={socialProfiles.linkedin} ></input>
                    </div>
                    <br/>
                    <br/>
                    <h6>Skills</h6>
                    <textarea name='skills' onChange={this.forSkills}  defaultValue={skills}  placeholder='Input your skills one by one with " , " to seperate them'></textarea>
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
  