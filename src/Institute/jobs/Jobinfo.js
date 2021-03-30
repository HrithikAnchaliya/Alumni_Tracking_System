import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import 'bulma/css/bulma.css';
import { notify_Success, notifyError, notifyError_with_msg } from  '../Utils/Message'

class Jobinfo extends React.Component{
    constructor(props){
        super(props)

        this.toGather = this.toGather.bind(this);
        this.toPost = this.toPost.bind(this);
    }

    async toGather(e){
          e.preventDefault();
          await this.props.toArrayskill()                       //function decomposition
          await this.props.toArrayQualif()

        const { company, workTitle, industry, typeOfJob,salaryOffered,
            experience,country,state ,city ,description ,contactInfo,skills_array, qualif_array  } =  this.props.values;

        const aloneValue = { company, workTitle, industry, typeOfJob,salaryOffered,
            experience ,description ,contactInfo,
            "location": {
                "city": city,
                "state": state,
                "country": country
            },
            "skillsRequired":skills_array,
            "qualification":qualif_array}
            console.log(aloneValue)
            this.toPost(aloneValue)
       
    }

    async toPost(data){
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        console.log(values)
        try{
            const response = await fetch(`${base_url}/${this.props.user}/jobs`,values)
            const json = await response.json()
            console.log(json)
            if(!response.ok){
                notifyError_with_msg(json._message);
            }
            if(response.ok){
            notify_Success();
        }}
        catch(error){
            console.log(error)
            notifyError('job');
        }
    }

    render(){
        
        const { salaryOffered,description ,skillsRequired ,qualification, experience } = this.props.values;
        
        return(
            <div>
                 <form onSubmit={this.toGather} >

                <div>

                <div className="field">
                    <label className="label">Company</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Company" name="company" onChange={this.props.theonChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Work - Title</label>
                    <div className="control">
                        <div className="select">
                        <select  name="workTitle"  required onChange={this.props.theonChange}>
                            <option value="">select Title</option>
                            <option value="front end dev">Front-End Developer</option>
                            <option value="back end dev">Back-End Developer</option>
                            <option value="software dev">Software Developer</option>
                            <option value="database management">Database Management</option>
                            <option value="software security">Software Security</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Industry</label>
                    <div className="control">
                        <div className="select">
                        <select  name="industry" required onChange={this.props.theonChange}>
                            <option value="">select Industry</option>
                            <option value="IT">IT</option>
                            <option value="automobile">Automobile</option>
                            <option value="bio tech">Bio - Tech</option>
                            <option value="Film">Film</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Type Of Work</label>
                    <div className="control">
                        <div className="select">
                        <select name="typeOfJob" required onChange={this.props.theonChange}>
                            <option value="">select Type</option>
                            <option value='full-time'> Full  Time</option>
                            <option value='intern'>Internship</option>
                            <option value='part-time'> Part  Time</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Salary Offered</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Salary Offered" name="salaryOffered" value={salaryOffered} onChange={this.props.theonChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Experience</label>
                    <div className="control">
                    <input  className="input" name='experience' type='number'  required pattern='[1-5]{1}' placeholder='Any Number'  onChange={this.props.theonChange} value={experience} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Country</label>
                    <div className="control">
                    <   input  className="input" placeholder="Country" name="country" onChange={this.props.theonChange} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">State</label>
                    <div className="control">
                    <   input  className="input" placeholder="State" name="state"  onChange={this.props.theonChange} required ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">City</label>
                    <div className="control">
                    <   input  className="input" placeholder="City"  name="city"  onChange={this.props.theonChange} required ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                    <textarea  className="textarea" placeholder="Description"  name="description" required  value={description} onChange={this.props.theonChange} > </textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Skills Required</label>
                    <div className="control">
                    <textarea  className="textarea" name="skillsRequired" required value={skillsRequired} placeholder='" , " To Seperate The Skill' onChange={this.props.theonChange} > </textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Qualification</label>
                    <div className="control">
                    <textarea  className="textarea" name="qualification" required value={qualification} placeholder='" , " To Seperate The Qualification' onChange={this.props.theonChange} > </textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">External Link / Reference Link</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="Link" name="contactInfo" onChange={this.props.theonChange} ></input>
                    </div>
                </div>

                <button className="button is-black" type='submit' >Submit the Job</button>

                </div>

                </form>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user : state.Auth_user    
    }
}


export default connect(mapStatesToProps,null) (Jobinfo);