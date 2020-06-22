import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import 'bulma/css/bulma.css';

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
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        
        const { salaryOffered,description ,skillsRequired ,qualification,experience ,contactInfo } = this.props.values;

        return(
            <div>
                 <form
                 onSubmit={this.toGather} >
                    <div id='addjobcontainer' className="container is-fluid">
                    <div className="notification">
                    <h5>Company</h5>
                    <select  name="company"  required onChange={this.props.theonChange}>
                        <option value="">Select Company</option>
                        <option value="microsoft">Microsoft</option>
                        <option value="google">Google</option>
                        <option value="hcl">HCL</option>
                        <option value="msi">MSI</option>
                    </select>
                    <br/>
                    <h5>Work - Title</h5>
                    <select  name="workTitle"  required onChange={this.props.theonChange}>
                        <option value="">select Title</option>
                        <option value="front end dev">Front-End Developer</option>
                        <option value="back end dev">Back-End Developer</option>
                        <option value="software dev">Software Developer</option>
                        <option value="database management">Database Management</option>
                        <option value="software security">Software Security</option>
                    </select>
                    <br/>
                    <h5>Industry</h5>
                    <select  name="industry" required onChange={this.props.theonChange}>
                        <option value="">select Industry</option>
                        <option value="IT">IT</option>
                        <option value="automobile">Automobile</option>
                        <option value="bio tech">Bio - Tech</option>
                        <option value="Film">Film</option>
                    </select>
                    <br/>
                    <h5>Type Of Work</h5>
                    <select name="typeOfJob" required onChange={this.props.theonChange}>
                        <option value="">select Type</option>
                        <option value='full-time'> Full  Time</option>
                        <option value='intern'>Internship</option>
                        <option value='part-time'> Part  Time</option>
                    </select>
                    <br/>
                    <h5>Salary Offered</h5>
                    <input  name="salaryOffered" value={salaryOffered} required onChange={this.props.theonChange}></input>
                    <br/>
                    <h5>Experience</h5> 
                        <input name='experience' type='number'  required pattern='[1-5]{1}' placeholder='Range is from 1 to 5'  onChange={this.props.theonChange} value={experience}></input>
                    <br/>
                    <h6>Country</h6>
                    <select name="country" onChange={this.props.theonChange} required className="countries" id="countryId">
                        <option value="">Select Country</option>
                    </select>
                    <br/>
                    <h6>State</h6>
                    <select name="state"  onChange={this.props.theonChange} required className="states" id="stateId">
                        <option value="">Select State</option>
                    </select>
                    <br/>
                    <h6>City</h6>
                    <select name="city"  onChange={this.props.theonChange} required className="cities" id="cityId">
                        <option value="">Select City</option>
                    </select>
                    <br/>
                    <h5>Description</h5>
                    <textarea name="description" required  value={description} onChange={this.props.theonChange} ></textarea>
                    <br/>
                    <h5>Skills Required</h5>
                    <textarea name="skillsRequired" required value={skillsRequired} placeholder='" , " to seperate the skill' onChange={this.props.theonChange} ></textarea>
                    <br/>
                    <h5>Qualification</h5>
                    <textarea name="qualification" required value={qualification} placeholder='" , " to seperate the skill' onChange={this.props.theonChange} ></textarea>
                    <br/>
                    <h5>External Link</h5>
                    <input type='url' value={contactInfo} required  name='contactInfo'onChange={this.props.theonChange}></input>
                    <br/>
                    <br/>
                    <button type='submit'  >Submit the Job</button>
                    </div>
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